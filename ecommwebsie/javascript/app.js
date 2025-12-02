// ---------- CART SYSTEM ----------
const cartKey = "myEcomCart";

// Initialize cart if not exists
if (!localStorage.getItem(cartKey)) {
  localStorage.setItem(cartKey, JSON.stringify([]));
}

// Update cart count UI
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem(cartKey));
  let counter = document.getElementById("cart-count");

  if (!counter) {
    // Create counter badge if not present
    const cartIcon = document.querySelector(".fa-cart-arrow-down");
    if (cartIcon) {
      counter = document.createElement("span");
      counter.id = "cart-count";
      counter.className = "cart-badge";
      cartIcon.parentElement.appendChild(counter);
    }
  }

  if (counter) counter.textContent = cart.length;
}

// Add to cart function
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.querySelector(".text")?.textContent || "Item";
    const price = card.querySelector(".price")?.textContent || "$0";

    const cart = JSON.parse(localStorage.getItem(cartKey));
    cart.push({ name, price });
    localStorage.setItem(cartKey, JSON.stringify(cart));

    updateCartCount();
    card.style.transform = "scale(0.95)";
    setTimeout(() => (card.style.transform = "scale(1)"), 150);
  });
});

updateCartCount();

// ---------- SEARCH SYSTEM ----------
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-icon");

function performSearch() {
  const query = searchInput.value.trim();
  if (query) {
    alert("Searching for: " + query); // demo action
  }
}

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") performSearch();
});

// ---------- MOBILE MENU TOGGLE ----------
const menuBtn = document.querySelector(".panel-all");
const sidebar = document.querySelector(".sidebar");

if (menuBtn && sidebar) {
  menuBtn.style.cursor = "pointer";
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
  });
}

// ---------- SIDEBAR ACTIVE ----------
document.querySelectorAll(".sidebar li").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".sidebar li.active")?.classList.remove("active");
    item.classList.add("active");
  });
});

// ---------- INQUIRY FORM ----------
const inquiryBtn = document.querySelector(".form-box button");
if (inquiryBtn) {
  inquiryBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll(
      ".form-box input, .form-box textarea, .form-box select"
    );
    const data = {};
    inputs.forEach((inp, i) => (data["field_" + i] = inp.value));

    alert("Inquiry Sent ✅");
    inputs.forEach((inp) => (inp.value = ""));
  });
}

// ---------- NEWSLETTER VALIDATION ----------
const newsEmail = document.querySelector(".newsletter-input input");
const newsBtn = document.querySelector(".newsletter-input button");

newsBtn.addEventListener("click", () => {
  const email = newsEmail.value.trim();
  if (!email.includes("@") || email.length < 5) {
    alert("Enter valid email ❌");
    newsEmail.style.border = "2px solid red";
    setTimeout(() => (newsEmail.style.border = "1px solid #bbb"), 500);
  } else {
    alert("Subscribed VIP ✅");
    newsEmail.value = "";
  }
});
