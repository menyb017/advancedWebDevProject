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
//--------------------------------
function displayCurrentUsername() {//display the name of the user in the navbar
  const currentUser = localStorage.getItem("currentUser");
  if(currentUser===null){
    document.getElementById("userName").style.display="none";
  }else{
     document.getElementById("userName").innerText = `${currentUser}`;
  }
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
//--------------------------------------
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