function switchLanguage(lang) {
  document.querySelectorAll("[data-lang-hi]").forEach((el) => {
    if (!el.dataset.originalText) {
      el.dataset.originalText = el.innerHTML.trim();
    }
    el.innerHTML = lang === "hi" ? el.getAttribute("data-lang-hi") : el.dataset.originalText;
  });

  document.querySelectorAll(".emailInputBox").forEach((emailInput) => {
    emailInput.placeholder = lang === "hi" ? "ईमेल पता" : "Email Address";
  });  

  const svgEn = document.querySelector(".svg-en");
  const svgHi = document.querySelector(".svg-hi");
  if (svgEn) svgEn.style.display = lang === "en" ? "inline" : "none";
  if (svgHi) svgHi.style.display = lang === "hi" ? "inline" : "none";

  const selectedLanguage = document.getElementById("selectedLanguage");
  if (selectedLanguage) selectedLanguage.textContent = lang === "hi" ? "हिन्दी" : "English";

  // Reset FAQ state
  document.querySelectorAll(".faqCards").forEach((card) => {
    const icon = card.querySelector(".faqToggleIcon");
    if (icon) icon.textContent = "+";
    card.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("emailInput");
  const getStartedBtn = document.getElementById("getStartedBtn");

  if (getStartedBtn && emailInput) {
    getStartedBtn.addEventListener("click", (e) => {
      if (!emailInput.value.trim()) {
        e.preventDefault();
        alert("Please enter an email address first.");
      } else {
        alert("Thank you for signing up! You will receive an email shortly.");
      }
    });
  }

  const languageToggle = document.getElementById("languageToggle");
  const languageOptions = document.getElementById("languageOptions");

  if (languageToggle && languageOptions) {
    languageToggle.addEventListener("click", () => {
      languageOptions.style.display = languageOptions.style.display === "block" ? "none" : "block";
    });

    document.querySelectorAll(".languageOption").forEach((opt) => {
      opt.addEventListener("click", (e) => {
        const lang = e.target.getAttribute("data-lang");
        languageOptions.style.display = "none";
        switchLanguage(lang);
        console.log(`Language changed to ${lang}`);
      });
    });

    document.addEventListener("click", (e) => {
      if (!languageToggle.contains(e.target) && !languageOptions.contains(e.target)) {
        languageOptions.style.display = "none";
      }
    });
  }

  switchLanguage("en");

  // FAQ Toggle
  const faqCards = document.querySelectorAll(".faqCards");
  console.log("Number of FAQ cards found:", faqCards.length);

  faqCards.forEach((card) => {
    const question = card.querySelector(".faqQuestion");
    const answer = card.querySelector(".faqAnswer");
    const icon = question?.querySelector(".faqToggleIcon");

    if (question && answer && icon) {
      question.addEventListener("click", () => {
        const isOpen = card.classList.contains("active");

        faqCards.forEach((c) => {
          c.classList.remove("active");
          const i = c.querySelector(".faqToggleIcon");
          if (i) i.textContent = "+";
        });

        if (!isOpen) {
          card.classList.add("active");
          icon.textContent = "×";
        }
      });
    } else {
      console.error("Missing elements in FAQ card", card);
    }
  });
});
