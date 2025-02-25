let productsArray = [];

function displayProducts() {
  fetch("http://localhost:8080/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      productsArray = data;
      localStorage.setItem("products", JSON.stringify(productsArray));
      const displayProd = document.getElementById("productDisplay");
      displayProd.innerHTML = ""; // Clear the product display section

      productsArray.forEach((product) => {
        const container = document.createElement("div");
        container.className = "product-container";
        const productImg = document.createElement("img");
        const AddToCardBtn = document.createElement("button");
        const imgElement = document.createElement("img");
        const AddToFavBtn = document.createElement("button");
        AddToCardBtn.id = product.productName + "BtnPurshass";
        AddToCardBtn.textContent = "Add to cart";
        imgElement.src = "../../pictures/logo/bag_535280.png";
        imgElement.alt = "Add to cart";
        imgElement.style.width = "20px";

        // Create the heart icon dynamically
        const heartIcon = document.createElement("i");
        heartIcon.className = "fa-solid fa-heart";
        AddToFavBtn.appendChild(heartIcon);

        AddToFavBtn.className = "favBtn";
        AddToFavBtn.id = product.productName + "Btn";

        productImg.src = product.itemImage;
        productImg.className = "product-img";

        //---------------------------------------------------------------------if pressed the btn this even call the function
        AddToFavBtn.addEventListener("click", function () {
          addTofavoritesItems(product);
        });
        AddToCardBtn.addEventListener("click", function () {
          addToCart(product);
        });

        const textContainerUp = document.createElement("div");
        textContainerUp.className = "textContaineurUp";
        const textContainer = document.createElement("div");
        textContainer.className = "text-container";

        textContainer.innerHTML = `
    <div>Name: ${product.productName}</div>
    <div>id: ${product.productId}</div>
    <div>Category: ${product.productCategory}</div>
    <div>Price: ${product.productPrice}$</div>
    <div>:Quantity ${product.itemQuantity}</div>
    <div>Description: ${product.itemDescription}</div>
      `;
        if (product.itemQuantity < 10) {
          textContainer.innerHTML = `
          <div>Name: ${product.productName}</div>
          <div>Price: ${product.productPrice}$</div>
          <div> Quantity: The last ones! </div>
          `;
        }
        textContainerUp.appendChild(AddToFavBtn);
        container.appendChild(textContainerUp);
        AddToCardBtn.appendChild(imgElement);
        textContainer.appendChild(AddToCardBtn);
        container.appendChild(productImg);
        container.appendChild(textContainer);
        displayProd.appendChild(container);
      });

      updateFavButtonColors();
    })
    .catch((error) => console.error("Error:", error));
}

//--------------------------------------------------------
function addTofavoritesItems(product) {
  // do the both thing add and delete the items from favorites
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // check if the product is in the favorite

  const productExists = favoris.find(
    (item) => item.productName === product.productName
  );

  if (!productExists) {
    favoris.push(product);
    localStorage.setItem("favoris", JSON.stringify(favoris));

    alert(product.productName + " added to your favorites !");
    document.getElementById(product.productName + "Btn").style.color = "red";
  } else {
    favoris = favoris.filter(
      (item) => item.productName !== product.productName
    ); // Remove item from favorites
    localStorage.setItem("favoris", JSON.stringify(favoris)); // Update local storage
    alert(product.productName + " removed from your favorites!");
    document.getElementById(product.productName + "Btn").style.color = "black";
  }
  getNumofFav();
}
// ----------------------------------------------------
function updateFavButtonColors() {
  // check if the items is in the favorites and keep the color if yes // זה אותן דבר כמן ADD
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    const productExists = favoris.find(
      (item) => item.productName === product.productName
    );
    const favBtn = document.getElementById(product.productName + "Btn");

    if (productExists) {
      favBtn.style.color = "red"; // the product is in the favorite
    } else {
      favBtn.style.color = "black"; // the product isn't in the favorite
    }
  });
}
// ---------------------------------------------------------------------------------------------
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
//--------------------------
function displayCurrentUsername() {
  //display the name of the user in the navbar
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser === null) {
    document.getElementById("userName").style.display = "none";
  } else {
    document.getElementById("userName").innerText = `${currentUser}`;
  }
}

