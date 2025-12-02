// ---------- SEARCH BAR ----------
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-icon");

function runSearch() {
  const q = searchInput.value.trim();
  if (q) alert("🔍 Searching for: " + q);
  else alert("Write something ❌");
}
searchBtn.addEventListener("click", runSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});

// ---------- CART SYSTEM ----------
const cartKey = "ShaniEcomCart";
if (!localStorage.getItem(cartKey)) {
  localStorage.setItem(cartKey, JSON.stringify([]));
}

function updateCartBadge() {
  let badge = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem(cartKey));
  if (!badge) {
    badge = document.createElement("span");
    badge.id = "cart-count";
    badge.className = "cart-badge";
    const cartIcon = document.querySelector(".fa-cart-arrow-down");
    if (cartIcon) cartIcon.parentElement.appendChild(badge);
  }
  badge.textContent = cart.length;
}

document.querySelectorAll(".product-card").forEach((card) => {
  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    const title = card.querySelector(".product-title").textContent;
    const price = card.querySelector(".current").textContent;
    const cart = JSON.parse(localStorage.getItem(cartKey));
    cart.push({ title, price });
    localStorage.setItem(cartKey, JSON.stringify(cart));

    card.style.transform = "scale(0.97)";
    setTimeout(() => (card.style.transform = "scale(1)"), 120);

    updateCartBadge();
  });
});

updateCartBadge();

// Auto insert CSS for badge
const st = document.createElement("style");
st.textContent = `
.cart-badge{
  background:#ff0000;
  color:#fff;
  font-size:13px;
  padding:2px 8px;
  border-radius:20px;
  margin-left:6px;
  position:relative;
  top:-10px;
}
`;
document.head.appendChild(st);

// ---------- FAVOURITE ----------
document.querySelectorAll(".fav").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (btn.textContent === "♡") {
      btn.textContent = "❤";
      btn.style.color = "red";
    } else {
      btn.textContent = "♡";
      btn.style.color = "#000";
    }
  });
});

// ---------- PRICE FILTER (demo) ----------
const priceBtn = document.querySelector(".btn-apply");
const priceInputs = document.querySelectorAll(".price-inp");

priceBtn.addEventListener("click", () => {
  const min = priceInputs[0].value || 0;
  const max = priceInputs[1].value || "∞";
  alert(`Price filter applied ✅ Range: ${min} - ${max}`);
});

// ---------- NEWSLETTER ----------
const newsEmail = document.querySelector(".newsletter input");
const newsBtn = document.querySelector(".btn-sub");

newsBtn.addEventListener("click", () => {
  const email = newsEmail.value.trim();
  if (!email.includes("@") || email.length < 5) {
    alert("Enter valid email ❌");
    newsEmail.style.border = "2px solid red";
    setTimeout(() => (newsEmail.style.border = "1px solid #e6eef6"), 600);
  } else {
    alert("Subscribed 🎉");
    newsEmail.value = "";
  }
});
