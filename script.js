// Səhifə yenilənəndə həmişə yuxarıdan açılsın
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  
};

console.log("JS yükləndi");
let currentAudio = null;

/* =====================
   DATA – BÜTÜN BÖLMƏLƏR
   ===================== */
const DATA = {
  whatsapp: [
    {
      q: "WhatsApp açılmır",
      a: "WhatsApp açılmırsa, tədbiqi yenilə keşini təmizlə və telefonu yenidən başlat."
    },
    {
      q: "Mesaj getmir",
      a: "Whatsapp mesaj getmirsə interneti yoxla uçuş rejimini açıb bağla və telefonu restart et."
    },
    {
      q: "Sticker yaratmaq (Android)",
      a:  "Sticker yaratmaq üçün gir və yüklə.https://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp"
    },
    {
      q: "Sticker yaratmaq (Ios)",
      a: "Sticker yaratmaq üçün gir və yüklə.https://apps.apple.com/us/app/sticker-maker-studio/id1443326857"
    }
  ],

  telegram: [
    {
      q: "Telegram girmir",
      a: "Telegrama girmirsə vəya telegramdan atırsa səni, o zaman telefonu söndür yandır."
    },
  ],

  instagram: [
    {
      q: "Instagram açılmır",
      a: "İnstagram açılmırsa interneti yoxla tədbigi bağlayıb aç keş təmizlə və yeniləmə olub olmadığını yoxla"
    },
  ],

  tiktok: [
    {
      q: "Video yükləmək",
      a: "Linkə gir və tiktok vidyosunun linkini yapışdır.https://ssstik.io"
    }
  ],

  removebg: [
    {
      q: "Fon silmək",
      a: "Linkə gir https://www.remove.bg"
    }
  ],

  gemini: [
    {
      q: "Süni intellekt nədir?",
      a: "Süni intellekt platformasıdır.https://gemini.google.com/app"
    }
  ],

  navigator: [
  {
    q: "Canlı xəritə (Ios)",
    a: "Canlı yol və xəritə navigasiyası üçün istifadə olunur https://apps.apple.com/us/app/waze-navigation-live-traffic/id323229106"
  },
  {
    q: "Canlı xəritə (Android)",
    a: "Canlı yol və xəritə navigasiyası üçün istifadə olunur https://play.google.com/store/apps/details?id=com.waze&hl=en-US"
  }
],

youtube: [
  {
    q: "Video və musiqi yükləmə",
    a: "Linkə gir https://savefrom.com.de"
  }
],

elevenlabs: [
  {
    q: "Səs klonlama",
    a: "Saytda öz səsini klonla və bilməlisən ki (Sayt pulludur) https://elevenlabs.io"
  }
],

Translate_Add_Subtitles_Video: [
  {
    q: "Videonu tərcümə etmə (İOS)",
    a: "Gir və yüklə https://apps.apple.com/il/app/translate-add-subtitles-video/id1548718114"
  }
],

Paysend: [
  {
    q: "Xaricdən pul göndərmə (İos)",
    a: "Gir və yüklə https://apps.apple.com/us/app/paysend-simple-money-transfer/id1140130413"
  },
  {
    q: "Xaricdən pul göndərmə (Android)",
    a: "Gir və yüklə https://play.google.com/store/apps/details?id=com.paysend.app&hl=en"
  }
],

NextDNS: [
  {
    q: "Reklamları durdurma (Ios)",
    a: "Gir yüklə və quraşdır https://apps.apple.com/tr/app/nextdns/id1463342498?l=tr"
  }
],

Pdf: [
  {
    q: "PDF (Ios)",
    a: "Pdf düzəltmək üçün gir və yüklə https://apps.apple.com/us/app/photos-pdf-scanner-converter/id1210034113"
  }
],

SpeedTest: [
  {
    q:"Sürəti yoxla",
    a: "İnternetin sürətini yoxla https://www.speedtest.net/"
  }
],

};







