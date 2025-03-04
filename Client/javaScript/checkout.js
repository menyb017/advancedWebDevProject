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

    const productImg = document.createElement("img");
    const deleteToCardBtn = document.createElement("button");
    const AddToFavBtn = document.createElement("button");
    const selectSize = document.createElement("select");
    // __________option choosedefault
    const optionOfSelectSizeChoose = document.createElement("option");
    optionOfSelectSizeChoose.value = "Size";
    optionOfSelectSizeChoose.textContent = "Size";
    // __________option S
    const optionOfSelectSizeS = document.createElement("option");
    optionOfSelectSizeS.value = "S";
    optionOfSelectSizeS.textContent = "S";
    // __________option M
    const optionOfSelectSizeM = document.createElement("option");
    optionOfSelectSizeM.value = "M";
    optionOfSelectSizeM.textContent = "M";
    // __________option L
    const optionOfSelectSizeL = document.createElement("option");
    optionOfSelectSizeL.value = "L";
    optionOfSelectSizeL.textContent = "L";
    // __________option XL
    const optionOfSelectSizeXl = document.createElement("option");
    optionOfSelectSizeXl.value = "XL";
    optionOfSelectSizeXl.textContent = "XL";

    const selectNumItems = document.createElement("select");
    // __________option 1

    const optionOfSelectNumItems1 = document.createElement("option");
    optionOfSelectNumItems1.value = "1";
    optionOfSelectNumItems1.textContent = "1";
    // __________option 2
    const optionOfSelectNumItems2 = document.createElement("option");
    optionOfSelectNumItems2.value = "2";
    optionOfSelectNumItems2.textContent = "2";
    // __________option 3
    const optionOfSelectNumItems3 = document.createElement("option");
    optionOfSelectNumItems3.value = "3";
    optionOfSelectNumItems3.textContent = "3";
    // __________option 4
    const optionOfSelectNumItems4 = document.createElement("option");
    optionOfSelectNumItems4.value = "4";
    optionOfSelectNumItems4.textContent = "4";

    // //***********************************************************************************************************/
    // // updating chosen quantity into current item and updating the cart

    // selectNumItems.addEventListener("change", () => {
    //   const selectedQuantity = Number(selectNumItems.value);

    //   const cartItemIndex = cart.findIndex(
    //     (item) => item.name === product.productName
    //   );

    //   if (cartItemIndex != -1) {
    //     cart[cartItemIndex].itemQuantity = selectedQuantity;

    //     localStorage.setItem("cart", JSON.stringify(cart));
    //   }

    //   //ָָָָָָָָָָָָָָָָָ********************************************************************************************************

    //   displayTotalCartItems();
    // });

    // -----------------------------------------------------------------
    AddToFavBtn.addEventListener("click", function () {
      addOrDeleteTofavoritesItems(product);
      getNumofFav();
    });
    deleteToCardBtn.addEventListener("click", function () {
      addToCart(product);
      getNumItemsInCart();
    });
    selectNumItems.id = product.productId + "selectNumItems";
    selectSize.id = product.productId + "selectSize";
    deleteToCardBtn.textContent = "🗑️";
    AddToFavBtn.textContent = "♥️";
    AddToFavBtn.className = "favBtn";
    AddToFavBtn.id = product.productName + "Btn"; 
    productImg.src = product.itemImage;
    productImg.className = "product-img";

    const textContainer = document.createElement("div");
    textContainer.className = "text-container";

    textContainer.innerHTML = `
          <div>Name: ${product.productName}</div>
          <div>Price: ${product.productPrice}$</div>
      `;
    if (product.quantity < 10) {
      //?????
      textContainer.innerHTML = `
        <div>Name: ${product.productName}</div>
        <div>Price: ${product.productPrice}$</div>
        <div>Quantity: The last ones! </div>
      `;
    }
    textContainer.appendChild(AddToFavBtn);
    textContainer.appendChild(selectNumItems);

    selectNumItems.appendChild(optionOfSelectNumItems1);
    selectNumItems.appendChild(optionOfSelectNumItems2);
    selectNumItems.appendChild(optionOfSelectNumItems3);
    selectNumItems.appendChild(optionOfSelectNumItems4);

    container.appendChild(productImg);
    container.appendChild(textContainer);
    displayProd.appendChild(container);
    selectSize.appendChild(optionOfSelectSizeChoose); //default Option
    selectSize.appendChild(optionOfSelectSizeS); //add the option S to xl in the select
    selectSize.appendChild(optionOfSelectSizeM);
    selectSize.appendChild(optionOfSelectSizeL);
    selectSize.appendChild(optionOfSelectSizeXl);
    textContainer.appendChild(selectSize); //ajout de selectsize au container
    textContainer.appendChild(deleteToCardBtn);
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
    alert(product.name + " added to your cart !");
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
  var  sum = 0;
  items.forEach((item) => {
    let quantity = Number(document.getElementById(item.productId + "selectNumItems").value); //quantity of this items
    if (quantity === 1) {
      sum += Number(item.productPrice);
    } else {
      sum += item.productPrice * quantity;
    }
  });
  document.getElementById("sumOfItems").innerHTML = sum + "$";
  document.getElementById("totalFinalCommande").innerHTML = Number(sum + 5 )+ "$";
}

//--------------------------------------
function FunctFinalPurshass() {
  let items = JSON.parse(localStorage.getItem("cart")) || [];

  //**********************************************************************************************************************/
  let originalProducts = JSON.parse(localStorage.getItem("products")) || [];

  items.forEach((item) => {
    const productIndex = originalProducts.findByIndex(
      (product) => product.productName === item.productName
    );
    if (productIndex !== -1) {
      originalProducts[productIndex].itemQuantity -= item.itemQuantity;
    }
  });
  localStorage.setItem("products", JSON.stringify(originalProducts));

  // originalProducts.forEach((product) =>
  //   console.log(product.name, product.quantity)
  // );

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
  message += `Delivery Cost: 5$\n`;
  message += `Total: ${sum + 5}$\nWe hope to see you again soon!`;
  alert(message);
}


function FuncAddOrderToDb() {
  let length=document .localStorage("cart").length;
  let arrayItems=localStorage.getItem("cart");
  for(let i=0;i<length;i++){
      arrayItems[i].quantity+=document.getElementById(arrayItems[i].id + "selectNumItems").value;
      arrayItems[i].size+=document.getElementById(arrayItems[i].id + "selectSize").value;
  }

  let items = JSON.parse(localStorage.getItem("cart")) || [];
  const name = document.getElementById("nameInput").value;
  const cardNumber = document.getElementById("cardNumberInput").value;
  const cardExpiration = document.getElementById("expirationInput").value;
  const cardCVV = document.getElementById("cvvInput").value;
  fetch("http://localhost:8080/products/order", {
    method:"POST",
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({arrayItems:arrayItems, Name:name, CardNumber:cardNumber, CardExpiration:cardExpiration, CardCVV:cardCVV}),
  });
}
function clearCart() {
  //clear the localstorage to delete the elements from  this page after payment purshass
  localStorage.removeItem("cart");
}
//--------------------------
document.getElementById("paymentForm").addEventListener("submit", function () {
  //if the client click on final purshass call this 2 functionx
  FunctFinalPurshass();
  FuncAddOrderToDb();
  clearCart();
});
