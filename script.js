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
      q: "Sticker yaratmaq",
      a: "https://getstickerpack.com/ Sticker yaratmaq üçün bu sayıtdan istifadə et."
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
    q: "Canlı xəritə",
    a: "Canlı yol və xəritə navigasiyası üçün istifadə olunur https://www.waze.com/tr/live-map"
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
  },
],


};







//======================
// Səslər 
//======================
const AUDIO_MAP = {
  "Linkə gir və tiktok vidyosunun linkini yapışdır.https://ssstik.io": "/logosuz.və.gizli.mp3",

  "Linkə gir https://savefrom.com.de": "/Youtube.video.musiqi.mp3",
  
  "Canlı yol və xəritə navigasiyası üçün istifadə olunur https://www.waze.com/tr/live-map": "/Waze.navigation.mp3",

  "Saytda öz səsini klonla və bilməlisən ki (Sayt pulludur) https://elevenlabs.io": "/Səs.klonlama.mp3",

  "Süni intellekt platformasıdır.https://gemini.google.com/app": "/gemini.mp3",

  "Linkə gir https://www.remove.bg": "/Youtube.video.musiqi.mp3",

  "Sticker yaratmaq üçün bu sayıtdan istifadə et.https://getstickerpack.com/": "/whatsapp.sticker.mp3",

  "WhatsApp açılmırsa, tədbiqi yenilə keşini təmizlə və telefonu yenidən başlat.": "/whatsapp.açılmır.mp3",

  "Whatsapp mesaj getmirsə interneti yoxla uçuş rejimini açıb bağla və telefonu restart et.": "/whatsapp.mesaj.getmir.mp3",

  "Telegrama girmirsə vəya telegramdan atırsa səni, o zaman telefonu söndür yandır.": "/Telegrama.girmir.vəya.atırsa.telegramdan.mp3",

  "İnstagram açılmırsa interneti yoxla tədbigi bağlayıb aç keş təmizlə və yeniləmə olub olmadığını yoxla": "/instagram.açılmır.mp3",

  "Gir və yüklə https://apps.apple.com/il/app/translate-add-subtitles-video/id1548718114": "/video.tərcümə.mp3",

  "Gir və yüklə https://apps.apple.com/us/app/paysend-simple-money-transfer/id1140130413": "/video.tərcümə.mp3",

  "Gir və yüklə https://play.google.com/store/apps/details?id=com.paysend.app&hl=en": "/video.tərcümə.mp3",
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
  const box=document.getElementById("voteMessage");
  box.innerText=text;
  box.classList.add("show");
}

