// === Slider ===
const sliderContainer = document.getElementById("text-slider");
sliderContainer.innerHTML = '<div class="slide-text"></div>';

const texts = [
  "Φρέσκα κρέατα καθημερινά, απευθείας από τον παραγωγό.",
  "Επιλέγουμε μόνο την καλύτερη ποιότητα για εσάς.",
  "Μεράκι και αγάπη για κάθε κομμάτι κρέατος.",
  "Η παράδοση συναντά τη γεύση – Love to meat you!"
];

let index = 0;
const slideElement = sliderContainer.querySelector(".slide-text");

function showSlide() {
  slideElement.classList.remove("fade-in");
  void slideElement.offsetWidth;
  slideElement.textContent = texts[index];
  slideElement.classList.add("fade-in");
  index = (index + 1) % texts.length;
}

showSlide();
setInterval(showSlide, 3000);

// === Φόρτωση δυναμικού περιεχομένου ===
fetch("products.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("products-container").innerHTML = data;
  });

fetch("about.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("about-container").innerHTML = data;
  });

// === Εμφάνιση popup προσφορών ===
setTimeout(() => {
  const popup = document.getElementById("offer-popup");
  if (popup) {
    popup.classList.remove("hidden");
  }
}, 5000);

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", () => {
  // Κλείσιμο popup
  const closePopupBtn = document.querySelector(".close-btn");
  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", () => {
      const popup = document.getElementById("offer-popup");
      if (popup) {
        popup.classList.add("hidden");
      }
    });
  }

  // Άνοιγμα πάνελ από το μενού
  const offersLink = document.querySelector(".offers-link");
  const offersPanel = document.getElementById("offers-panel");
  const offersContainer = document.getElementById("offers-container");
  const closePanelBtn = document.querySelector(".close-offers");

  if (offersLink && offersPanel) {
    offersLink.addEventListener("click", (e) => {
      e.preventDefault();
      offersPanel.classList.add("show");
      offersPanel.classList.remove("hidden");

      fetch("offers.html")
        .then(res => res.text())
        .then(data => {
          offersContainer.innerHTML = data;
        });
    });
  }

  // Κλείσιμο πάνελ
  if (closePanelBtn) {
    closePanelBtn.addEventListener("click", () => {
      offersPanel.classList.remove("show");
    });
  }

  // Άνοιγμα πάνελ από το popup
  const openPanelBtn = document.getElementById("open-offers-panel");
  if (openPanelBtn && offersPanel) {
    openPanelBtn.addEventListener("click", () => {
      // Κλείνουμε το popup
      document.getElementById("offer-popup").classList.add("hidden");

      // Μικρό delay για smooth animation
      setTimeout(() => {
        offersPanel.classList.add("show");
        offersPanel.classList.remove("hidden");

        fetch("offers.html")
          .then(res => res.text())
          .then(data => {
            offersContainer.innerHTML = data;
          });
      }, 150);
    });
  }
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".main-nav");
  if (window.scrollY > 20) {
    nav.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  } else {
    nav.style.boxShadow = "none";
  }
});

