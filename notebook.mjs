import {lessonSummary} from './learning.mjs?v=fc08f1ac3d81';
// Derive only facts already reached; this does not change saves or reveal later twists.
export function notebook(story){
 const n=story.view(),s=story.state,scene=Number(n.scene_id.slice(1));
 const facts=[{ja:'あなたは東京に着いたばかりだ。',zh:'你刚到东京，要找到公司。'}];
 if(s.asked_directions)facts.push({ja:'あなたは道を聞いた。',zh:'你向路人问了公司的位置。'});
 if(scene>=1)facts.push({ja:'高橋葵があなたの担当になった。',zh:'高桥葵成了你的对接人。'});
 if(s.saw_engine)facts.push({ja:'「絆」を披露した。',zh:'你展示了 AI 广告助手「絆」。'});
 if(s.order_selected)facts.push({ja:`あなたは${s.order_selected==='beer'?'ビール':'ウーロン茶'}を頼んだ。`,zh:`你点了${s.order_selected==='beer'?'啤酒':'乌龙茶'}。`});
 if(s.read_air_success!==null)facts.push({ja:'日本の「空気を読む」文化を知った。',zh:'你知道了日本"读空气"的文化。'});
 if(s.first_reaction)facts.push({ja:'藤堂がデモの失敗をあなたのせいにした。',zh:'藤堂把演示失败甩锅给你。'});
 if(s.trust_aoi)facts.push({ja:'あなたは葵に助けを求めた。',zh:'你向葵寻求了帮助。'});
 if(s.contract_made)facts.push({ja:'葵と恋人のふりをすることにした。',zh:'你和葵决定假扮恋人。'});
 const expressions=lessonSummary(story.learning).filter(r=>r.encountered||r.selected.length||n.learning_tags.includes(r.tag));
 return {facts,expressions};
}
