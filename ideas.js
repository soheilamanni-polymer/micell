/* Proposed extensions, not claims of novelty or reported findings. */
window.MICELLE.source.fang={short:'Fang et al., 2020 · review ref. 38',url:'https://doi.org/10.1021/acsami.0c13009'};
window.MICELLE_IDEAS={
  en:[
    {title:'Separate drug dose from gel stiffness',badge:'Suggested starting project · materials-focused',refs:['review','qin'],
      basis:'The review describes coupling between micelle content, crosslink density, and release. Qin et al. demonstrates distinct cargo compartments in a micellar network.',
      question:'Can cargo amount change without a substantial change in mechanics when structural micelles and cargo-bearing guest micelles have separate roles?',
      hypothesis:'At fixed total carrier-polymer content, replacing blank guest micelles with loaded guest micelles may vary dose while reducing changes to network stiffness.',
      design:'Compare two network-junction densities and three loaded/blank guest-micelle ratios. Hold total guest-micelle polymer and matrix composition constant within each density. Include an all-junction carrier design and a matrix containing embedded carriers as comparisons.',
      measures:'Micelle size/dispersity, drug loading, storage modulus G′, swelling, degradation, carrier escape, and normalized release measured by a validated drug assay.',
      decision:'A promising result is a useful dose range with small changes in G′ and retention. Predefine acceptable changes from the intended application; do not interpret a nonsignificant test alone as equivalence.',
      risk:'Drug loading may alter micelle size or interactions, so independent control is a hypothesis to test. This is a practical starting point because the first stage can use material and release measurements before biological experiments.'},
    {title:'Distinguish force-triggered release from damage',badge:'Mechanism-focused extension',refs:['review','fang'],
      basis:'Fang et al. reports a mechanically responsive F127-micelle-crosslinked zwitterionic hydrogel with antimicrobial cargo.',
      question:'Under repeated loading, is extra release caused by reversible micelle deformation, escaping carriers, or irreversible gel damage?',
      hypothesis:'An optimized reversible network may retain repeatable load-dependent release while limiting carrier loss and permanent damage.',
      design:'Compare unloaded, static-load, and cyclic-load conditions at matched initial loading. Add a nonresponsive formulation with comparable initial mechanics, plus blank-gel and free-cargo controls. Examine recovery between loading blocks rather than only one stretch.',
      measures:'Drug release separately from released carrier polymer, mass loss, recovery of G′, crack formation, and remaining cargo. Assess antibacterial activity only after identifying the material mechanism.',
      decision:'Support for reversible release requires a reproducible load effect with recovery and limited carrier/matrix loss, not just a larger release signal.',
      risk:'Loading can increase convection and diffusion even without a responsive micelle. Matched controls and separate carrier tracking are essential. This extends the mechanism question; it does not claim that mechanically responsive dressings are new.'},
    {title:'Add aligned transport channels to a nerve scaffold',badge:'Biology-focused extension · more demanding',refs:['review','deng'],
      basis:'Deng et al. describes a DHF-loaded conductive micellar hydrogel inside a chitosan nerve conduit, evaluated in a rat sciatic-nerve model.',
      question:'Can aligned channels improve transport and directional cell growth while preserving cargo retention and suitable mechanics?',
      hypothesis:'Longitudinal channels may improve transport and cell alignment relative to a bulk gel, but could accelerate cargo or micelle escape.',
      design:'Compare bulk gel, aligned-channel gel, and randomly oriented channels with matched composition, cargo, and comparable channel volume. Use molding or another compatible fabrication route; do not assume a solvent-based self-assembly process is suitable for implantation.',
      measures:'Tracer transport, release, carrier escape, G′, cell viability, Schwann-cell alignment, and neurite directionality. Begin with material tests and cell models.',
      decision:'Look for improved transport or directionality without an unacceptable loss of retention or mechanics; geometry-only controls help identify the channel effect.',
      risk:'Channels also change surface area and stiffness. Geometry, gel chemistry, and drug effects need separate controls. Animal efficacy and human benefit are not implied by a successful cell experiment.'}
  ],
  fa:[
    {title:'تنظیم دوز دارو مستقل از سفتی ژل',badge:'پیشنهاد برای شروع · پژوهش مواد',refs:['review','qin'],
      basis:'مقالهٔ مروری وابستگی مقدار میسل، چگالی اتصالات شبکه و رهایش را توضیح می‌دهد. مطالعهٔ Qin نیز محفظه‌های متفاوت حمل دارو در یک شبکهٔ میسلی را نشان می‌دهد.',
      question:'آیا با جدا کردن نقش میسل‌های سازندهٔ شبکه از میسل‌های مهمانِ حامل دارو، می‌توان مقدار دارو را بدون تغییر محسوس خواص مکانیکی تنظیم کرد؟',
      hypothesis:'با ثابت نگه داشتن مقدار کل پلیمر حامل و جایگزینی میسل‌های مهمانِ خالی با میسل‌های بارگذاری‌شده، شاید دوز تغییر کند و سفتی شبکه تقریباً ثابت بماند.',
      design:'دو چگالی اتصال شبکه و سه نسبت میسل مهمانِ پُر به خالی را مقایسه کنید. در هر چگالی، مقدار کل پلیمر میسل‌های مهمان و ترکیب ماتریس ثابت باشد. یک سامانه با میسل‌های صرفاً اتصال‌دهنده و یک ماتریس با حامل‌های صرفاً محبوس نیز مقایسه شوند.',
      measures:'اندازه و پراکندگی میسل، مقدار داروی بارگذاری‌شده، مدول ذخیره‌ای G′، تورم، تخریب، خروج حامل و رهایش نرمال‌شده با یک روش معتبر سنجش دارو.',
      decision:'نتیجهٔ مطلوب، دامنهٔ قابل‌استفادهٔ دوز با تغییر اندک G′ و حفظ حامل است. حد تغییر قابل‌قبول را بر اساس کاربرد از قبل تعریف کنید؛ غیرمعنادار بودن آماری به‌تنهایی برابری را ثابت نمی‌کند.',
      risk:'بارگذاری دارو ممکن است اندازه یا برهم‌کنش میسل‌ها را تغییر دهد؛ استقلال دو متغیر هنوز یک فرضیه است. این گزینه برای شروع عملی‌تر است، چون مرحلهٔ اول با آزمون‌های مواد و رهایش انجام می‌شود.'},
    {title:'تفکیک رهایش ناشی از نیرو از آسیب شبکه',badge:'پژوهش سازوکار',refs:['review','fang'],
      basis:'Fang و همکاران هیدروژل زویتریونی با میسل‌های اتصال‌دهندهٔ F127 و محمولهٔ ضدمیکروبی پاسخ‌گو به نیروی مکانیکی را گزارش کرده‌اند.',
      question:'در بارگذاری تکراری، افزایش رهایش ناشی از تغییرشکل برگشت‌پذیر میسل است، خروج حامل است یا آسیب دائمی ژل؟',
      hypothesis:'یک شبکهٔ برگشت‌پذیرِ بهینه شاید رهایش وابسته به بار را به‌صورت تکرارپذیر ایجاد کند و هم‌زمان خروج حامل و آسیب دائمی را کاهش دهد.',
      design:'شرایط بدون بار، بار ثابت و بارگذاری چرخه‌ای را با مقدار داروی اولیهٔ برابر مقایسه کنید. فرمولاسیون غیرپاسخ‌گو با خواص مکانیکی اولیهٔ مشابه، ژل خالی و داروی آزاد نیز کنترل باشند. بازیابی میان چند دورهٔ بارگذاری بررسی شود.',
      measures:'رهایش دارو جدا از پلیمر حاملِ خارج‌شده، افت جرم، بازیابی G′، ایجاد ترک و داروی باقی‌مانده. فعالیت ضدباکتری پس از روشن شدن سازوکار ماده ارزیابی شود.',
      decision:'برای حمایت از رهایش برگشت‌پذیر، اثر بار باید تکرارپذیر باشد و با بازیابی شبکه و خروج کم حامل همراه شود؛ صرف افزایش سیگنال رهایش کافی نیست.',
      risk:'نیرو می‌تواند حتی بدون میسل پاسخ‌گو، همرفت و نفوذ را افزایش دهد. کنترل‌های همسان و رهگیری جداگانهٔ حامل ضروری‌اند. موضوع، توسعهٔ پرسش سازوکار است؛ پانسمان پاسخ‌گو به نیرو ایدهٔ تازه‌ای محسوب نشده است.'},
    {title:'کانال‌های هم‌راستا در داربست ترمیم عصب',badge:'پژوهش زیستی · نیازمند امکانات بیشتر',refs:['review','deng'],
      basis:'Deng و همکاران ژل میسلی رسانای حامل DHF را داخل مجرای کیتوسانی عصب در مدل آسیب عصب سیاتیک موش صحرایی بررسی کرده‌اند.',
      question:'آیا کانال‌های هم‌راستا انتقال مواد و رشد جهت‌دار سلول‌ها را بهتر می‌کنند و در عین حال نگهداشت دارو و خواص مکانیکی مناسب حفظ می‌شود؟',
      hypothesis:'کانال‌های طولی شاید انتقال و هم‌راستایی سلول را نسبت به ژل توده‌ای بهتر کنند، اما خروج دارو یا میسل را نیز افزایش دهند.',
      design:'ژل توده‌ای، ژل با کانال طولی و ژل با کانال‌های تصادفی را با ترکیب، مقدار دارو و حجم کانالِ قابل‌مقایسه بررسی کنید. قالب‌گیری یا روش سازگار دیگری انتخاب شود؛ مناسب بودن روش‌های مبتنی بر حلال برای کاشت نباید فرض شود.',
      measures:'انتقال ردیاب، رهایش، خروج حامل، G′، زنده‌مانی سلول، هم‌راستایی سلول شوان و جهت نوریت‌ها. شروع با آزمون مواد و مدل سلولی باشد.',
      decision:'بهبود انتقال یا جهت‌گیری باید بدون افت نامطلوب نگهداشت و خواص مکانیکی رخ دهد. کنترل هندسه به شناسایی اثر خودِ کانال کمک می‌کند.',
      risk:'کانال‌ها سطح تماس و سفتی را هم تغییر می‌دهند. اثر هندسه، شیمی ژل و دارو باید جداگانه کنترل شود. موفقیت سلولی به‌معنی اثربخشی حیوانی یا بالینی نیست.'}
  ]
};
const ideaSlide={chapter:4,title:'Turn the references into research questions.',nav:'Research ideas',
body:`<div class="research-grid"><div class="research-card"><span class="card-index">01 / START HERE</span><h3>Dose and stiffness</h3><p>Give structural micelles and guest carriers separate roles.</p><div class="research-test"><b>Test</b><span>Vary loaded/blank carrier ratio at fixed total polymer.</span></div></div><div class="research-card"><span class="card-index">02 / MECHANISM</span><h3>Response or damage?</h3><p>Distinguish force-driven release from carrier escape.</p><div class="research-test"><b>Test</b><span>Track drug, carrier loss, and recovery under cyclic load.</span></div></div><div class="research-card"><span class="card-index">03 / ARCHITECTURE</span><h3>Channels for nerves</h3><p>Balance directional transport with local cargo retention.</p><div class="research-test"><b>Test</b><span>Compare aligned channels, random channels, and bulk gel.</span></div></div></div><p class="research-disclaimer">Proposed extensions, not reported results. Open “Research ideas” for hypotheses, controls, measurements, and references.</p>`,
takeaway:'Start with a testable question and controls that separate the mechanisms.',refs:['review','qin','fang','deng'],
notes:'These three proposals are inferences from the references, not results reported in them and not claims of established originality. For a materials-focused starting project, separate the role of structural micelles from cargo-bearing guest micelles and test whether dose changes can preserve mechanics. A mechanism-focused project can determine whether load-dependent release reflects reversible deformation, carrier escape, or network damage. A more demanding biological project can compare aligned transport channels with bulk and random-channel nerve scaffolds. The research-ideas panel gives the supporting references, hypotheses, comparisons, measurements, decision criteria, and limitations. A focused literature and novelty review is needed before committing to a project.'};
window.MICELLE.slides.splice(window.MICELLE.slides.length-1,0,ideaSlide);
const finalSlide=window.MICELLE.slides.at(-1);
finalSlide.body=finalSlide.body.replace('</div></div>',`<a class="extra-source" href="${window.MICELLE.source.fang.url}" target="_blank" rel="noopener"><b>06 / MECHANICAL RELEASE</b><small>Fang et al. (2020) · DOI: 10.1021/acsami.0c13009 ↗</small></a></div></div>`);
finalSlide.notes+=' Reference 38 is Fang et al., ACS Applied Materials & Interfaces 12 (2020), 52307–52318. Slide 19 presents proposed extensions from the references.';
