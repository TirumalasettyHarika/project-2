 document.addEventListener("DOMContentLoaded", function () {
  let cart = [];

  const orderButtons = document.querySelectorAll(".menu-card button");

  console.log("Order buttons found:", orderButtons.length);

  /* =========================
       CREATE CART BUTTON
    ========================= */

  const cartButton = document.createElement("button");

  cartButton.className = "cart-button";
  cartButton.innerHTML = "🛒 Cart <span id='cart-count'>0</span>";

  document.body.appendChild(cartButton);

  /* =========================
       CREATE CART BOX
    ========================= */

  const cartBox = document.createElement("div");

  cartBox.className = "cart-box";

  cartBox.innerHTML = `
        <div class="cart-header">
            <h2>Your Cart 🛒</h2>
            <button id="close-cart">×</button>
        </div>

        <div id="cart-items"></div>

        <div class="cart-bottom">

            <h3>
                Total: ₹<span id="cart-total">0</span>
            </h3>

            <button id="clear-cart">
                Clear Cart
            </button>

            <button id="place-order">
                Place Order ☕
            </button>

        </div>
    `;

  document.body.appendChild(cartBox);

  /* =========================
       ORDER BUTTONS
    ========================= */

  orderButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const card = button.closest(".menu-card");

      const name = card.querySelector("h3").textContent;

      const priceText = card.querySelector("h4").textContent;

      const price = parseInt(priceText.replace("₹", ""));

      const existingItem = cart.find(function (item) {
        return item.name === name;
      });

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          name: name,
          price: price,
          quantity: 1,
        });
      }

      updateCart();

      cartBox.classList.add("active");
    });
  });

  /* =========================
       UPDATE CART
    ========================= */

  function updateCart() {
    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(function (item, index) {
      total += item.price * item.quantity;

      count += item.quantity;

      const itemDiv = document.createElement("div");

      itemDiv.className = "cart-item";

      itemDiv.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>
                </div>

                <div class="quantity-controls">

                    <button class="minus-btn">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button class="plus-btn">
                        +
                    </button>

                </div>
            `;

      itemDiv
        .querySelector(".minus-btn")
        .addEventListener("click", function () {
          item.quantity--;

          if (item.quantity <= 0) {
            cart.splice(index, 1);
          }

          updateCart();
        });

      itemDiv.querySelector(".plus-btn").addEventListener("click", function () {
        item.quantity++;

        updateCart();
      });

      cartItems.appendChild(itemDiv);
    });

    cartCount.textContent = count;

    cartTotal.textContent = total;
  }

  /* =========================
       OPEN CART
    ========================= */

  cartButton.addEventListener("click", function () {
    cartBox.classList.add("active");
  });

  /* =========================
       CLOSE CART
    ========================= */

  document.getElementById("close-cart").addEventListener("click", function () {
    cartBox.classList.remove("active");
  });

  /* =========================
       CLEAR CART
    ========================= */

  document.getElementById("clear-cart").addEventListener("click", function () {
    cart = [];

    updateCart();
  });

  /* =========================
       PLACE ORDER
    ========================= */

  document.getElementById("place-order").addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is empty ☕");

      return;
    }

    alert(
      "🎉 Order Confirmed!\n\n" +
        "Thank you for choosing " +
        "Brew & Bloom Café! ☕🤎",
    );

    cart = [];

    updateCart();

    cartBox.classList.remove("active");
  });

  console.log("☕ Brew & Bloom JavaScript loaded!");
});