//======================
// Səslər 
//======================
const AUDIO_MAP = {
  "Linkə gir və tiktok vidyosunun linkini yapışdır.https://ssstik.io": "/logosuz.və.gizli.mp3",

  "Linkə gir https://savefrom.com.de": "/Youtube.video.musiqi.mp3",

  "Saytda öz səsini klonla və bilməlisən ki (Sayt pulludur) https://elevenlabs.io": "/Səs.klonlama.mp3",

  "Süni intellekt platformasıdır.https://gemini.google.com/app": "/gemini.mp3",

  "Linkə gir https://www.remove.bg": "/Youtube.video.musiqi.mp3",

  "Sticker yaratmaq üçün gir və yüklə.https://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp": "/whatsapp.sticker.mp3",

  "Sticker yaratmaq üçün gir və yüklə.https://apps.apple.com/us/app/sticker-maker-studio/id1443326857": "/whatsapp.sticker.mp3",

  "WhatsApp açılmırsa, tədbiqi yenilə keşini təmizlə və telefonu yenidən başlat.": "/whatsapp.açılmır.mp3",

  "Whatsapp mesaj getmirsə interneti yoxla uçuş rejimini açıb bağla və telefonu restart et.": "/whatsapp.mesaj.getmir.mp3",

  "Telegrama girmirsə vəya telegramdan atırsa səni, o zaman telefonu söndür yandır.": "/Telegrama.girmir.vəya.atırsa.telegramdan.mp3",

  "İnstagram açılmırsa interneti yoxla tədbigi bağlayıb aç keş təmizlə və yeniləmə olub olmadığını yoxla": "/Instagram.açılmır.mp3", 

  "Gir və yüklə https://apps.apple.com/il/app/translate-add-subtitles-video/id1548718114": "/video.tərcümə.mp3",

  "Gir və yüklə https://apps.apple.com/us/app/paysend-simple-money-transfer/id1140130413": "/video.tərcümə.mp3",

  "Gir və yüklə https://play.google.com/store/apps/details?id=com.paysend.app&hl=en": "/video.tərcümə.mp3",
  
  "Canlı yol və xəritə navigasiyası üçün istifadə olunur https://play.google.com/store/apps/details?id=com.waze&hl=en-US": "/Waze.navigation.mp3",

  "Canlı yol və xəritə navigasiyası üçün istifadə olunur https://apps.apple.com/us/app/waze-navigation-live-traffic/id323229106": "/Waze.navigation.mp3",
  
  "Gir yüklə və quraşdır https://apps.apple.com/tr/app/nextdns/id1463342498?l=tr": "/nextdns.mp3",

  "İnternetin sürətini yoxla https://www.speedtest.net/": "/speed.mp3",

  "Pdf düzəltmək üçün gir və yüklə https://apps.apple.com/us/app/photos-pdf-scanner-converter/id1210034113": "/pdf.mp3",
};

function playVoice() {
  if (!currentAudio) {
    return;
  }

  

  const audio = document.getElementById("voice");
  audio.pause();
  audio.currentTime = 0;
  audio.src = currentAudio;
  audio.play().catch(e => console.log("Səs açılmadı:", e));
}

function stopVoice() {
  const audio = document.getElementById("voice");
  audio.pause();
  audio.currentTime = 0;
}
/* =====================
   KATEQORİYA AÇ
   ===================== */
function openCategory(name, btn) {
  setActiveGlow(btn);
  // aktiv düymə
  document.querySelectorAll(".icon").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const box = document.getElementById("questionsBox");
  const answerBox = document.getElementById("answerBox");

  box.innerHTML = "";
  box.style.display = "block";
  answerBox.style.display = "block";

  if (!DATA[name]) {
    box.innerHTML = "<p>Bu bölmə hələ hazır deyil</p>";
    return;
  }

  DATA[name].forEach(item => {
    const qBtn = document.createElement("button");
    qBtn.className = "q-item";
    qBtn.textContent = item.q;

    qBtn.onclick = () => showAnswer(item.a);

    box.appendChild(qBtn);
  });

  setTimeout(() => {
  document.getElementById("questionsBox")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}, 100);
}

/* =====================
   CAVABI GÖSTƏR
   ===================== */
