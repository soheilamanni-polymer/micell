import {spawn} from 'node:child_process';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function launchBrowser(){
  const profile=await mkdtemp(path.join(tmpdir(),'micelle-browser-'));
  const child=spawn(process.env.CHROME_PATH||'/usr/bin/google-chrome',['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',`--user-data-dir=${profile}`,'--remote-debugging-port=0','--remote-allow-origins=*','about:blank'],{stdio:'ignore'});
  let endpoint;
  for(let i=0;i<100;i++){try{const p=(await readFile(path.join(profile,'DevToolsActivePort'),'utf8')).split('\n')[0];const pages=await (await fetch(`http://127.0.0.1:${p}/json/list`)).json();endpoint=pages.find(p=>p.type==='page').webSocketDebuggerUrl;break;}catch{await sleep(100);}}
  if(!endpoint){child.kill();await rm(profile,{recursive:true,force:true});throw Error('Chrome did not start. Set CHROME_PATH to an installed Chrome binary.');}
  const socket=new WebSocket(endpoint);
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject;});
  let count=0;const pending=new Map();
  socket.addEventListener('message',event=>{const response=JSON.parse(event.data);if(response.id&&pending.has(response.id)){const {resolve,reject}=pending.get(response.id);pending.delete(response.id);if(response.error)reject(Error(response.error.message));else resolve(response.result);}});
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++count;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  const navigate=async url=>{await send('Page.enable');await send('Page.navigate',{url});for(let i=0;i<100;i++){if(await evaluate('document.readyState === "complete" && !!window.MICELLE_STUDIO'))break;await sleep(100);}await evaluate('document.fonts.ready.then(()=>true)');await sleep(100);};
  const close=async()=>{socket.close();child.kill();await sleep(200);await rm(profile,{recursive:true,force:true,maxRetries:4,retryDelay:150});};
  return {send,evaluate,navigate,close};
}
