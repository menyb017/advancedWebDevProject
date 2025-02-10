document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("firstName").focus();
});

const users = JSON.parse(localStorage.getItem("users")) || [];

const createUser = () => {
  // Fetch values inside the function to get the latest input values
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const password = document.getElementById("newPassword").value;
  const confirmedPassword = document.getElementById("confirmedPassword").value;

  if (!firstName || !lastName || !password || !confirmedPassword) {
    alert("fields must be filled!");
    return;
  }

  // Check if passwords match
  if (password !== confirmedPassword) {
    alert("Passwords do not match!");
    return;
  }

  const user = { username: `${firstName} ${lastName}`, password: password };

  // Check if the user already exists
  const userExists = users.some(
    (existingUser) => existingUser.username === user.username
  );

  if (!userExists) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User has been created successfully!");
    window.location.href = "logIn.html";
  } else {
    alert("User already exists!");
    return;
  }
};
//-----------------------------------
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
// ----------------------------------------
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
