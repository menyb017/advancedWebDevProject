const products = [
  {
    id: 1,
    category: "suits",
    name: "Suit Blue",
    price: 250,
    img: "../pictures/suits/suit1.jpg",
    quantity: 36,
    like: "false",
  },
  {
    id: 2,
    category: "suits",
    name: "Suit Black",
    price: 200,
    img: "../pictures/suits/suit2.jpg",
    quantity: 22,
    like: "false",
  },
  {
    id: 3,
    category: "suits",
    name: "Suit Browen",
    price: 150,
    img: "../pictures/suits/suit3.jpg",
    quantity: 30,
    like: "false",
  },
  {
    id: 4,
    category: "suits",
    name: "Suit extra Browen",
    price: 400,
    img: "../pictures/suits/suit4.jpg",
    quantity: 20,
    like: "false",
  },
  {
    id: 5,
    category: "suits",
    name: "Suit Green",
    price: 222,
    img: "../pictures/suits/suit5.jpg",
    quantity: 19,
    like: "false",
  },
  {
    id: 6,
    category: "suits",
    name: "Suit Navi",
    price: 320,
    img: "../pictures/suits/suit6.jpg",
    quantity: 35,
    like: "false",
  },
  {
    id: 7,
    category: "suits",
    name: "Suit  Browen",
    price: 440,
    img: "../pictures/suits/suit7.jpg",
    quantity: 17,
    like: "false",
  },
  {
    id: 8,
    category: "suits",
    name: "Suit Black",
    price: 258,
    img: "../pictures/suits/suit8.jpg",
    quantity: 20,
    like: "false",
  },
  {
    id: 9,
    category: "suits",
    name: "Suit extra Gray",
    price: 250,
    img: "../pictures/suits/suit9.jpg",
    quantity: 25,
    like: "false",
  },
  {
    id: 10,
    category: "suits",
    name: "Suit Extra Black",
    price: 435,
    img: "../pictures/suits/suit10.jpg",
    quantity: 23,
    like: "false",
  },
  {
    id: 11,
    category: "shirt",
    name: "Shirt blue",
    price: 60,
    img: "../pictures/shirt/shirt1.jpg",
    quantity: 65,
    like: "false",
  },
  {
    id: 12,
    category: "shirt",
    name: "Shirt hite",
    price: 65,
    img: "../pictures/shirt/shirt2.jpg",
    quantity: 35,
    like: "false",
  },
  {
    id: 13,
    category: "shirt",
    name: "Shirt dark",
    price: 22,
    img: "../pictures/shirt/shirt3.jpg",
    quantity: 44,
    like: "false",
  },
  {
    id: 14,
    category: "shirt",
    name: "Shirt pink ",
    price: 47,
    img: "../pictures/shirt/shirt4.jpg",
    quantity: 23,
    like: "false",
  },
  {
    id: 15,
    category: "shirt",
    name: "Shirt Green",
    price: 95,
    img: "../pictures/shirt/shirt5.jpg",
    quantity: 25,
    like: "false",
  },
  {
    id: 16,
    category: "shirt",
    name: "Shirt Navi ",
    price: 89,
    img: "../pictures/shirt/shirt6.jpg",
    quantity: 45,
    like: "false",
  },
  {
    id: 17,
    category: "shirt",
    name: "Shirt Yelow",
    price: 99,
    img: "../pictures/shirt/shirt7.jpg",
    quantity: 33,
    like: "false",
  },
  {
    id: 18,
    category: "pants",
    name: "Pants Black",
    price: 29,
    img: "../pictures/pants/pans1.jpg",
    quantity: 28,
    like: "false",
  },
  {
    id: 19,
    category: "pants",
    name: "Pants Pink",
    price: 48,
    img: "../pictures/pants/pans2.jpg",
    quantity: 31,
    like: "false",
  },
  {
    id: 20,
    category: "pants",
    name: "Pants Brown",
    price: 99,
    img: "../pictures/pants/pans3.jpg",
    quantity: 47,
    like: "false",
  },
  {
    id: 21,
    category: "pants",
    name: "Pans Grey",
    price: 65,
    img: "../pictures/pants/pans4.jpg",
    quantity: 45,
    like: "false",
  },
  {
    id: 22,
    category: "pants",
    name: "Pants Dark",
    price: 38,
    img: "../pictures/pants/pans5.jpg",
    quantity: 38,
    like: "false",
  },
  {
    id: 23,
    category: "accesories",
    name: "Accesories Belt",
    price: 50,
    img: "../pictures/acessories/accessories1.jpg",
    quantity: 52,
    like: "false",
  },
  {
    id: 24,
    category: "accesories",
    name: "Accesories wollt",
    price: 54,
    img: "../pictures/acessories/accessories2.jpg",
    quantity: 34,
    like: "false",
  },
  {
    id: 25,
    category: "accesories",
    name: "Accesories Bag",
    price: 78,
    img: "../pictures/acessories/accessories3.jpg",
    quantity: 50,
    like: "false",
  },
  {
    id: 26,
    category: "accesories",
    name: "Accesories Black Belt",
    price: 45,
    img: "../pictures/acessories/accessories4.jpg",
    quantity: 100,
    like: "false",
  },
  {
    id: 27,
    category: "accesories",
    name: "Accesories Big Bag",
    price: 99,
    img: "../pictures/acessories/accessories5.jpg",
    quantity: 51,
    like: "false",
  },
  {
    id: 28,
    category: "accesories",
    name: "Accesories Small Bag",
    price: 51,
    img: "../pictures/acessories/accessories6.jpg",
    quantity: 65,
    like: "false",
  },
  {
    id: 29,
    category: "accesories",
    name: "Accesories Glovs",
    price: 78,
    img: "../pictures/acessories/accessories7.jpg",
    quantity: 1,
    like: "false",
  },
];
let updatedProducts = [...products]; // all

