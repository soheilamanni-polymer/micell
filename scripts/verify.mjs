import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {launchBrowser} from './browser.mjs';
const browser=await launchBrowser();
const base=process.env.PREVIEW_URL||pathToFileURL(path.resolve('index.html')).href;
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
await mkdir('/tmp/micelle-bilingual',{recursive:true});
try{
  for(const lang of ['en','fa']){
    const url=new URL(base);url.searchParams.set('lang',lang);
    await browser.send('Emulation.setDeviceMetricsOverride',{width:1440,height:960,deviceScaleFactor:1,mobile:false});
    await browser.navigate(url.href);
    assert.equal(await browser.evaluate('MICELLE_STUDIO.slideCount'),20);
    assert.equal(await browser.evaluate('document.querySelectorAll(".slide").length'),20);
    assert.equal(await browser.evaluate('document.querySelectorAll(".slide.active").length'),1);
    assert.equal(await browser.evaluate('document.documentElement.lang'),lang);
    assert.equal(await browser.evaluate('document.documentElement.dir'),lang==='fa'?'rtl':'ltr');
    assert.equal(await browser.evaluate('document.querySelectorAll("audio,#podcast-button,#podcast-dialog").length'),0);
    const layout=await browser.evaluate(`(()=>{const issues=[];for(let i=0;i<20;i++){MICELLE_STUDIO.go(i,false);const slide=document.querySelector('.slide.active'),body=slide.querySelector('.slide-body'),take=slide.querySelector('.slide-takeaway'),br=body.getBoundingClientRect(),tr=take.getBoundingClientRect();if(br.bottom>tr.top-5)issues.push({slide:i+1,overlap:Math.round(br.bottom-tr.top)});}MICELLE_STUDIO.go(0,false);return issues;})()`);
    console.log(lang,'layout:',JSON.stringify(layout));
    for(const index of [0,2,7,10,14,18,19]){
      await browser.evaluate(`MICELLE_STUDIO.go(${index},false)`);await pause(300);
      const capture=await browser.send('Page.captureScreenshot',{format:'png'});
      await writeFile(`/tmp/micelle-bilingual/${lang}-${index+1}.png`,Buffer.from(capture.data,'base64'));
    }
    if(lang==='fa'){
      const residual=await browser.evaluate(`(()=>{const out=new Set();for(const slide of document.querySelectorAll('.slide')){const body=slide.querySelector('.slide-body');const walker=document.createTreeWalker(body,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){if(n.parentElement.closest('.source-list,.paper-credit,svg title'))continue;const s=n.nodeValue.trim();if(/[a-zA-Z]{4}/.test(s)&&!/[\\u0600-\\u06ff]/.test(s))out.add(s);}}return [...out];})()`);
      console.log('Untranslated Persian body text:',JSON.stringify(residual));
      assert.deepEqual(residual,[],'All teaching text outside original citations must be translated');
      assert.ok(await browser.evaluate('MICELLE_STUDIO.slides.every(s=>/[\u0600-\u06ff]/.test(s.notes)&&/[\u0600-\u06ff]/.test(s.title))'));
      assert.ok(await browser.evaluate('document.fonts.check("20px NotoArabic")'));
    }
    assert.deepEqual(layout,[],`${lang} content must not overlap the takeaway`);
    await browser.evaluate('MICELLE_STUDIO.go(0,false)');
    await browser.send('Input.dispatchKeyEvent',{type:'keyDown',key:lang==='fa'?'ArrowLeft':'ArrowRight'});
    assert.equal(await browser.evaluate('MICELLE_STUDIO.current'),1);
    await browser.evaluate('document.getElementById("notes-button").click()');
    assert.equal(await browser.evaluate('document.getElementById("teaching-notes").hidden'),false);
    assert.ok(await browser.evaluate('document.getElementById("notes-content").textContent.length>100'));
    await browser.evaluate('document.getElementById("notes-button").click();document.getElementById("overview-button").click()');
    assert.equal(await browser.evaluate('document.getElementById("overview-dialog").open'),true);
    await browser.evaluate(`document.querySelector('#overview-grid [data-slide="10"]').click()`);
    assert.equal(await browser.evaluate('MICELLE_STUDIO.current'),10);
    const previous=await browser.evaluate('document.getElementById("release-chart").innerHTML');
    await browser.evaluate('document.getElementById("release-rate").value="7";document.getElementById("release-rate").dispatchEvent(new Event("input",{bubbles:true}))');
    assert.notEqual(await browser.evaluate('document.getElementById("release-chart").innerHTML'),previous);
    assert.equal(await browser.evaluate(`(()=>{for(const half of [1,2,3,8]){let last=-1;for(let t=0;t<=100;t+=.25){const {micelleOnly,composite}=MICELLE_STUDIO.releaseFractions(t,half);if(!Number.isFinite(composite)||composite<last-1e-10||composite<0||composite>1||composite>micelleOnly+1e-10)return false;last=composite;}}return true;})()`),true);
    await browser.evaluate(`MICELLE_STUDIO.go(17,false);document.querySelector('.quiz-options button[data-answer="1"]').click()`);
    assert.equal(await browser.evaluate(`document.querySelector('.quiz-options button[data-answer="1"]').classList.contains('incorrect')`),true);
    await browser.evaluate(`document.querySelector('.quiz-options button[data-answer="0"]').click()`);
    assert.equal(await browser.evaluate(`document.querySelector('.quiz-options button[data-answer="0"]').classList.contains('correct')`),true);
    if(lang==='fa')assert.ok(await browser.evaluate('document.querySelector(".quiz-feedback").textContent.startsWith("درست است.")'));
    await browser.evaluate('document.getElementById("ideas-button").click()');
    assert.equal(await browser.evaluate('document.getElementById("ideas-dialog").open'),true);
    assert.equal(await browser.evaluate('document.querySelectorAll(".idea-detail").length'),3);
    assert.equal(await browser.evaluate('document.querySelectorAll(".idea-field").length'),21);
    const panel=await browser.send('Page.captureScreenshot',{format:'png'});
    await writeFile(`/tmp/micelle-bilingual/${lang}-ideas.png`,Buffer.from(panel.data,'base64'));
    await browser.evaluate('document.getElementById("ideas-dialog").close();MICELLE_STUDIO.go(0,false)');
    const links=await browser.evaluate('[...document.querySelectorAll("a[href]")].map(a=>a.getAttribute("href")).filter(x=>!x.startsWith("http")&&!x.startsWith("#"))');
    for(const link of new Set(links))assert.ok((await readFile(link)).length>0,`Missing download: ${link}`);
    await browser.send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await pause(200);
    for(let index=0;index<20;index++){
      await browser.evaluate(`MICELLE_STUDIO.go(${index},false)`);await pause(20);
      assert.ok(await browser.evaluate('document.body.scrollWidth<=innerWidth'),`${lang} slide ${index+1} must fit mobile width`);
    }
    await browser.evaluate('MICELLE_STUDIO.go(0,false)');await pause(200);
    const mobile=await browser.send('Page.captureScreenshot',{format:'png'});
    await writeFile(`/tmp/micelle-bilingual/${lang}-mobile.png`,Buffer.from(mobile.data,'base64'));
  }
  await browser.evaluate('MICELLE_STUDIO.go(10);document.querySelector("[data-language=en]").click()');
  let changed=false;
  for(let i=0;i<40;i++){try{changed=await browser.evaluate('MICELLE_STUDIO.language==="en"&&MICELLE_STUDIO.current===10');if(changed)break;}catch{}await pause(100);}
  assert.equal(changed,true,'Language switch must preserve the current slide');
  assert.equal(await browser.evaluate('localStorage.getItem("micelle-language")'),'en');
  for(const file of ['exports/micelle-podcast.mp3','exports/podcast-transcript.txt','scripts/generate_podcast.py']){
    let exists=true;try{await access(file);}catch{exists=false;}assert.equal(exists,false,`Removed podcast file remains: ${file}`);
  }
  console.log('Passed: 20 slides in both languages, RTL, localized notes/diagrams/quiz, navigation, language persistence, release model, research proposals, downloads, podcast removal, and all mobile slide widths.');
  console.log('Screenshots: /tmp/micelle-bilingual');
}finally{await browser.close();}
