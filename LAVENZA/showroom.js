
// ========================================
// LAVENZA - VIRTUAL SHOWROOM
// ========================================

const showroomProducts = {
    "sofa-aria": {
        name: "مبل راحتی آریا",
        price: 48500000,
        image: "images/sofa-aria.jpg",
        description: "طراحی لوکس و راحت، مناسب برای فضاهای نشیمن مدرن و گرم."
    },

    "table-wood": {
        name: "میز جلو مبلی وود",
        price: 16900000,
        image: "images/table-wood.jpg",
        description: "میز جلو مبلی با طراحی مینیمال و حس طبیعی چوب."
    },

    "chair-nordic": {
        name: "صندلی نوردیک",
        price: 12800000,
        image: "images/chair-nordic.jpg",
        description: "صندلی مدرن با الهام از طراحی اسکاندیناوی و خطوط ساده."
    }
};


// ========================================
// ELEMENTS
// ========================================

const showroomScene = document.getElementById("showroomScene");
const sceneFurniture = document.getElementById("sceneFurniture");

const productPopup = document.getElementById("productPopup");
const popupClose = document.getElementById("popupClose");

const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupDescription = document.getElementById("popupDescription");
const popupPrice = document.getElementById("popupPrice");

const popupAddToCart = document.getElementById("popupAddToCart");
const showroomToast = document.getElementById("showroomToast");

const viewButtons = document.querySelectorAll(".view-btn");
const productHotspots = document.querySelectorAll(".product-hotspot");

let currentProductId = null;
let toastTimer = null;


// ========================================
// PRICE FORMAT
// ========================================

function formatPrice(price) {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}


// ========================================
// OPEN PRODUCT POPUP
// ========================================

function openProduct(productId) {

    const product = showroomProducts[productId];

    if (!product) return;

    currentProductId = productId;

    popupImage.src = product.image;
    popupImage.alt = product.name;

    popupName.textContent = product.name;
    popupDescription.textContent = product.description;
    popupPrice.textContent = formatPrice(product.price);

    productPopup.classList.add("active");

    document.body.style.overflow = "hidden";
}


// ========================================
// CLOSE PRODUCT POPUP
// ========================================

function closeProduct() {

    productPopup.classList.remove("active");

    document.body.style.overflow = "";

    currentProductId = null;
}

popupClose.addEventListener("click", closeProduct);


// Close by clicking outside popup

productPopup.addEventListener("click", function(event) {

    if (event.target === productPopup) {
        closeProduct();
    }

});


// Close with Escape

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeProduct();
    }

});


// ========================================
// PRODUCT HOTSPOTS
// ========================================

productHotspots.forEach(function(hotspot) {

    hotspot.addEventListener("click", function() {

        const productId = hotspot.dataset.product;

        openProduct(productId);

    });


    hotspot.addEventListener("keydown", function(event) {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();

            const productId = hotspot.dataset.product;

            openProduct(productId);

        }

    });

});


// ========================================
// SHOWROOM VIEW CONTROLS
// ========================================

viewButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const view = button.id;

        showroomScene.classList.remove(
            "view-left",
            "view-right"
        );

        viewButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        if (view === "viewLeft") {

            showroomScene.classList.add("view-left");

        }

        if (view === "viewRight") {

            showroomScene.classList.add("view-right");

        }

    });

});


// ========================================
// TOAST MESSAGE
// ========================================

function showToast(message) {

    showroomToast.textContent = message;

    showroomToast.classList.add("active");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function() {

        showroomToast.classList.remove("active");

    }, 2800);

}


// ========================================
// SAVE SELECTED PRODUCT
// ========================================

popupAddToCart.addEventListener("click", function() {

    if (!currentProductId) return;

    const product = showroomProducts[currentProductId];

    if (!product) return;

    let selectedProducts = [];

    try {

        selectedProducts = JSON.parse(
            localStorage.getItem("lavenzaShowroomSelections") || "[]"
        );

        if (!Array.isArray(selectedProducts)) {
            selectedProducts = [];
        }

    } catch (error) {

        selectedProducts = [];

    }


    const existingProduct = selectedProducts.find(function(item) {
        return item.id === currentProductId;
    });


    if (!existingProduct) {

        selectedProducts.push({
            id: currentProductId,
            name: product.name,
            price: product.price,
            image: product.image
        });

    }


    localStorage.setItem(
        "lavenzaShowroomSelections",
        JSON.stringify(selectedProducts)
    );


    closeProduct();

    showToast("محصول به لیست انتخاب‌های شما اضافه شد");

});


// ========================================
// EXPLORE PRODUCTS
// ========================================

const exploreProducts = document.getElementById("exploreProducts");

exploreProducts.addEventListener("click", function() {

    window.location.href = "index.html#products";

});


// ========================================
// IMAGE ERROR HANDLING
// ========================================

popupImage.addEventListener("error", function() {

    popupImage.alt = "تصویر محصول در دسترس نیست";

});



// ========================================
// INITIALIZATION
// ========================================

window.addEventListener("load", function () {

    const loader = document.getElementById("showroomLoader");

    if (loader) {
        loader.classList.add("hidden");
    }

    console.log("LAVENZA Virtual Showroom is ready.");

});

