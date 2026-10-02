(() => {
  'use strict';
  const {source}=window.MICELLE;
  const i18n=window.MICELLE_I18N;
  const {chapters,t,number:localNumber,sourceLabel}=i18n;
  const slides=i18n.getSlides();
  i18n.translateChrome();
  const $=id=>document.getElementById(id);
  const pad=n=>localNumber(String(n).padStart(2,'0'));
  const strip=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
  const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let current=0;
  const exportMode=new URLSearchParams(location.search).has('export');
  if(exportMode)document.body.classList.add('export-mode');
  $('deck').innerHTML=slides.map((s,i)=>`<section id="slide-${i+1}" class="slide ${i===0?'active ':''}${s.layout==='cover'?'slide-cover':''}" aria-label="${i18n.lang==='fa'?'اسلاید':'Slide'} ${localNumber(i+1)}: ${strip(s.title)}" aria-hidden="${i!==0}">${s.layout==='cover'?'':`<div class="slide-eyebrow">${pad(s.chapter+1)} / ${chapters[s.chapter]}</div><h2>${s.title}</h2>`}<div class="slide-body">${s.body}</div><div class="slide-takeaway"><span class="takeaway-dot"></span>${s.takeaway}</div><footer class="slide-footer"><div class="slide-sources">${s.refs.map(key=>`<a href="${source[key].url}" target="_blank" rel="noopener">${sourceLabel(key)} ↗</a>`).join('')}</div><div><span class="footer-wordmark">micelle.</span><span class="footer-number">${pad(i+1)} / ${localNumber(slides.length)}</span></div></footer></section>`).join('');
  $('slide-total').textContent=localNumber(slides.length);
  const fa=i18n.lang==='fa';
  const pdfName=fa?'micelle-hydrogel-lesson-fa.pdf':'micelle-hydrogel-lesson.pdf';
  document.querySelector('.header-actions .solid-btn').href=`exports/${pdfName}`;
  document.querySelector('.notes-download').href=`exports/teaching-notes${fa?'-fa':''}.md`;
  if(fa){$('prev-button').textContent='→';$('next-button').textContent='←';}
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{
    const lang=button.dataset.language;if(lang===i18n.lang)return;
    try{localStorage.setItem('micelle-language',lang);}catch{}
    const url=new URL(location.href);url.searchParams.set('lang',lang);location.assign(url.href);
  }));
  const fields=[['basis','Evidence from the reference'],['question','Research question'],['hypothesis','Hypothesis to test'],['design','Study design'],['measures','Measurements'],['decision','Decision criterion'],['risk','Limitations and feasibility']];
  $('ideas-content').innerHTML=window.MICELLE_IDEAS[i18n.lang].map((idea,i)=>`<article class="idea-detail"><div class="idea-detail-heading"><span class="idea-number">${pad(i+1)}</span><div><h3>${escape(idea.title)}</h3><p class="idea-badge">${escape(idea.badge)}</p></div></div>${fields.map(([key,label])=>`<div class="idea-field"><h4>${t(label)}</h4><p>${escape(idea[key])}</p></div>`).join('')}<div class="idea-sources">${idea.refs.map(key=>`<a href="${source[key].url}" target="_blank" rel="noopener">${sourceLabel(key)} ↗</a>`).join('')}</div></article>`).join('');
  $('ideas-download').href=`exports/research-ideas-${i18n.lang}.md`;
  let previousChapter=-1;
  $('outline').innerHTML=slides.map((s,i)=>{const heading=s.chapter!==previousChapter?`<div class="chapter-label"><span>${pad(s.chapter+1)}</span>${chapters[s.chapter]}</div>`:'';previousChapter=s.chapter;return `${heading}<button class="outline-item ${i===0?'active':''}" data-slide="${i}" ${i===0?'aria-current="step"':''}><span class="outline-number">${pad(i+1)}</span><span>${s.nav}</span></button>`;}).join('');
  $('overview-grid').innerHTML=slides.map((s,i)=>`<button class="overview-card" data-slide="${i}"><span>${pad(i+1)} / ${chapters[s.chapter].toUpperCase()}</span><h3>${strip(s.title)}</h3></button>`).join('');
  function resize(){
    if(exportMode)return;
    if(window.innerWidth<=700){$('deck').style.left='0';$('deck').style.top='0';return;}
    const rect=$('stage-wrap').getBoundingClientRect();
    const scale=Math.min(rect.width/1440,rect.height/810);
    $('deck').style.setProperty('--deck-scale',scale);
    $('deck').style.left=`${(rect.width-1440*scale)/2}px`;
    $('deck').style.top=`${(rect.height-810*scale)/2}px`;
  }
  function go(index,updateHash=true){
    const next=Math.max(0,Math.min(slides.length-1,index));
    current=next;
    document.querySelectorAll('.slide').forEach((node,i)=>{node.classList.toggle('active',i===current);node.setAttribute('aria-hidden',exportMode?'false':String(i!==current));});
    document.querySelectorAll('.outline-item,.overview-card').forEach(node=>{const active=Number(node.dataset.slide)===current;node.classList.toggle('active',active);if(active)node.setAttribute('aria-current','step');else node.removeAttribute('aria-current');});
    $('slide-number').textContent=pad(current+1);
    $('current-chapter').textContent=`${pad(slides[current].chapter+1)} / ${chapters[slides[current].chapter].toUpperCase()}`;
    $('progress-fill').style.width=`${(current+1)/slides.length*100}%`;
    $('prev-button').disabled=current===0;
    $('next-button').disabled=current===slides.length-1;
    const s=slides[current];
    $('notes-content').innerHTML=`<p>${escape(s.notes)}</p><div class="notes-links">${s.refs.map(k=>`<a href="${source[k].url}" target="_blank" rel="noopener">${sourceLabel(k)} ↗</a>`).join('')}</div>`;
    if(updateHash)history.replaceState(null,'',`${location.pathname}${location.search}#slide-${current+1}`);
    const activeOutline=document.querySelector('.outline-item.active');
    if(activeOutline){const nav=$('outline'), top=activeOutline.offsetTop-nav.offsetTop;if(top<nav.scrollTop||top+activeOutline.offsetHeight>nav.scrollTop+nav.clientHeight)nav.scrollTop=top-nav.clientHeight/2;}
    document.title=`${pad(current+1)} · ${strip(s.title)} — Micelle`;
  }
  function fromHash(){const match=location.hash.match(/^#slide-(\d+)$/);go(match?Number(match[1])-1:0,false);}
  document.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>{go(Number(button.dataset.slide));if($('overview-dialog').open)$('overview-dialog').close();}));
  $('prev-button').addEventListener('click',()=>go(current-1));
  $('next-button').addEventListener('click',()=>go(current+1));
  function notes(){const show=$('teaching-notes').hidden;$('teaching-notes').hidden=!show;$('notes-button').setAttribute('aria-expanded',String(show));}
  $('notes-button').addEventListener('click',notes);
  function openDialog(id){if(document.querySelector('dialog[open]'))return;$(id).showModal();}
  $('overview-button').addEventListener('click',()=>openDialog('overview-dialog'));
  $('ideas-button').addEventListener('click',()=>openDialog('ideas-dialog'));
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}));
  let toastTimer;
  function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,4500);}
  async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.querySelector('.main').requestFullscreen)await document.querySelector('.main').requestFullscreen();else toast(t('Fullscreen is unavailable in this browser.'));}catch{toast(t('Fullscreen is unavailable here; browser zoom can enlarge the slides.'));}}
  $('fullscreen-button').addEventListener('click',fullscreen);
  document.addEventListener('fullscreenchange',()=>{$('fullscreen-button').setAttribute('aria-label',t(document.fullscreenElement?'Exit fullscreen':'Enter fullscreen'));setTimeout(resize,50);});
  document.addEventListener('keydown',e=>{
    if(document.querySelector('dialog[open]')||e.ctrlKey||e.metaKey||e.altKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
    if(e.target.closest('button,a')&&['Enter',' '].includes(e.key))return;
    if([(fa?'ArrowLeft':'ArrowRight'),'PageDown',' '].includes(e.key)){e.preventDefault();go(current+1);}
    else if([(fa?'ArrowRight':'ArrowLeft'),'PageUp'].includes(e.key)){e.preventDefault();go(current-1);}
    else if(e.key==='Home'){e.preventDefault();go(0);}
    else if(e.key==='End'){e.preventDefault();go(slides.length-1);}
    else if(e.key.toLowerCase()==='n')notes();
    else if(e.key.toLowerCase()==='o')openDialog('overview-dialog');
    else if(e.key.toLowerCase()==='f')fullscreen();
    else if(e.key.toLowerCase()==='p')window.print();
  });
  document.querySelectorAll('.quiz-options button').forEach(button=>button.addEventListener('click',()=>{
    const card=button.closest('.quiz-card');
    card.querySelectorAll('button').forEach(b=>{b.classList.remove('correct','incorrect');b.setAttribute('aria-pressed','false');});
    const right=button.dataset.answer===button.dataset.correct;
    button.classList.add(right?'correct':'incorrect');button.setAttribute('aria-pressed','true');
    const feedback=card.querySelector('.quiz-feedback');
    if(!feedback.dataset.answer)feedback.dataset.answer=feedback.textContent;
    feedback.textContent=`${t(right?'Correct.':'Try again.')} ${feedback.dataset.answer}`;
    feedback.hidden=false;
  }));
  function releaseFractions(t,micelleHalf=3,gelHalf=2){
    const km=Math.LN2/micelleHalf,kg=Math.LN2/gelHalf;
    const micelleOnly=1-Math.exp(-km*t);
    const composite=Math.abs(km-kg)<1e-10?1-Math.exp(-km*t)*(1+km*t):1-(kg*Math.exp(-km*t)-km*Math.exp(-kg*t))/(kg-km);
    return {micelleOnly,composite:Math.max(0,Math.min(1,composite))};
  }
  function drawRelease(){
    const half=Number($('release-rate').value);$('release-value').value=localNumber(half.toFixed(1));
    const origin={x:90,y:330},width=602,height=255;
    let out=`<title>${fa?'رهایش تجمعی نمایشی؛ نیم‌زمان میسل '+localNumber(half)+' و نیم‌زمان ژل ۲ واحد نسبی':`Illustrative cumulative release, micelle half-time ${half}, gel half-time 2 relative units`}</title><rect x="0" y="0" width="760" height="430" rx="18" fill="#f3f5eb"/>`;
    for(let n=0;n<=4;n++){const y=origin.y-n*height/4;out+=`<line x1="90" y1="${y}" x2="692" y2="${y}" stroke="#dce4d3"/><text x="73" y="${y+6}" text-anchor="end" fill="#7a896b" font-size="17">${localNumber(n*25)}</text>`;}
    for(let n=0;n<=4;n++){const x=origin.x+n*width/4;out+=`<text x="${x}" y="360" text-anchor="middle" fill="#7a896b" font-size="17">${localNumber(n*5)}</text>`;}
    out+=`<path d="M90 75V330H692" fill="none" stroke="#91a180" stroke-width="2"/><text x="392" y="402" text-anchor="middle" fill="#657b53" font-size="19">${t('Time (relative units)')}</text><text transform="translate(28 203) rotate(-90)" text-anchor="middle" fill="#657b53" font-size="19">${t('Cumulative external release (%)')}</text>`;
    for(const [key,color,dash] of [['micelleOnly','#c5895d','7 6'],['composite','#32685b','']]){
      let d='';for(let step=0;step<=160;step++){const t=step/160*20,v=releaseFractions(t,half)[key];d+=`${step?'L':'M'}${(origin.x+step/160*width).toFixed(2)} ${(origin.y-v*height).toFixed(2)} `;}
      out+=`<path d="${d}" fill="none" stroke="${color}" stroke-width="3.5" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
    }
    out+=`<line x1="137" y1="32" x2="175" y2="32" stroke="#c5895d" stroke-width="3" stroke-dasharray="6 5"/><text x="187" y="38" fill="#718363" font-size="19">${t('Micelle alone')}</text><line x1="404" y1="32" x2="442" y2="32" stroke="#32685b" stroke-width="3"/><text x="454" y="38" fill="#718363" font-size="19">${t('Micelle + gel')}</text>`;
    $('release-chart').innerHTML=out;
    $('release-chart').setAttribute('dir','ltr');
    $('release-chart').setAttribute('aria-label',fa?`مدل آموزشی رهایش تجمعی؛ نیم‌زمان میسل ${localNumber(half)} و نیم‌زمان انتقال ژل ۲ واحد نسبی. بدون دادهٔ تجربی.`:`Teaching model: cumulative release for micelle half-time ${half} and gel transport half-time 2 relative units. No experimental data.`);
  }
  $('release-rate').addEventListener('input',drawRelease);drawRelease();
  let startTouch;
  $('stage-wrap').addEventListener('touchstart',e=>{if(e.target.closest('input,button,a'))return;startTouch=e.touches[0].clientX;},{passive:true});
  $('stage-wrap').addEventListener('touchend',e=>{if(startTouch===undefined)return;const change=e.changedTouches[0].clientX-startTouch;startTouch=undefined;if(Math.abs(change)>60)go(current+((change<0?1:-1)*(fa?-1:1)));},{passive:true});
  window.addEventListener('hashchange',fromHash);
  new ResizeObserver(resize).observe($('stage-wrap'));
  window.addEventListener('resize',resize);
  document.fonts.ready.then(resize);
  fromHash();resize();
  window.MICELLE_STUDIO={go,releaseFractions,drawRelease,slides,get current(){return current;},slideCount:slides.length,language:i18n.lang};
})();
