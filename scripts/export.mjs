import {writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {launchBrowser} from './browser.mjs';
const clean=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const browser=await launchBrowser();
try{
  await browser.send('Emulation.setDeviceMetricsOverride',{width:1440,height:960,deviceScaleFactor:1,mobile:false});
  for(const lang of ['en','fa']){
    await browser.navigate(`${pathToFileURL(path.resolve('index.html'))}?export=1&lang=${lang}`);
    const data=await browser.evaluate(`({slides:MICELLE_STUDIO.slides,source:MICELLE.source,ideas:MICELLE_IDEAS['${lang}'],labels:['Evidence from the reference','Research question','Hypothesis to test','Study design','Measurements','Decision criterion','Limitations and feasibility'].map(MICELLE_I18N.t)})`);
    const fa=lang==='fa';
    let notes=fa?'# میسل — یادداشت‌های آموزشی\n\nدرس ۲۰ اسلایدی بر پایهٔ Li و همکاران، ۲۰۲۵.\n\n':'# Micelle — Teaching notes\n\n20-slide lesson based on Li et al., Chinese Chemical Letters 36 (2025), 110072.\n\n';
    data.slides.forEach((s,i)=>{notes+=`## ${i+1}. ${clean(s.title)}\n\n${s.notes}\n\n**${fa?'نکتهٔ اصلی':'Remember'}:** ${s.takeaway}\n\n${s.refs.map(k=>`- [${data.source[k].short}](${data.source[k].url})`).join('\n')}\n\n`;});
    await writeFile(`exports/teaching-notes${fa?'-fa':''}.md`,notes);
    let ideas=fa?'# پیشنهادهای پژوهشی بر پایهٔ منابع\n\nاین پیشنهادها استنتاج از منابع‌اند، نه نتیجهٔ گزارش‌شده یا ادعای اثبات‌شدهٔ تازگی. پیشنهاد نخست، نقطهٔ شروع برای پژوهش مواد است.\n\n':'# Research ideas grounded in the references\n\nThese are proposed extensions, not reported findings or confirmed novelty. Idea 1 is the suggested materials-focused starting project.\n\n';
    data.ideas.forEach((idea,i)=>{ideas+=`## ${i+1}. ${idea.title}\n\n${idea.badge}\n\n`;['basis','question','hypothesis','design','measures','decision','risk'].forEach((key,j)=>{ideas+=`**${data.labels[j]}:** ${idea[key]}\n\n`;});ideas+=`${fa?'منابع':'Sources'}:\n\n${idea.refs.map(k=>`- [${data.source[k].short}](${data.source[k].url})`).join('\n')}\n\n`;});
    await writeFile(`exports/research-ideas-${lang}.md`,ideas);
    await browser.evaluate(`document.title=${JSON.stringify(fa?'میسل — کامپوزیت‌های میسل–هیدروژل · درس ۲۰ اسلایدی':'Micelle — Polymeric micelle–hydrogel composites · 20-slide lesson')}`);
    await browser.send('Emulation.setEmulatedMedia',{media:'print'});
    const pdf=await browser.send('Page.printToPDF',{printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0});
    const target=`exports/micelle-hydrogel-lesson${fa?'-fa':''}.pdf`;
    await writeFile(target,Buffer.from(pdf.data,'base64'));
    console.log(`Exported ${target}, teaching notes, and research brief.`);
    await browser.send('Emulation.setEmulatedMedia',{media:''});
  }
}finally{await browser.close();}
