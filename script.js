let chocolateCart = [];

const addButtons = document.querySelectorAll(".product-card button");
const cartIcon = document.querySelector(".cart-icon");
const cartPanel = document.querySelector(".cart-panel");
const cartOverlay = document.querySelector(".cart-overlay");
const closeCart = document.querySelector(".close-cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total strong");
const checkoutButton = document.querySelector(".checkout-btn");

addButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        const card = button.closest(".product-card");

        const name = card.querySelector("h3").innerText;
        const priceText = card.querySelector("strong").innerText;
        const price = parseInt(priceText.replace("₹", ""));

        const existingItem = cart.find(function(item) {
            return item.name === name;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();
        openCart();
    });
});

function refreshCart() {

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(function(item) {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    cartIcon.setAttribute("data-count", totalItems);

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🍫</h3>
                <p>Add some delicious chocolates!</p>
            </div>
        `;
    } else {

        cart.forEach(function(item, index) {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>

                    <div class="cart-quantity">
                        <button onclick="decreaseQuantity(${index})">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>

                <button class="remove-item" onclick="removeItem(${index})">
                    Remove
                </button>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    cartTotal.innerText = "₹" + totalPrice;

    if (totalItems > 0) {
        cartIcon.setAttribute("data-count", totalItems);
    } else {
        cartIcon.removeAttribute("data-count");
    }
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
}

function closeCartPanel() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}

cartIcon.addEventListener("click", function() {
    openCart();
});

closeCart.addEventListener("click", function() {
    closeCartPanel();
});

cartOverlay.addEventListener("click", function() {
    closeCartPanel();
});

checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Checkout feature coming soon! 🛒");

});

const moodButtons = document.querySelectorAll(".unique-option button");
const findButton = document.querySelector(".unique-content > button");

let selectedMood = "";

moodButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        moodButtons.forEach(function(btn) {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedMood = button.innerText;
    });

});

findButton.addEventListener("click", function() {

    if (selectedMood === "") {
        alert("Please select your chocolate mood first!");
        return;
    }

    if (selectedMood === "Sweet") {
        alert("We recommend Caramel Bliss 🍫");
    }

    else if (selectedMood === "Dark") {
        alert("We recommend Classic Dark 🍫");
    }

    else if (selectedMood === "Crunchy") {
        alert("We recommend Hazelnut Crunch 🍫");
    }

    else if (selectedMood === "Fruity") {
        alert("We recommend Strawberry Dream 🍓");
    }

});

const subscribeForm = document.querySelector(".newsletter form");

subscribeForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.querySelector(".newsletter input").value.trim();

    if (email === "") {
        alert("Please enter your email!");
        return;
    }

    alert("Thank you for subscribing to Chocora! 🍫");

    document.querySelector(".newsletter input").value = "";

});

const searchIcon = document.querySelector(".search-icon");

searchIcon.addEventListener("click", function() {

    const search = prompt("What chocolate are you looking for?");

    if (search !== null && search.trim() !== "") {
        alert("Searching for: " + search);
    }

});

const exploreButton = document.querySelector(".left-content button");

exploreButton.addEventListener("click", function() {

    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });

});

const storyButton = document.querySelector(".about-content button");

storyButton.addEventListener("click", function() {

    alert("Welcome to the Chocora story! 🍫");

});

const buildButton = document.querySelector(".box-heading button");

buildButton.addEventListener("click", function() {

    alert("Chocolate Box Builder coming soon! 🎁");

});

updateCart();