let productsArray = [];
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      productsArray = data;
      const category = getCategoryFromURL();
      if (category) {
      let filteredProductsByCategory= filterByCategory(category, productsArray);
        displayProducts(filteredProductsByCategory);
        getNumofFav();
        updateFavButtonColors(filteredProductsByCategory);
        getNumItemsInCart();  
      } else {
        displayProducts(productsArray);
        getNumofFav();
        updateFavButtonColors(productsArray);
        getNumItemsInCart();  
      } 
    })
    .catch((error) => console.error("Error:", error));
  });
// -----------------------------------------------------
function displayProducts(array) {

        const displayProd = document.getElementById("productDisplay");
        displayProd.innerHTML = ""; // Clear the product display section

        array.forEach((product) => {
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
        if (product.itemQuantity < 10) {
          textContainer.innerHTML = `
          <div>Name: ${product.productName}</div>
          <div>Category: ${product.productCategory}</div>
          <div>Price: ${product.productPrice}$</div>
          <div>You have to hurry up this is the last ones! </div>
          <div>Description: ${product.itemDescription}</div>
          `;
        }else if (product.itemQuantity >=10) {
          textContainer.innerHTML = `
          <div>Name: ${product.productName}</div>
          <div>Category: ${product.productCategory}</div>
          <div>Price: ${product.productPrice}$</div>
          <div>Description: ${product.itemDescription}</div>
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
function updateFavButtonColors(array) {
  // check if the items is in the favorites and keep the color if yes // זה אותן דבר כמן ADD
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
  let size=array.length;
  favoris.forEach((product) => {
    for(let i=0;i<size;i++){
      if(array[i].productName===product.productName){
        document.getElementById(product.productName + "Btn").style.color = "red";
      }
    }
  });
}
// ---------------------------------------------------------------------------------------------
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}


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

//-------------------------------------------
function getCategoryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category");
}
// -----------------------------------------------------
function filterByCategory(category,arrayOfProducts) {
  let filteredProducts = arrayOfProducts.filter(item => 
    item.productCategory.toLowerCase() === category.toLowerCase() 
  );
  return filteredProducts;
  };
// -----------------------------------------------------
function sortProducts(array) {
    let sortBy = document.getElementById("sort-by").value;
    var sortArray = [...array];
    switch(sortBy) {
        case "random":
          sortArray.sort(() => Math.random() - 0.5);
            break;
            
        case "low-to-high":
          sortArray.sort((a, b) => a.productPrice - b.productPrice);
            break;
            
        case "high-to-low":
          sortArray.sort((a, b) => b.productPrice - a.productPrice);
            break;
    }
    
    return sortArray;
}

// מאזין
document.getElementById("sort-by").addEventListener("change", ()=>{
  let category=getCategoryFromURL();
  if(category===null){
      displayProducts(sortProducts(productsArray));
  }else{
     let filterProducts=filterByCategory(category,productsArray);
    let sort=sortProducts(filterProducts);
    displayProducts(sort); 
  }

});

// כפתורים לפלטור

document.getElementById("filter-all-btn").addEventListener("click", () => {
  document.location.href = "store.html";
  getNumofFav();
  updateFavButtonColors();
  getNumItemsInCart();  

});
document.getElementById("filter-shirts-btn").addEventListener("click", () => {
  document.location.href = "store.html?category=Shirts";
  getNumofFav();
  updateFavButtonColors();
  getNumItemsInCart();  
});
document.getElementById("filter-pants-btn").addEventListener("click", () => {
  document.location.href = "store.html?category=Pants";
  getNumofFav();
  updateFavButtonColors();
  getNumItemsInCart();  
});
document.getElementById("filter-suits-btn").addEventListener("click", () => {
  document.location.href = "store.html?category=Suits";
  getNumofFav();
  updateFavButtonColors();
  getNumItemsInCart();  
});
document.getElementById("filter-accessories-btn").addEventListener("click", () => {
    document.location.href = "store.html?category=Accessories"; 
    getNumofFav();
    updateFavButtonColors();
    getNumItemsInCart();  
  });


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

// ---------------------------------------------------------------MODAL
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
document.addEventListener("click", (event) => {
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.querySelector(".menu-icon");
  if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
    sidebar.classList.remove("active");
  }
});