function showAnswer(text) {
  const answerBox = document.getElementById("answerBox");
  const textAnswer = document.getElementById("textAnswer");

  const linkRegex = /(https?:\/\/[^\s]+)/;
  const match = text.match(linkRegex);

  if (match) {
    const link = match[0];
    const description = text.replace(link, "").trim();

    textAnswer.innerHTML = `

    
      <div>${description}</div>
      <div style="margin-top:10px;">
        <a href="${link}" target="_blank">${link}</a>
      </div>
    `;
    } else {
    textAnswer.textContent = text;
  }

    document.getElementById("voiceControls").style.display = "block";

  

  answerBox.classList.remove("show");
  void answerBox.offsetHeight;
  answerBox.classList.add("show");

  currentAudio = AUDIO_MAP[text] || null;

  setTimeout(() => {
  const controls = document.querySelector(".action-btn");
  if (controls) {
    controls.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}, 150);
}

function setActiveGlow(btn) {
  document.querySelectorAll(".action-btn").forEach(b => {
    b.classList.remove("active-glow");
  });

  btn.classList.add("active-glow");
}


document.addEventListener('DOMContentLoaded', () => {

  // ikon vurulanda suallara scroll
  document.querySelectorAll('.icon').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.questionsBox')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // sual vurulanda cavaba scroll
  document.addEventListener('click', e => {
    if (e.target.closest('.q-item')) {
      document.querySelector('#answerBox')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

});

const searchBox = document.getElementById("searchBox");

if (searchBox) {
  searchBox.addEventListener("input", function () {
    const value = this.value.toLowerCase().trim();
    const icons = document.querySelectorAll(".icon");
    const questions = document.querySelectorAll(".q-item");
    const questionsBox = document.getElementById("questionsBox");
    const answerBox = document.getElementById("answerBox");

    // 🔁 AXTARIŞ TAM BOŞDURSA → ANA EKRAN
    if (value === "") {
      icons.forEach(i => i.style.display = "flex");
      questionsBox.style.display = "none";
      answerBox.style.display = "none";
      return;
    }

    // 🔍 AXTARIŞ VARSA → FILTER
    icons.forEach(i => {
      i.style.display =
        i.textContent.toLowerCase().includes(value)
          ? "flex"
          : "none";
    });

    questions.forEach(q => {
      q.style.display =
        q.textContent.toLowerCase().includes(value)
          ? "block"
          : "none";
    });
  });
}

function sendVote(value){

  if(localStorage.getItem("voted")){
    showMessage("Siz artıq səs vermisiniz ");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbwrQlSrOkCN5jlTrSXV_E7QnEQmkW6Xsvre2OJKHU3HDMDCtU7KdxdL-L7y-5mejfUI/exec",{
    method:"POST",
    body:new URLSearchParams({
      vote:value
    })
  });

  localStorage.setItem("voted","true");

  showMessage("Səsiniz qəbul edildi 👍");
}


function showMessage(text){
  const overlay = document.getElementById("overlay");
  const box=document.getElementById("voteMessage");
  box.innerText=text;
  box.classList.add("show");
}

function toggleMenu() {
  const menu = document.getElementById("menu");

  if (menu.style.display === "block") {
    menu.style.display = "none";
    closeAllSections();
  } else {
    menu.style.display = "block";

    // 👇 ƏN VACİB BURADI
    closeAllSections();
  }
}

function toggleSection(id) {
  const sections = document.querySelectorAll(".menu-section");

  sections.forEach(sec => {
    if (sec.id === id) {
      sec.style.display =
        sec.style.display === "block" ? "none" : "block";
    } else {
      sec.style.display = "none";
    }
  });
}

document.addEventListener("click", function (e) {
  const menu = document.getElementById("menu");
  const btn = document.querySelector(".menu-btn");

  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.style.display = "none";
    closeAllSections();
  }
});

function closeAllSections() {
  const sections = document.querySelectorAll(".menu-section");

  sections.forEach(sec => {
    sec.style.display = "none";
  });
}

window.onload = function () {
  document.getElementById("menu").style.display = "none";
};

setTimeout(() => {
  document.getElementById("menu").style.display = "none";
}, 0);

function shareSite() {
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: "Qısa Cavab",
      text: "Bu sayta bax 👍",
      url: url
    });
  } else {
    navigator.clipboard.writeText(url);
    alert("Link kopyalandı 👍");
  }
}

document.getElementById("overlay").addEventListener("click", function () {
  document.getElementById("menu").style.display = "none";
  this.style.display = "none";
  closeAllSections();
});


