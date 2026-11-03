// Pick the visual asset: CG (key shot) > character portrait (dialogue) > background (narration).
export function presentation(node, shots, state={}) {
 const refs=node.asset_refs||[];
 const cg=refs.find(r=>r.startsWith('CG'));
 if(cg)return {asset:cg,speaker:node.speaker,expression:'environment',focus:'50% 50%'};
 const ch=refs.find(r=>r.startsWith('CH'));
 if(ch)return {asset:ch,speaker:node.speaker,expression:'portrait',focus:'50% 22%'};
 const bg=refs.find(r=>r.startsWith('BG'))||'BG02_OFFICE';
 return {asset:bg,speaker:node.speaker,expression:'environment',focus:'50% 50%'};
}