const displayProducts = (productsToDisplay = AllProducts) => {
  const displayProd = document.getElementById("productDisplay");
  displayProd.innerHTML = ""; // נוודא שהחלק המציג את המוצרים ריק לפני שמוסיפים מוצרים חדשים

  productsToDisplay.forEach((product) => {
    const container = document.createElement("div");
    container.className = "product-container";

    const productImg = document.createElement("img");
    const AddToCardBtn = document.createElement("button");
    const imgElement = document.createElement("img");
    const AddToFavBtn = document.createElement("button");

    //---------------------------------------------------------------------if pressed the btn this even call the function with  the product to parameter
    AddToFavBtn.addEventListener("click", function () {
      addTofavoritesItems(product);
    });
    AddToCardBtn.addEventListener("click", function () {
      addToCart(product);
      // getNumItemsInCart();//error one
    });

    AddToCardBtn.id = product.name + "BtnPurshass";
    AddToCardBtn.textContent = "Add to cart";
    imgElement.src = "../pictures/logo/bag_535280.png";
    imgElement.alt = "Add to cart";
    imgElement.style.width = "20px";
    AddToFavBtn.textContent = "♥️";
    AddToFavBtn.className = "favBtn";
    AddToFavBtn.id = product.name + "Btn"; //error
    productImg.src = product.img;
    productImg.className = "product-img";

    const textContainerUp = document.createElement("div");
    textContainerUp.className = "textContaineurUp";
    const textContainer = document.createElement("div");
    textContainer.className = "text-container";

    textContainer.innerHTML = `
          <div>Name: ${product.name}</div>
          <div>Price: ${product.price}$</div>
          <div>Quantity: ${product.quantity} left</div>
      `;
    if (product.quantity < 10) {
      textContainer.innerHTML = `
          <div>Name: ${product.name}</div>
          <div>Price: ${product.price}$</div>
          <div> Quantity: The last ones! </div>
          `;
    }
    textContainerUp.appendChild(AddToFavBtn);
    container.appendChild(textContainerUp);
    AddToCardBtn.appendChild(imgElement); // add the img to the btn
    textContainer.appendChild(AddToCardBtn);
    container.appendChild(productImg);
    container.appendChild(textContainer);
    displayProd.appendChild(container);
  });
};

//--------------------------------------------------------
function addTofavoritesItems(product) {
  // do the both thing add and delete the items from favorites
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  // check if the product is in the favorite
  const produitExistant = favoris.find((item) => item.name === product.name);

  if (!produitExistant) {
    favoris.push(product);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    alert(product.name + " added to your favorites !");
    document.getElementById(product.name + "Btn").style.color = "red";
  } else {
    favoris = favoris.filter((item) => item.name !== product.name); // Remove item from favorites
    localStorage.setItem("favoris", JSON.stringify(favoris)); // Update local storage
    alert(product.name + " removed from your favorites!");
    document.getElementById(product.name + "Btn").style.color = "black";
  }
  getNumofFav();
}
// ----------------------------------------------------
function updateFavButtonColors() {
  // check if the items is in the favorites and keep the color if yes // זה אותן דבר כמן ADD
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

  AllProducts.forEach((product) => {
    const produitExistant = favoris.find((item) => item.name === product.name);
    const favBtn = document.getElementById(product.name + "Btn");

    if (produitExistant) {
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
// --------------------------
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
  const sortBy = document.getElementById("sort-by").value;

  if (sortBy === "random") {
    // מיון רנדומלי
    AllProducts.sort(() => Math.random() - 0.5);
  } else if (sortBy === "low-to-high") {
    AllProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-to-low") {
    AllProducts.sort((a, b) => b.price - a.price);
  }

  // הצגת המוצרים הממוינים
  displayProducts(AllProducts);
}

AllProducts = [...products];

function filterByCategory(category) {
  AllProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
  // הצגת המוצרים המפולטרים
  displayProducts(AllProducts);
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
  AllProducts = [...products];

  // מבצעים מיון רנדומלי של כל המוצרים
  AllProducts.sort(() => Math.random() - 0.5);

  // מציגים את כל המוצרים לאחר המיון הרנדומלי
  displayProducts(AllProducts);

  // עדכון צבע הכפתורים של המוצרים המועדפים
  updateFavButtonColors();
});

// כפתורים לפלטור
document.getElementById("filter-all-btn").addEventListener("click", () => {
  displayProducts(AllProducts);
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
  // טיפול בקטגוריה מה-URL
  const category = getCategoryFromURL();
  if (category) {
    filterByCategory(category);
  } else {
    displayProducts(AllProducts);
  }
});

// קביעת "Random" כברירת מחדל
//document.addEventListener("DOMContentLoaded", () => {
//document.getElementById("sort-by").value = "random";
//sortProducts(); // מיון והצגת המוצרים בצורה רנדומלית כברירת מחדל
//});

//***** פלטור מהדף הראשי */

//-------------------------------------------
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if the product is in the favorite
  const produitExistant = cart.find((item) => item.name === product.name);

  if (!produitExistant) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(product.name + " added to your shopping bag !");
  } else {
    cart = favoris.filter((item) => item.name !== product.name); // Remove item from favorites
    localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
    alert(product.name + " removed from your shopping bag!");
  }
  getNumItemsInCart();
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
// ---save products array to be used in checkout functionality

localStorage.setItem("products", JSON.stringify(products));