const translations = {
  az: {
    title: "Problemini Axtar Və Tap",
    subtitle: "Qısa və aydın cavab al",
    desc: "Lazım olan saytları və pragramları burada tapa bilərsiz",
    desc1: "Bu sayt müxtəlif problemlərə qısa və aydın cavablar təqdim edir.",
    desc2: "WhatsApp, Instagram və digər tətbiqlərlə bağlı həll yollarını tapa bilərsiniz.",
    desc3: "Məqsədimiz istifadəçilərə sürətli və faydalı məlumat verməkdir.",
    feedback: "Bu cavab faydalı oldumu?",
    search: "Problemini yaz...",
    share: "📤 Paylaş",
    contact: "📞 Əlaqə",
    info: "📌 Sayt Məlumatı",
    

    footer1: "© 2026 Qısa Cavab Saytı",
    footer2: "Bu sayt məlumatlandırma məqsədi daşıyır və rəsmi dəstək xidməti deyil."
  },

  tr: {
    title: "Problemini Ara ve Bul",
    subtitle: "Kısa ve net cevap al",
    desc: "Gerekli site ve programları burada bulabilirsiniz",
    desc1: "Bu site çeşitli sorunlara kısa ve net cevaplar sunar.",
    desc2: "WhatsApp, Instagram ve diğer uygulamalarla ilgili çözümler bulabilirsiniz.",
    desc3: "Amacımız kullanıcılara hızlı ve faydalı bilgi sunmaktır.",
    feedback: "Bu cevap faydalı oldu mu?",
    search: "Problemini yaz...",
    share: "📤 Paylaş",
    contact: "📞 İletişim",
    info: "📌 Site Bilgisi",

    footer1: "© 2026 Kısa Cevap Sitesi",
    footer2: "Bu site bilgilendirme amaçlıdır ve resmi destek hizmeti değildir.",
  },

  ru: {
    title: "Найди решение проблемы",
    subtitle: "Короткий и ясный ответ",
    desc: "Здесь вы можете найти нужные сайты и программы",
    desc1: "Этот сайт предоставляет краткие и понятные ответы на различные проблемы.",
    desc2: "Вы можете найти решения для WhatsApp, Instagram и других приложений.",
    desc3: "Наша цель — предоставить пользователям быструю и полезную информацию.",
    feedback: "Этот ответ был полезен?",
    search: "Напиши проблему...",
    share: "📤 Поделиться",
    contact: "📞 Контакт",
    info: "📌 Информация о сайте",

    footer1: "© 2026 Сайт Кратких Ответов",
    footer2: "Этот сайт носит информационный характер и не является официальной службой поддержки.",
  },

  en: {
    title: "Find Your Problem Solution",
    subtitle: "Get quick and clear answers",
    desc: "You can find the necessary websites and apps here",
    desc1: "This site provides short and clear answers to various problems.",
    desc2: "You can find solutions for WhatsApp, Instagram and other applications.",
    desc3: "Our goal is to provide users with fast and useful information.",
    feedback: "Was this answer helpful?",
    search: "Type your problem...",
    share: "📤 Share",
    contact: "📞 Contact",
    info: "📌 Site Info",

    footer1: "© 2026 Short Answer Site",
    footer2: "This site is for informational purposes and is not an official support service.",
  }
};



function applyLang(lang) {
  const t = translations[lang];
  

  document.getElementById("title").innerText = t.title;
  document.getElementById("subtitle").innerText = t.subtitle;
  document.getElementById("searchBox").placeholder = t.search;
  document.getElementById("footer1") .innerText = t.footer1;
  document.getElementById("footer2") .innerText = t.footer2;
  document.getElementById("desc").innerText = t.desc;
  document.getElementById("desc1").innerText = t.desc1;
document.getElementById("desc2").innerText = t.desc2;
document.getElementById("desc3").innerText = t.desc3;
document.getElementById("feedback").innerText = t.feedback;

  // menu dəyiş
  const items = document.querySelectorAll(".menu-item");

  if (items[0]) items[0].innerText = t.share;
  if (items[1]) items[1].innerText = t.info;
  if (items[2]) items[2].innerText = t.contact;
}

function changeLang(lang) {
  localStorage.setItem("lang", lang);
  applyLang(lang);

  // 👇 flag dəyişir
  const btn = document.getElementById("langBtn");

if (lang === "az") btn.innerHTML = '🌐 Dil: <img src="https://flagcdn.com/w20/az.png"> Azərbaycan';
if (lang === "tr") btn.innerHTML = '🌐 Dil: <img src="https://flagcdn.com/w20/tr.png"> Türk';
if (lang === "ru") btn.innerHTML = '🌐 Dil: <img src="https://flagcdn.com/w20/ru.png"> Русский';
if (lang === "en") btn.innerHTML = '🌐 Dil: <img src="https://flagcdn.com/w20/gb.png"> English';
}
// səhifə açılan kimi
window.addEventListener("DOMContentLoaded", () => {
  const lang = "az"
  applyLang(lang);
});
