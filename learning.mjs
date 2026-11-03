// A record of exposure and choices, never a claim of spoken proficiency.
export const expressions=[
 {tag:'あいさつ',ja:'はじめまして。',romaji:'Hajimemashite.',zh:'初次见面。',use:'自我介绍 · Introduce yourself',pattern:'はじめまして。～です。',tip:'初次见面先说「はじめまして」，再介绍名字：高橋葵です。',match:t=>t.includes('はじめまして')},
 {tag:'みちをきく',ja:'～はどこですか？',romaji:'～ wa doko desu ka?',zh:'～在哪里？',use:'问路 · Ask where',pattern:'场所 + はどこですか？',tip:'公司在哪里？＝会社はどこですか？',match:t=>t.includes('どこですか')},
 {tag:'おねがい',ja:'よろしくお願いします。',romaji:'Yoroshiku onegaishimasu.',zh:'请多关照。',use:'拜托 · Ask a favor',pattern:'よろしくお願いします',tip:'工作场合最常用的一句，表示"请多关照"。',match:t=>t.includes('お願いします')},
 {tag:'かんしゃ',ja:'ありがとうございます。',romaji:'Arigatou gozaimasu.',zh:'谢谢。',use:'道谢 · Say thanks',pattern:'ありがとうございます',tip:'对长辈或陌生人用礼貌形「ございます」。',match:t=>t.includes('ありがとう')},
 {tag:'ちゅうもん',ja:'～をください。',romaji:'～ wo kudasai.',zh:'请给我～。',use:'点餐 · Order',pattern:'东西 + をください',tip:'请给我啤酒＝ビールをください。',match:t=>t.includes('ください')},
 {tag:'かんぱい',ja:'かんぱい！',romaji:'Kanpai!',zh:'干杯！',use:'干杯 · Cheers',pattern:'かんぱい',tip:'聚会举杯时用。',match:t=>t.includes('かんぱい')},
 {tag:'わからない',ja:'わかりません。',romaji:'Wakarimasen.',zh:'我听不懂。',use:'求助 · Ask for help',pattern:'わかりません',tip:'听不懂时直接说，不丢人。对方会慢下来再说一遍。',match:t=>t.includes('わかりません')},
 {tag:'ひてい',ja:'ちがいます。',romaji:'Chigaimasu.',zh:'不是的。',use:'否认 · Deny',pattern:'ちがいます',tip:'想反驳时用「ちがいます」。',match:t=>t.includes('ちがいます')},
 {tag:'くうきをよむ',ja:'空気を読む。',romaji:'Kuuki wo yomu.',zh:'读空气。',use:'读空气 · Read the room',pattern:'空気を読む',tip:'日语特有说法：察言观色、理解当下的气氛。',match:t=>t.includes('空気')}
];
export function lessonSummary(learning){return expressions.map(row=>({...row,encountered:(learning.phrase_exposure?.[row.tag]||0)>0,selected:Object.entries(learning.selected_expressions||{}).filter(([text])=>row.match(text)).map(([text,count])=>({text,count}))}));}
