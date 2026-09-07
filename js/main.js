document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      mobileNav.classList.toggle("open");
    });
  }

  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "Thank you! Your message has been received. Our team will get back to you shortly.";
        status.classList.add("success");
      }
      form.reset();
    });
  }

  initProductDetails();
});

/* ==========================================================================
   Product details modal (products page)
   ========================================================================== */

function initProductDetails() {
  var triggers = document.querySelectorAll("[data-product-details]");
  if (!triggers.length) return;

  var products = {
    pepper: {
      name: "Ceylon Black Pepper",
      image: "assets/images/pepper-bowl.jpg",
      intro: "Handpicked from Sri Lanka's hill-country estates and naturally sun-dried, Ceylon Black Pepper is prized for its bold, pungent aroma and an exceptionally high piperine and essential-oil content.",
      forms: ["Whole (Black)", "Cracked", "Ground", "White Pepper (on request)"],
      specs: [
        ["Piperine content", "3.5% – 5.5%"],
        ["Volatile essential oil", "2% – 4%"],
        ["Moisture", "12% max"],
        ["Bulk density", "500 – 600 g/l"],
        ["Light berries", "2% max"],
        ["Foreign matter", "1% max"],
        ["Grades", "G1, G2, MG1 · Garbled & Ungarbled"]
      ],
      packaging: "25 kg and 50 kg food-grade PP or jute bags for bulk supply, resealable retail pouches, and full private-label packaging to your specification.",
      uses: "Table seasoning, spice and masala blends, meat and snack seasoning, and oleoresin / essential-oil extraction."
    },
    vanilla: {
      name: "Ceylon Vanilla",
      image: "assets/images/vanilla-pods.jpg",
      intro: "Hand-pollinated and traditionally sun-cured, our Vanilla planifolia beans develop a deep, creamy and well-rounded aroma with a naturally high vanillin content.",
      forms: ["Gourmet Beans (Grade A)", "Extract Beans (Grade B)", "Vanilla Powder"],
      specs: [
        ["Botanical variety", "Vanilla planifolia"],
        ["Vanillin content", "1.8% – 2.5%"],
        ["Bean length", "14 – 18 cm"],
        ["Moisture (Grade A)", "30% – 35%"],
        ["Moisture (Grade B)", "15% – 25%"],
        ["Curing method", "Traditional sun-cured"]
      ],
      packaging: "Vacuum-sealed packs of 250 g, 500 g and 1 kg in food-grade cartons, with private-label and gift packaging available on request.",
      uses: "Bakery and confectionery, dairy and ice cream, beverages, and natural vanilla extract manufacturing."
    }
  };

  var overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.setAttribute("hidden", "");
  overlay.innerHTML =
    '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title">' +
      '<button type="button" class="modal-close" aria-label="Close details">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      '</button>' +
      '<div class="modal-media" id="pm-media"></div>' +
      '<div class="modal-body">' +
        '<span class="eyebrow">Product Details</span>' +
        '<h3 id="pm-title"></h3>' +
        '<p id="pm-intro"></p>' +
        '<h4>Available Forms</h4>' +
        '<div class="modal-tags" id="pm-forms"></div>' +
        '<h4>Typical Specifications</h4>' +
        '<ul class="spec-list" id="pm-specs"></ul>' +
        '<h4>Packaging</h4>' +
        '<p id="pm-packaging"></p>' +
        '<h4>Applications</h4>' +
        '<p id="pm-uses"></p>' +
        '<a href="contact.html" class="btn btn-green">Request a Quotation' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var closeBtn = overlay.querySelector(".modal-close");
  var lastFocused = null;
  var closeTimer = null;

  function render(key) {
    var data = products[key];
    if (!data) return false;
    overlay.querySelector("#pm-media").style.backgroundImage = 'url("' + data.image + '")';
    overlay.querySelector("#pm-title").textContent = data.name;
    overlay.querySelector("#pm-intro").textContent = data.intro;
    overlay.querySelector("#pm-packaging").textContent = data.packaging;
    overlay.querySelector("#pm-uses").textContent = data.uses;

    var forms = overlay.querySelector("#pm-forms");
    forms.textContent = "";
    data.forms.forEach(function (item) {
      var tag = document.createElement("span");
      tag.textContent = item;
      forms.appendChild(tag);
    });

    var specs = overlay.querySelector("#pm-specs");
    specs.textContent = "";
    data.specs.forEach(function (row) {
      var li = document.createElement("li");
      var label = document.createElement("span");
      label.textContent = row[0];
      var value = document.createElement("span");
      value.textContent = row[1];
      li.appendChild(label);
      li.appendChild(value);
      specs.appendChild(li);
    });
    return true;
  }

  function open(key, trigger) {
    if (!render(key)) return;
    if (closeTimer) { window.clearTimeout(closeTimer); closeTimer = null; }
    lastFocused = trigger || null;
    overlay.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    /* force reflow so the transition runs */
    void overlay.offsetWidth;
    overlay.classList.add("open");
    overlay.scrollTop = 0;
    closeBtn.focus();
  }

  function close() {
    if (overlay.hasAttribute("hidden")) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    closeTimer = window.setTimeout(function () {
      overlay.setAttribute("hidden", "");
      closeTimer = null;
    }, 200);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  triggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      open(btn.getAttribute("data-product-details"), btn);
    });
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Escape" || e.key === "Esc") && !overlay.hasAttribute("hidden")) {
      close();
    }
  });
}
