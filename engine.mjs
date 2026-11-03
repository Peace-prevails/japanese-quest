export class Story {
  constructor(data) {
    this.data = data;
    this.nodes = Object.fromEntries(data.nodes.map(n => [n.id, n]));
    this.state = structuredClone(data.initial_state);
    this.state.explored_hotspots = [];
    this.learning = structuredClone(data.initial_learning);
    this.current = data.start;
  }
  values() { return {}; }
  text(value) { const values = this.values(); return value.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? ''); }
  view() { const n = this.nodes[this.current]; return { ...n, ja: this.text(n.ja), zh: this.text(n.zh), conditional_lines: (n.conditional_lines || []).filter(l => this.allowed(l.requires)) }; }
  allowed(requires = {}) { return Object.entries(requires).every(([k, v]) => this.state[k] === v); }
  choose(id) {
    const n = this.nodes[this.current];
    const c = n.choices.find(c => c.id === id);
    if (!c || !this.allowed(c.requires)) throw Error('Unavailable choice');
    const selected = this.learning.selected_expressions ??= {};
    selected[c.ja] = (selected[c.ja] || 0) + 1;
    for (const tag of n.learning_tags) this.learning.phrase_exposure[tag] = (this.learning.phrase_exposure[tag] || 0) + 1;
    if (c.ja.includes('わかりません')) this.hint();
    Object.assign(this.state, c.set);
    this.current = c.next;
    const hotspot = this.nodes[this.current].on_enter?.append_explored_hotspots;
    if (hotspot && !this.state.explored_hotspots.includes(hotspot)) this.state.explored_hotspots.push(hotspot);
    return this.view();
  }
  hint() { const key = this.nodes[this.current].scene_id; this.learning.hint_usage[key] = (this.learning.hint_usage[key] || 0) + 1; }
  save() { return { version: 1, episode_id: this.data.id, current: this.current, story: structuredClone(this.state), learning: structuredClone(this.learning) }; }
  load(saved) {
    const s = saved?.story, l = saved?.learning;
    if (saved?.version !== 1 || saved.episode_id !== this.data.id || !this.nodes[saved.current] || !s || !l) throw Error('Unsupported save');
    if (Object.keys(s).sort().join() !== Object.keys(this.data.initial_state).sort().join()) throw Error('Invalid state');
    for (const k of ['asked_directions', 'saw_engine', 'contract_made']) if (typeof s[k] !== 'boolean') throw Error('Invalid state');
    for (const k of ['order_selected', 'first_reaction', 'trust_aoi']) if (s[k] !== null && typeof s[k] !== 'string') throw Error('Invalid string state');
    if (s.read_air_success !== null && typeof s.read_air_success !== 'boolean') throw Error('Invalid read_air_success');
    if (!Array.isArray(s.explored_hotspots) || !s.explored_hotspots.every(x => ['office', 'vending', 'cafe', 'park', 'shibuya'].includes(x))) throw Error('Invalid exploration');
    for (const k of ['hint_usage', 'phrase_exposure']) if (!l[k] || Array.isArray(l[k]) || typeof l[k] !== 'object' || !Object.values(l[k]).every(v => Number.isInteger(v) && v >= 0)) throw Error('Invalid learning');
    if (!Number.isInteger(l.replay_count) || l.replay_count < 0) throw Error('Invalid replay count');
    const selected = l.selected_expressions || {};
    if (Array.isArray(selected) || typeof selected !== 'object' || !Object.values(selected).every(v => Number.isInteger(v) && v >= 0)) throw Error('Invalid expression history');
    this.state = structuredClone(s);
    this.learning = structuredClone(l);
    this.learning.selected_expressions ??= {};
    this.current = saved.current;
    return this.view();
  }
  replay() { if (this.current !== 'end') throw Error('Finish the episode first'); const copy = new Story(this.data); copy.load(this.save()); copy.current = 'explore'; copy.learning.replay_count++; return copy; }
}
