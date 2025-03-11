let orderItemsPrice = 0;
let orderTotalPrice = 0;

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}
document.addEventListener("click", (event) => {
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.querySelector(".menu-icon");
  if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
    sidebar.classList.remove("active");
  }
});
//---------------------------------
function displayCurrentUsername() {
  //display the name of the user in the navbar
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser === null) {
    document.getElementById("userName").style.display = "none";
  } else {
    document.getElementById("userName").innerText = `${currentUser}`;
  }
}

// -----------------------------------------------------------
function getNumofFav() {
  //display the number of favorites in the navbar
  let favoris = localStorage.getItem("favoris");
  if (favoris) {
    favoris = JSON.parse(favoris);
  } else {
    favoris = [];
  }
  const len = favoris.length;
  if (len === 0) {
    document.getElementById("favNum").style.display = "";
  } else {
    document.getElementById("favNum").innerHTML = "(" + len + ")";
  }
}
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("newsletter-modal");
  var btn = document.getElementById("newsletter-button");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    newFunction();
    modal.style.display = "block";

    function newFunction() {
      event.preventDefault();
    }
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  var form = document.getElementById("newsletter-form");
  form.onsubmit = function (event) {
    event.preventDefault();
    alert("Thanks for signing up for the newsletter!");
    modal.style.display = "none";
  };
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const displayProducts = (productsToDisplay = cart) => {
  const displayProd = document.getElementById("productDisplay");
  displayProd.innerHTML = "";
  if (cart.length === 0) {
    document.getElementById("textShoWIfNotCartItems").style.display = "block";
    document.getElementById("textShowifItemsInCArt").style.display = "none";
  } else {
    document.getElementById("textShoWIfNotCartItems").style.display = "none";
    document.getElementById("textShowifItemsInCArt").style.display = "grid";
  }

  productsToDisplay.forEach((product) => {
    const container = document.createElement("div");
    container.className = "product-container";

    // Product Image
    const productImg = document.createElement("img");
    productImg.src = product.productImage;
    productImg.className = "product-img";

    // Buttons
    const deleteToCartBtn = document.createElement("button");
    deleteToCartBtn.textContent = "🗑️";

    const AddToFavBtn = document.createElement("button");
    AddToFavBtn.textContent = "♥️";
    AddToFavBtn.className = "favBtn";
    AddToFavBtn.id = product.productName + "Btn";

    // Size Selection
    const selectSize = document.createElement("select");
    selectSize.id = product.productId + "selectSize";

    const sizes = ["Size", "S", "M", "L", "XL"];
    sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      selectSize.appendChild(option);
    });

    // Quantity Selection
    const selectNumItems = document.createElement("select");
    selectNumItems.id = product.productId + "selectNumItems";

    for (let i = 1; i <= 4; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      selectNumItems.appendChild(option);
    }

    if (!product.selectedQuantity) {
      product.selectedQuantity = 1;
    }
    if (!product.selectedSize) {
      product.selectedSize = "Size";
    }

    // Ensure the correct values are selected in the dropdowns
    selectSize.value = product.selectedSize;
    selectNumItems.value = product.selectedQuantity;


    // Event listener to update cart when selecting size
    selectSize.addEventListener("change", () => {
      const selectedSize = selectSize.value;
      const cartItemIndex = cart.findIndex(
        (item) => item.productName === product.productName
      );

      if (cartItemIndex !== -1) {
        cart[cartItemIndex].selectedSize = selectedSize;

        // Ensure consistency in
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });

    selectNumItems.addEventListener("change", () => {
      const selectedQuantity = Number(selectNumItems.value);
      const cartItemIndex = cart.findIndex(
        (item) => item.productName === product.productName
      );

      if (cartItemIndex !== -1) {
        cart[cartItemIndex].selectedQuantity = selectedQuantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    });

    // Modify the addToCart function to include size and quantity
    deleteToCartBtn.addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const filteredCart = cart.filter(
        (item) => item.productName !== product.productName
      );

      localStorage.setItem("cart", JSON.stringify(filteredCart));

      displayProducts(filteredCart);

      getNumItemsInCart();
    });

    // Add to favorites
    AddToFavBtn.addEventListener("click", function () {
      addOrDeleteTofavoritesItems(product);
      getNumofFav();
    });

    // Text Container
    const textContainer = document.createElement("div");
    textContainer.className = "text-container";
    textContainer.innerHTML = `
    <div>Name: ${product.productName}</div>
    <div>Price: ${product.productPrice}$</div>
    <div>${product.quantity < 10 ? "Quantity: The last ones!" : ""}</div>
  `;

    // Append elements
    textContainer.appendChild(AddToFavBtn);
    textContainer.appendChild(selectNumItems);
    textContainer.appendChild(selectSize);
    textContainer.appendChild(deleteToCartBtn);

    container.appendChild(productImg);
    container.appendChild(textContainer);
    displayProd.appendChild(container);
  });
};
//------------------------------------
function addToCart(product) {
  //add to the item to the cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // check if the product is in the cart
  const productExist = cart.find(
    (item) => item.productName === product.productName
  );

  if (!productExist) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.productName + " added to your cart !");
  } else {
    if (confirm("Do you want to delete this item from your cart ?")) {
      // למה לא משתמש בערך הבוליאני שחוזר???
      // User choose OK
      cart = cart.filter((item) => item.productName !== product.productName); // DElete this element from favoris
      localStorage.setItem("cart", JSON.stringify(cart)); //updat the localStorage
      location.reload();
      getNumofFav();
    } else {
      // User choose dont-> do nothing!
    }
  }
}
//------------------------------------
function addOrDeleteTofavoritesItems(product) {
  // do the both thing add and delete the items from favorites
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
  // check if the product is in the favorite
  const productExist = favoris.find(
    (item) => item.productName === product.productName
  );

  if (!productExist) {
    favoris.push(product);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    alert(product.productName + " added to your favorites !");
    document.getElementById(product.productName + "Btn").style.color = "red";
  } else {
    if (confirm("Do you want to delete this item from your favorite ?")) {
      // User choose OK
      favoris = favoris.filter(
        (item) => item.productName !== product.productName
      ); // DElete this element from favoris
      localStorage.setItem("favoris", JSON.stringify(favoris)); //updat the localStorage
      document.getElementById(product.productName + "Btn").style.color =
        "black";
      location.reload();
      getNumofFav();
    } else {
      // User choose dont-> do nothing!
    }
  }
}
//--------------------------------------
function getNumItemsInCart() {
  //display the number of items in cart in the navbar

  let cart = localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = [];
  }
  const len = cart.length;
  if (len === 0) {
    document.getElementById("NumItemsInCart").style.display = "";
  } else {
    document.getElementById("NumItemsInCart").innerHTML = "(" + len + ")";
  }
}

