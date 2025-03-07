document.getElementById('addproductTodb').addEventListener('submit', async function(event) {
    event.preventDefault();
    var category = document.getElementById('itemCategory').value;
    var id= document.getElementById('itemId').value;
    var Name = document.getElementById('itemName').value;
    var Description = document.getElementById('itemDescription').value;
    var Price = document.getElementById('itemPrice').value;
    var Quantity = document.getElementById('itemQuantity').value;
    var Image = document.getElementById('itemImage').value;

    const response = await fetch('http://localhost:8080/products/addProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemCategory:category, itemId:id , itemName: Name, itemDescription:Description, itemPrice:Price, itemQuantity:Quantity, itemImage:Image }),
    })
    const data = await response.text();
    alert(data);

});

//todo add a function to delet a product to the database
//todo add a function to update a product to the database

async function displayUsers() {
    const response = await fetch('http://localhost:8080/users');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const users = await response.json();
    const userContainer = document.getElementById('usersContainer');
    const usersList = document.createElement('select');
    usersList.id = 'usersList';

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = user.username;
        usersList.appendChild(option);
    });

    userContainer.innerHTML = '';
    userContainer.appendChild(usersList);
}

// Appelez la fonction displayUsers pour remplir le select au chargement de la page
document.addEventListener('DOMContentLoaded', displayUsers);

async function displayProducts() {
    const response = await fetch('http://localhost:8080/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const products = await response.json();
    const productsContainer = document.getElementById('productsContainer');
    const productsList = document.createElement('select');
    productsList.id = 'productsList';

    products.forEach(product => {
        const option = document.createElement('option');
        option.value =(product.productId);
        option.textContent = ("name: "+product.productName) +" / id: "+product.productId;
        productsList.appendChild(option);
    });
    productsContainer.innerHTML = '';
    productsContainer.appendChild(productsList);
}

// Appelez la fonction displayProducts pour remplir le select au chargement de la page
document.addEventListener('DOMContentLoaded', displayProducts);

//send the value of the selected user to the server to delete it
document.getElementById('modifyTheUserDb').addEventListener('submit', async function(event) {
    const username = document.getElementById('usersList').value;
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080/users/${username}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert('User deleted successfully');
        displayUsers(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to delete user: ' + error.message);
    }
});

//send the value of the selected product to the server to delete it
document.getElementById('deleteProductFromdb').addEventListener('submit', async function(event) {
    const productId = document.getElementById('productsList').value;
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert('Product deleted successfully');
        displayProducts(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to delete product: ' + error.message);
    }
}   );  

document.addEventListener('DOMContentLoaded', function () {
if (localStorage.getItem("currentUser") == 'super Admin') {
    alert('welcome super Admin');
}else{
    window.location.href = "../../client/html/index.html";
}
});