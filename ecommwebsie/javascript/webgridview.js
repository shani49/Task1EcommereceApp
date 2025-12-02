// ---------- SEARCH BAR ----------
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-icon");

function runSearch() {
  const query = searchInput.value.trim();
  if (query) {
    alert("🔍 Searching for: " + query);
  } else {
    alert("Please type something to search ❌");
  }
}

searchBtn.addEventListener("click", runSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") runSearch();
});

// ---------- CART SYSTEM ----------
const cartKey = "ShaniCart";

// Initialize Cart
if (!localStorage.getItem(cartKey)) {
  localStorage.setItem(cartKey, JSON.stringify([]));
}

// Update Cart Badge
function updateCartUI() {
  const cart = JSON.parse(localStorage.getItem(cartKey));
  let badge = document.getElementById("cart-count");

  if (!badge) {
    badge = document.createElement("span");
    badge.id = "cart-count";
    badge.className = "cart-badge";
    const cartArea = document.querySelector(".topright .fa-cart-arrow-down");
    if (cartArea) cartArea.parentElement.appendChild(badge);
  }

  badge.textContent = cart.length;
}

// Add to cart on product click
document.querySelectorAll(".item").forEach((product) => {
  product.style.cursor = "pointer";
  product.addEventListener("click", () => {
    const name = product.querySelector("p")?.textContent || "Product";
    const price = product.querySelector("h4")?.textContent || "$0";

    const cart = JSON.parse(localStorage.getItem(cartKey));
    cart.push({ name, price });
    localStorage.setItem(cartKey, JSON.stringify(cart));

    product.style.transform = "scale(0.94)";
    setTimeout(() => (product.style.transform = "scale(1)"), 120);

    updateCartUI();
  });
});

updateCartUI();

// CSS for badge auto insert
const styleTag = document.createElement("style");
styleTag.innerHTML = `
.cart-badge {
  background: #ff0000;
  color: #ffffff;
  font-size: 13px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 6px;
  position: relative;
  top: -10px;
}
`;
document.head.appendChild(styleTag);

// ---------- SIDEBAR ACTIVE ----------
document.querySelectorAll(".sidebar ul li").forEach((li) => {
  li.addEventListener("click", () => {
    document.querySelector(".sidebar li.active")?.classList.remove("active");
    li.classList.add("active");
  });
});

// ---------- PRICE FILTER (demo logic) ----------
const priceBoxes = document.querySelector(".price-inputs");
if (priceBoxes) {
  const [minInput, maxInput] = document.querySelectorAll(".price-inputs input");

  function filterPrice() {
    console.log("💰 Filter Range:", minInput.value, "-", maxInput.value);
  }

  minInput.addEventListener("input", filterPrice);
  maxInput.addEventListener("input", filterPrice);
}

// ---------- SAVE FOR LATER HEART DEMO ----------
document.querySelectorAll(".item").forEach((product) => {
  product.addEventListener("dblclick", () => {
    const already = product.getAttribute("data-liked");
    if (already) {
      product.removeAttribute("data-liked");
      alert("Removed from Saved ❌");
    } else {
      product.setAttribute("data-liked", "true");
      alert("Saved ❤");
    }
  });
});