//--------------------------------

//  yoni sort box

function getCategoryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category");
}
function sortProducts() {
  let AllProducts = [...productsArray];
  const sortBy = document.getElementById("sort-by").value;

  if (sortBy === "random") {
    // מיון רנדומלי
    AllProducts.sort(() => Math.random() - 0.5);
  } else if (sortBy === "low-to-high") {
    AllProducts.sort((a, b) => a.productPrice - b.productPrice);
  } else if (sortBy === "high-to-low") {
    AllProducts.sort((a, b) => b.productPrice - a.productPrice);
  }

  // הצגת המוצרים הממוינים
  displayProducts(productsArray);
}

function filterByCategory(category) {
  let products = [...productsArray];
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
  // הצגת המוצרים המפולטרים
  displayProducts(filteredProducts);
}

// מאזין
document.getElementById("sort-by").addEventListener("change", sortProducts);
// // מאזין ללחיצה על האפשרות "Random" כדי למיין רנדומלית בכל לחיצה
// document.getElementById("sort-by").addEventListener("click", () => {
//   const sortBy = document.getElementById("sort-by").value;
//   if (sortBy === "random") {
//       sortProducts();
//   }
// });

document.getElementById("filter-all-btn").addEventListener("click", () => {
  // קודם כל, משחזרים את כל המוצרים למשתנה AllProducts
  let products = [...productsArray];

  // מבצעים מיון רנדומלי של כל המוצרים
  products.sort(() => Math.random() - 0.5);

  // מציגים את כל המוצרים לאחר המיון הרנדומלי
  displayProducts(products);

  // עדכון צבע הכפתורים של המוצרים המועדפים
  updateFavButtonColors();
});

// כפתורים לפלטור
document.getElementById("filter-all-btn").addEventListener("click", () => {
  displayProducts(products);
  updateFavButtonColors();
});
document.getElementById("filter-shirts-btn").addEventListener("click", () => {
  filterByCategory("shirt");
  updateFavButtonColors();
});
document.getElementById("filter-pants-btn").addEventListener("click", () => {
  filterByCategory("pants");
  updateFavButtonColors();
});
document.getElementById("filter-suits-btn").addEventListener("click", () => {
  filterByCategory("suits");
  updateFavButtonColors();
});
document
  .getElementById("filter-accessories-btn")
  .addEventListener("click", () => {
    filterByCategory("accesories");
    updateFavButtonColors();
  });
document.getElementById("sort-by").addEventListener("change", sortProducts);

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

document.addEventListener("DOMContentLoaded", function () {
  let products = [...productsArray];

  // טיפול בקטגוריה מה-URL
  const category = getCategoryFromURL();
  if (category) {
    filterByCategory(category);
  } else {
    displayProducts(products);
  }
});

// קביעת "Random" כברירת מחדל

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sort-by").value = "random";
  sortProducts(); // מיון והצגת המוצרים בצורה רנדומלית כברירת מחדל
});

//

//-------------------------------------------
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const productExists = cart.find(
    (item) => item.productName === product.productName
  );

  if (!productExists) {
    // Add product to cart
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.productName + " added to your shopping bag!");
  } else {
    // Remove product from cart
    cart = cart.filter((item) => item.productName !== product.productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.productName + " removed from your shopping bag!");
  }

  getNumItemsInCart();
}
//--------------------------------------
function getNumItemsInCart() {
  //display the number of items in cart in the navbar

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart) {
    const len = cart.length;
    if (len === 0) {
      document.getElementById("NumItemsInCart").style.display = "";
    } else {
      document.getElementById("NumItemsInCart").innerHTML = "(" + len + ")";
    }
  }
}
//--------------------------------------
function getNumofFav() {
  //display the number of favorites in the navbar
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
  if (favoris) {
    const len = favoris.length;
    if (len === 0) {
      document.getElementById("favNum").style.display = "";
    } else {
      document.getElementById("favNum").innerHTML = "(" + len + ")";
    }
  }
}
// ---save products array to be used in checkout functionality

//localStorage.setItem("products", JSON.stringify(products));
