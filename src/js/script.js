window.history.replaceState(null, null, window.location.pathname);

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.popup');
  const closeBtn = document.querySelector('.popup__close');

  // ✅ Открытие popup по всем кнопкам
  document.querySelectorAll(".open-popup").forEach(btn => {
    if (!btn.closest("header")) {
      btn.addEventListener("click", () => {
        document.querySelector(".popup").classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    }
  });

  // ✅ Закрытие popup по крестику
  closeBtn?.addEventListener('click', () => {
    popup?.classList.add('hidden');
    document.body.style.overflow = "";
  });

  // ✅ Закрытие popup по ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup?.classList.add('hidden');
      document.body.style.overflow = "";
    }
  });

  // ✅ Кнопка "вверх"
  const toTopBtn = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      toTopBtn?.classList.add('visible');
    } else {
      toTopBtn?.classList.remove('visible');
    }
  });
  toTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ✅ Гамбургер-меню
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger?.addEventListener('click', () => {
    nav?.classList.toggle('active');
  });

  document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav?.classList.remove('active');
    });
  });

  // Всплывающие окна меню-категорий
  document.querySelectorAll('.menu__item').forEach(item => {
    item.addEventListener('click', () => {
      const category = item.getAttribute('data-category');
      const popup = document.getElementById(`popup-${category}`);
      popup?.classList.remove('hidden');
    });
  });

  document.querySelectorAll('.menu-popup__close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.menu-popup')?.classList.add('hidden');
    });
  });

  // ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА
  const ruBtn = document.getElementById("lang-ru");
  const enBtn = document.getElementById("lang-en");

  const savedLang = localStorage.getItem("lang") || "ru";
  switchLanguage(savedLang);
  updateLangButtons(savedLang);

  ruBtn?.addEventListener("click", () => {
    switchLanguage("ru");
    localStorage.setItem("lang", "ru");
    updateLangButtons("ru");
  });

  enBtn?.addEventListener("click", () => {
    switchLanguage("en");
    localStorage.setItem("lang", "en");
    updateLangButtons("en");
  });

  function updateLangButtons(lang) {
    ruBtn?.classList.toggle("active", lang === "ru");
    enBtn?.classList.toggle("active", lang === "en");
  }

  function switchLanguage(lang) {
    document.querySelectorAll("a[href='#menu']").forEach(el => {
      el.textContent = lang === "en" ? "Menu" : "Меню";
    });
    document.querySelectorAll("a[href='#reservation']").forEach(el => {
      el.textContent = lang === "en" ? "Reserve" : "Забронировать";
    });
    document.querySelectorAll("a[href='#contacts']").forEach(el => {
      el.textContent = lang === "en" ? "Contacts" : "Контакты";
    });

    const h1 = document.querySelector(".hero__content h1");
    if (h1) {
      h1.innerHTML = lang === "en"
        ? 'Welcome to <span>Gurmaniko</span>'
        : 'Добро пожаловать в <span>Гурманико</span>';
    }

    const p = document.querySelector(".hero__content p");
    if (p) {
      p.textContent = lang === "en"
        ? "Dive into the atmosphere of true Georgian cuisine"
        : "Погрузитесь в атмосферу настоящей грузинской кухни";
    }
  }
});