//--------------------------------------
document.addEventListener("change", function () {
  sumPriceItems(); //if have a change on the page call this funbction
});
//-----------------------------------
function sumPriceItems() {
  let items = JSON.parse(localStorage.getItem("cart")) || [];
  var sum = 0;
  items.forEach((item) => {
    let quantity = Number(
      document.getElementById(item.productId + "selectNumItems").value
    ); //quantity of this items
    if (quantity === 1) {
      sum += Number(item.productPrice);
    } else {
      sum += item.productPrice * quantity;
    }
  });
  document.getElementById("sumOfItems").innerHTML = sum + "$";
  document.getElementById("totalFinalCommande").innerHTML =
    Number(sum + 5) + "$";

  orderItemsPrice = sum;

  orderTotalPrice = sum + 5;
}

//--------------------------------------
function FunctFinalPurshass() {
  let items = JSON.parse(localStorage.getItem("cart")) || [];

  //**********************************************************************************************************************/
  let originalProducts = JSON.parse(localStorage.getItem("products")) || [];

  items.forEach((item) => {
    const productIndex = originalProducts.findIndex(
      (product) => product.productName === item.productName
    );
    if (productIndex !== -1) {
      originalProducts[productIndex].itemQuantity -= item.itemQuantity;
    }
  });
  localStorage.setItem("products", JSON.stringify(originalProducts));

  //**********************************************************************************************************************/
  let message =
    "Thank You for Your Purchase!\nThank you for shopping with us at Brooks Brothers!\nHere are the details of your order:\n";
  let sum = 0;
  items.forEach((item, index) => {
    let quantity = Number(
      document.getElementById(item.productId + "selectNumItems").value
    );
    message += `${quantity} ${item.productName} ${
      item.productPrice * quantity
    }$\n`;
    sum += item.productPrice * quantity;
  });

  //const deliveryFee = Math.floor(Math.random() * 50 - 5 + 1) + 5;
  message += `Delivery Cost: 5$\n`;
  message += `Total: ${sum + 5}$\nWe hope to see you again soon!`;
  alert(message);
}

function AddOrderToDb() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const user = localStorage.getItem("currentUser");

  if (!user || cart.length === 0) {
    alert("Please log in and add items to the cart before placing an order.");
    return;
  }

  const shippingCity = document.getElementById("cityInput").value;
  const shippingState = document.getElementById("stateInput").value;
  const shippingAddress = document.getElementById("addressInput").value;
  const shippingZipCode = document.getElementById("zipInput").value;
  const email = document.getElementById("email").value;

  const newOrder = {
    user: user,
    orderItems: cart,
    shippingState: shippingState,
    shippingCity: shippingCity,
    shippingAddress: shippingAddress,
    shippingZipCode: shippingZipCode,
    email: email,
    itemsPrice: orderItemsPrice,
    totalPrice: orderTotalPrice,
  };

  console.log("order", newOrder);

  fetch("http://localhost:8080/orders/addOrder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newOrder),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Order added:", data.message);
    })
    .catch((err) => console.log("Error adding order:", err.message));
}

function clearCart() {
  //clear the localstorage to delete the elements from  this page after payment purshass
  localStorage.removeItem("cart");
}
//--------------------------
document
  .getElementById("paymentForm")
  .addEventListener("submit", function (event) {
    // Prevent form submission if an invalid size is found
    if (cart.some((item) => item.selectedSize === "Size")) {
      alert("Please select a size for all items in your cart.");
      event.preventDefault(); // Stop form submission
      return;
    }

    // Prevent form submission if an invalid quantity is found
    else {
      FunctFinalPurshass();
      AddOrderToDb();
      alert("Thank you for your purchase!");
      clearCart();
    }
    // Proceed with final purchase
  });

// Prevent form submission if any validation fails

// If everything is valid, proceed with the final purchase and actions
