

const products = [
  {
    id: 1,
    name: "مبل راحتی آریا",
    category: "sofa",
    categoryName: "مبلمان",
    price: 48500000,
    image: "images/sofa-aria.jpg",
    description: "مبل راحتی با طراحی معاصر، فرم نرم و نشیمن عمیق برای لحظات آرامش شما.",
    colors: [
      { name: "کرم", value: "#d8c8ac" },
      { name: "طوسی", value: "#92928d" },
      { name: "قهوه‌ای", value: "#795b46" }
    ]
  },
  {
    id: 2,
    name: "صندلی نوردیک",
    category: "chair",
    categoryName: "صندلی",
    price: 12800000,
    image: "images/chair-nordic.jpg",
    description: "صندلی مینیمال با خطوط ساده و طراحی الهام‌گرفته از سبک اسکاندیناوی.",
    colors: [
      { name: "چوب طبیعی", value: "#bd966c" },
      { name: "مشکی", value: "#292929" },
      { name: "سفید", value: "#eee9dd" }
    ]
  },
  {
    id: 3,
    name: "میز جلو مبلی وود",
    category: "table",
    categoryName: "میز",
    price: 16900000,
    image: "images/table-wood.jpg",
    description: "میز جلو مبلی با الهام از طبیعت و بافت گرم چوب.",
    colors: [
      { name: "گردویی", value: "#704a32" },
      { name: "بلوطی", value: "#b58c60" },
      { name: "مشکی", value: "#292929" }
    ]
  },
  {
    id: 4,
    name: "مبل مینیمال لونا",
    category: "sofa",
    categoryName: "مبلمان",
    price: 52900000,
    image: "images/sofa-luna.jpg",
    description: "طراحی مینیمال با تناسبات ظریف و راحتی مثال‌زدنی.",
    colors: [
      { name: "شیری", value: "#e8ddc9" },
      { name: "زیتونی", value: "#77755c" },
      { name: "ذغالی", value: "#3c3c3a" }
    ]
  },
  {
    id: 5,
    name: "آباژور آرت",
    category: "decor",
    categoryName: "دکوراسیون",
    price: 7900000,
    image: "images/lamp-art.jpg",
    description: "عنصری دکوراتیو برای ایجاد نور گرم و فضایی دلنشین.",
    colors: [
      { name: "طلایی", value: "#b99a5d" },
      { name: "مشکی", value: "#252525" },
      { name: "سفید", value: "#e9e4d9" }
    ]
  },
  {
    id: 6,
    name: "صندلی راحتی رِی",
    category: "chair",
    categoryName: "صندلی",
    price: 18500000,
    image: "images/chair-ray.jpg",
    description: "صندلی راحتی با طراحی شاخص برای گوشه دنج خانه شما.",
    colors: [
      { name: "کرم", value: "#d8c7aa" },
      { name: "قهوه‌ای", value: "#74543e" },
      { name: "سبز", value: "#6e755e" }
    ]
  }
];


let cart = [];
let favorites = [];
let activeProduct = null;
let selectedColor = null;

const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const modalBackdrop = document.getElementById("modalBackdrop");

const formatPrice = (price) =>
  new Intl.NumberFormat("fa-IR").format(price) + " تومان";

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

function renderProducts(category = "all") {
  const filtered = category === "all"
    ? products
    : products.filter(product => product.category === category);

  productGrid.innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-tag">LAVENZA</span>
        <button class="product-heart ${favorites.includes(product.id) ? "active" : ""}"
          onclick="toggleFavorite(${product.id})" aria-label="افزودن به علاقه‌مندی‌ها">
          ${favorites.includes(product.id) ? "♥" : "♡"}
        </button>
        <button class="quick-view" onclick="openProduct(${product.id})">
          مشاهده جزئیات محصول
        </button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.categoryName}</span>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="product-add" onclick="openProduct(${product.id})">
            انتخاب محصول +
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
    showToast("از علاقه‌مندی‌ها حذف شد");
  } else {
    favorites.push(id);
    showToast("به علاقه‌مندی‌ها اضافه شد");
  }

  document.getElementById("favoriteCount").textContent =
    new Intl.NumberFormat("fa-IR").format(favorites.length);

  renderProducts(
    document.querySelector(".filter.active")?.dataset.filter || "all"
  );
}

