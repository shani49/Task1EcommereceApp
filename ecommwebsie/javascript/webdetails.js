// ---------- IMAGE GALLERY ----------
const mainImage = document.querySelector(".main-image");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const imgSrc = thumb.querySelector("img").src;
    mainImage.src = imgSrc;

    document.querySelector(".thumb.active")?.classList.remove("active");
    thumb.classList.add("active");
  });
});

// ---------- TABS SWITCHING ----------
const tabButtons = document.querySelectorAll(".tab");
const tabSections = document.querySelectorAll(".desc-card"); // future me different sections ho to replace karna easy ho

tabButtons.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active")?.classList.remove("active");
    tab.classList.add("active");

    // Demo ke liye content same rakha ha, agar alag sections ho to yahan logic update karna
    // For now just animation effect:
    const descCard = document.querySelector(".desc-card");
    descCard.style.opacity = "0";
    setTimeout(() => {
      descCard.style.opacity = "1";
      descCard.style.transition = "0.3s ease";
    }, 150);
  });
});

// ---------- SEARCH SYSTEM ----------
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");

function doSearch() {
  const q = searchInput.value.trim();
  if (q) alert("Searching for: " + q);
}

searchIcon.addEventListener("click", doSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") doSearch();
});

// ---------- CART SYSTEM + COUNTER BADGE ----------
const cartKey = "detailPageCart";

if (!localStorage.getItem(cartKey)) {
  localStorage.setItem(cartKey, JSON.stringify([]));
}

function updateCartBadge() {
  let badge = document.getElementById("cart-badge");
  const cart = JSON.parse(localStorage.getItem(cartKey));

  if (!badge) {
    const cartIcon = document.querySelector(".fa-cart-arrow-down");
    badge = document.createElement("span");
    badge.id = "cart-badge";
    badge.className = "cart-badge";
    cartIcon.parentElement.appendChild(badge);
  }

  badge.textContent = cart.length;
}

document.querySelector(".fa-cart-arrow-down").parentElement.style.cursor =
  "pointer";
document
  .querySelector(".fa-cart-arrow-down")
  .parentElement.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem(cartKey));
    cart.push({ item: "T-shirt", price: "$98.00" });
    localStorage.setItem(cartKey, JSON.stringify(cart));

    updateCartBadge();
    alert("Added to Cart ✅");
  });

updateCartBadge();

// ---------- INQUIRY BUTTONS ----------
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("primary")) {
      alert("Inquiry Sent to Seller 📩");
    } else {
      alert("Opening Seller Profile 👤");
    }
  });
});

// ---------- SAVE FOR LATER HEART ----------
const heartBox = document.querySelector(".save-later");
let liked = false;

heartBox.addEventListener("click", () => {
  liked = !liked;
  heartBox.innerHTML = liked
    ? `<span style="color:red;">❤</span> Saved`
    : `♡ Save for later`;
});

// ---------- You May Like CLICK ----------
document.querySelectorAll(".you-list li").forEach((item) => {
  item.addEventListener("click", () => {
    const name = item.querySelector(".yn").textContent;
    alert("You liked: " + name);
  });
});
