// ------ CART COUNT UPDATE ------
const countSpan = document.querySelector(".page-title .count");
function updateCartCount() {
  const items = document.querySelectorAll(".cart-row");
  countSpan.textContent = `(${items.length})`;
}
updateCartCount();

// ------ REMOVE SINGLE ITEM ------
document.querySelectorAll(".link-btn.remove").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const row = e.target.closest(".cart-row");
    row.style.opacity = "0";
    setTimeout(() => {
      row.remove();
      updateCartCount();
    }, 300);
  });
});

// ------ REMOVE ALL ------
document.querySelector(".remove-all").addEventListener("click", () => {
  document.querySelectorAll(".cart-row").forEach((row) => {
    row.style.opacity = "0";
    setTimeout(() => {
      row.remove();
      updateCartCount();
    }, 300);
  });
});

// ------ MOVE SAVED → CART (UI DEMO) ------
document.querySelectorAll(".move-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const savedItem = e.target.closest(".saved-item");
    const imgSrc = savedItem.querySelector("img").src;
    const price = savedItem.querySelector(".saved-price").textContent;
    const name = savedItem.querySelector(".saved-name").textContent;

    const newRow = document.createElement("div");
    newRow.className = "cart-row";
    newRow.innerHTML = `
      <img class="p-thumb" src="${imgSrc}" alt="product">
      <div class="p-info">
        <div class="p-title">${name}</div>
        <div class="p-meta">Added from saved section<br><span class="seller">Seller: Student Baithak Store</span></div>
        <div class="p-actions">
          <button class="link-btn remove">Remove</button>
          <button class="link-btn save">Save for later</button>
        </div>
      </div>
      <div class="p-right">
        <div class="qty-wrap">
          <label>Qty:</label>
          <select>
            <option selected>1</option>
            <option>2</option>
            <option>3</option>
            <option>5</option>
          </select>
        </div>
        <div class="p-price">${price}</div>
      </div>
    `;

    // add animation insert
    document.querySelector(".cart-card").appendChild(newRow);
    savedItem.remove();
    updateCartCount();

    // re-attach remove event to new item button
    newRow.querySelector(".link-btn.remove").addEventListener("click", () => {
      newRow.remove();
      updateCartCount();
    });
  });
});

// ------ COUPON APPLY (demo) ------
document.querySelector(".apply").addEventListener("click", () => {
  const coup = document.querySelector(".coupon-row input").value.trim();
  if (coup === "") {
    alert("Enter coupon ❌");
  } else {
    alert("Coupon applied: " + coup + " ✅");
  }
});

// ------ BACK TO SHOP ------
document.querySelector(".back-btn").addEventListener("click", () => {
  alert("Going back to shop 🛍️ (Add your page link here later)");
});
const s = document.createElement("style");
s.textContent = `.cart-row{ transition:0.3s ease opacity, 0.2s ease transform; }`;
document.head.appendChild(s);