function openProduct(id) {
  activeProduct = products.find(product => product.id === id);
  selectedColor = activeProduct.colors[0];

  document.getElementById("modalImage").src = activeProduct.image;
  document.getElementById("modalImage").alt = activeProduct.name;
  document.getElementById("modalTitle").textContent = activeProduct.name;
  document.getElementById("modalDescription").textContent = activeProduct.description;
  document.getElementById("modalPrice").textContent =
    formatPrice(activeProduct.price);

  const colorOptions = document.getElementById("colorOptions");

  colorOptions.innerHTML = activeProduct.colors.map((color, index) => `
    <button
      class="color-swatch ${index === 0 ? "selected" : ""}"
      style="background:${color.value}"
      title="${color.name}"
      aria-label="${color.name}"
      onclick="selectColor(${index})">
    </button>
  `).join("");

  document.getElementById("selectedColor").textContent =
    "رنگ انتخابی: " + selectedColor.name;

  modalBackdrop.classList.add("show");
}

function selectColor(index) {
  selectedColor = activeProduct.colors[index];

  document.querySelectorAll(".color-swatch").forEach((button, i) => {
    button.classList.toggle("selected", i === index);
  });

  document.getElementById("selectedColor").textContent =
    "رنگ انتخابی: " + selectedColor.name;
}

function addToCart(id, color) {
  const product = products.find(item => item.id === id);
  const colorName = color.name;

  const existing = cart.find(item =>
    item.id === id && item.color === colorName
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id,
      color: colorName,
      quantity: 1
    });
  }

  updateCart();
  showToast("محصول به سبد خرید اضافه شد");
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.getElementById("cartCount").textContent =
    new Intl.NumberFormat("fa-IR").format(totalItems);

  const cartItems = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        سبد خرید شما هنوز خالی است.
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);

      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}">
          <div class="cart-item-info">
            <h4>${product.name}</h4>
            <p>رنگ: ${item.color}</p>
            <p>${formatPrice(product.price)}</p>
            <div class="quantity-actions">
              <button onclick="changeQuantity(${item.id}, '${item.color}', 1)">+</button>
              <span>${new Intl.NumberFormat("fa-IR").format(item.quantity)}</span>
              <button onclick="changeQuantity(${item.id}, '${item.color}', -1)">−</button>
              <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.color}')">حذف</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  document.getElementById("cartTotal").textContent = formatPrice(total);
}

function changeQuantity(id, color, amount) {
  const item = cart.find(item => item.id === id && item.color === color);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(cartItem =>
      !(cartItem.id === id && cartItem.color === color)
    );
  }

  updateCart();
}

function removeFromCart(id, color) {
  cart = cart.filter(item =>
    !(item.id === id && item.color === color)
  );

  updateCart();
}

function openCart() {
  cartDrawer.classList.add("open");
  drawerBackdrop.classList.add("show");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("show");
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll(".collection-card").forEach(card => {
  card.addEventListener("click", () => {
    const filter = card.dataset.filter;

    document.querySelectorAll(".filter").forEach(button => {
      button.classList.toggle("active", button.dataset.filter === filter);
    });

    renderProducts(filter);
  });
});

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
drawerBackdrop.addEventListener("click", closeCart);

document.getElementById("closeModal").addEventListener("click", () => {
  modalBackdrop.classList.remove("show");
});

modalBackdrop.addEventListener("click", event => {
  if (event.target === modalBackdrop) {
    modalBackdrop.classList.remove("show");
  }
});

document.getElementById("modalAddCart").addEventListener("click", () => {
  if (!activeProduct || !selectedColor) return;

  addToCart(activeProduct.id, selectedColor);
  modalBackdrop.classList.remove("show");
});

document.getElementById("favoriteBtn").addEventListener("click", () => {
  if (favorites.length === 0) {
    showToast("هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید");
    return;
  }

  const favoriteNames = favorites.map(id =>
    products.find(product => product.id === id).name
  );

  showToast("علاقه‌مندی‌ها: " + favoriteNames.join("، "));
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("سبد خرید شما خالی است");
    return;
  }

  showToast("این یک سفارش نمایشی است؛ پرداخت واقعی فعال نیست.");
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("newsletterMessage").textContent =
    "عضویت آزمایشی شما ثبت شد.";
  event.target.reset();
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".nav").classList.remove("open");
  });
});

renderProducts();
updateCart();
