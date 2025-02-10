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
// ------------------------------------


  let favoris = JSON.parse(localStorage.getItem('favoris')) || [];

  const displayProducts = (productsToDisplay = favoris) => {
  const displayProd = document.getElementById("productDisplay");
  displayProd.innerHTML = "";
  if(favoris.length===0){
    document.getElementById("textShoWIfNotLikedItems").style.display="block";
    document.getElementById("textShowifLikedItems").style.display="none";
  }else{
    document.getElementById("textShoWIfNotLikedItems").style.display="none";
    document.getElementById("textShowifLikedItems").style.display="block";
  }

  productsToDisplay.forEach(product => {
  const container = document.createElement("div");
  container.className = "product-container";

  const productImg = document.createElement("img");
  const incrementBtn = document.createElement("button");
  const decrementBtn = document.createElement("button");
  const AddToCardBtn = document.createElement("button");
  const AddToFavBtn = document.createElement("button");

  // -----------------------------------------------------------------
AddToFavBtn.addEventListener("click", function() {// if the client click add the items to favorites and change the number of items in the navbar
  addOrDeleteTofavoritesItems(product);
  getNumofFav();
});
AddToCardBtn.addEventListener("click",function() {// if the client click add the items to cart
  addToCart(product); 
});


  // const sizeItem=document.createElement("select,S?M?L?XL?")
  incrementBtn.textContent = "+";
  decrementBtn.textContent = "-";
  AddToCardBtn.textContent="Add to cart";
  AddToFavBtn.textContent="♥️";
  AddToFavBtn.style.color="red";
  AddToFavBtn.className="favBtn";
  AddToFavBtn.id=product.name+"Btn";
  productImg.src = product.img;
  productImg.className = "product-img";
  
  const textContainerUp=document.createElement("div");
  textContainerUp.className="textContaineurUp";


  const textContainer = document.createElement("div");
  textContainer.className = "text-container";

  textContainer.innerHTML = `
          <div>Category: ${product.category}</div>
          <div>Price: ${product.price}$</div>
          <div>Quantity: ${product.quantity} left</div>
      `;
   if(product.quantity<10){
      textContainer.innerHTML=`
        <div>Category: ${product.category}</div>
        <div>Price: ${product.price}$</div>
        <div> Quantity: The last ones! </div>
      `;
    }
  textContainerUp.appendChild(AddToFavBtn);
  container.appendChild(textContainerUp);
  textContainer.appendChild(AddToCardBtn);
  container.appendChild(productImg);
  container.appendChild(textContainer);
  displayProd.appendChild(container);
});
};

//------------------------------------
function addOrDeleteTofavoritesItems(product) {// do the both thing add and delete the items from favorites
  let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
  // check if the product is in the favorite
  const productExist = favoris.find((item) => item.name === product.name);

  if (!productExist) {
    favoris.push(product);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    alert(product.name + " added to your favorites !");
    document.getElementById(product.name + "Btn").style.color = "red";
  } else {if (confirm("Do you want to delete this item from your favorite ?")) {
    // User choose OK
    favoris = favoris.filter((item) => item.name !== product.name); // DElete this element from favoris
    localStorage.setItem("favoris", JSON.stringify(favoris)); //updat the localStorage 
    document.getElementById(product.name + "Btn").style.color = "black";
    location.reload();
    getNumofFav();  
} else {
    // User choose dont-> do nothing!
}
  }
}
//------------------------------------
function displayCurrentUsername() {//display the name of the user in the navbar
  const currentUser = localStorage.getItem("currentUser");
  if(currentUser===null){
    document.getElementById("userName").style.display="none";
  }else{
     document.getElementById("userName").innerText = `${currentUser}`;
  }
}
// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById("newsletter-modal");
  var btn = document.getElementById("newsletter-button");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function() {
     newFunction();
      modal.style.display = "block";

    function newFunction() {
      event.preventDefault();
    }
  }

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  var form = document.getElementById("newsletter-form");
  form.onsubmit = function(event) {
      event.preventDefault();
      alert("Thanks for signing up for the newsletter!");
      modal.style.display = "none";
  }
});
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
 // -----------------------------------------------------------
 function getNumofFav() {//display the number of favorites in the navbar
  let favoris = localStorage.getItem('favoris');
  if (favoris) {
      favoris = JSON.parse(favoris);
  } else {
      favoris = []; 
  }
  const len = favoris.length;
  if(len===0){
    document.getElementById('favNum').style.display="";
  }else{
    document.getElementById('favNum').innerHTML = "("+len+")";
  }

}
// ---------------------------------------------------------------
function getNumItemsInCart(){ //display the number of items in cart in the navbar

  let cart = localStorage.getItem('cart');
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = []; 
  }
  const len = cart.length;
  if(len===0){
    document.getElementById('NumItemsInCart').style.display="";
  }else{
    document.getElementById('NumItemsInCart').innerHTML =  "("+len+")";
  }
}
//--------------------------------------