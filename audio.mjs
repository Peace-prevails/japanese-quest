// Exact text and role matching prevents playing the wrong order or sample line.
export const voiceRole=speaker=>({AOI:'aoi',TOUDOU:'toudou',SHACHOU:'shachou',PASSERBY:'passerby',NARRATOR:'narrator'}[speaker]||'narrator');
export class VoicePlayer {
 constructor(clips=[],makeAudio=src=>new Audio(src),report=()=>{}) {this.clips=new Map(clips.map(c=>[c.role+'\n'+c.text,c.audio]));this.makeAudio=makeAudio;this.report=report;this.current=null;this.token=0;this.rate=1;}
 setRate(rate){this.rate=rate===0.8?0.8:1;if(this.current){this.current.playbackRate=this.rate;this.current.preservesPitch=true;}}
 find(role,text){return this.clips.get(role+'\n'+text);}
 stop(){this.token++;if(this.current){this.current.pause();this.current.currentTime=0;this.current=null;}this.report('');}
 async play(role,text){this.stop();const src=this.find(role,text);if(!src){this.report('この行の音声はまだありません。');return false;}const token=this.token;const audio=this.makeAudio(src);this.current=audio;audio.playbackRate=this.rate;audio.preservesPitch=true;audio.onended=()=>{if(token===this.token){this.current=null;this.report('');}};audio.onerror=()=>{if(token===this.token){this.current=null;this.report('音声を再生できませんでした。');}};this.report('再生中…');try{await audio.play();return token===this.token;}catch{if(token===this.token){this.current=null;this.report('「Listen」をタップして再生してください。');}return false;}}
 // Play and wait until the clip ends (or is stopped). Used when the chosen line should finish before advancing.
 async playAndWait(role,text){this.stop();const src=this.find(role,text);if(!src)return false;const token=this.token;const audio=this.makeAudio(src);this.current=audio;audio.playbackRate=this.rate;audio.preservesPitch=true;const done=new Promise(resolve=>{audio.onended=()=>{if(token===this.token){this.report('');this.current=null;}resolve(true);};audio.onerror=()=>{if(token===this.token){this.report('音声を再生できませんでした。');this.current=null;}resolve(false);};audio.onpause=()=>{if(token!==this.token)resolve(false);};});this.report('再生中…');try{await audio.play();return await done;}catch{if(token===this.token){this.current=null;this.report('「Listen」をタップして再生してください。');}return false;}}
}
