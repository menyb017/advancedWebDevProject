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
// Appelez la fonction DisplayProdsInSelect pour remplir le select au chargement de la page
document.addEventListener('DOMContentLoaded', DisplayProdsInSelect);

//function to display items from th db to the select option
async function DisplayProdsInSelect() {
    const response = await fetch('http://localhost:8080/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const products = await response.json();
    productsArray=products;
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
    productsList.addEventListener('change', DisplayProdsInLabel);
}
//-------------------------function to display the selected item in the label-------------------------
async function DisplayProdsInLabel(){
    const productId = document.getElementById('productsList').value;
    const product = productsArray.find(product => product.productId == productId);
 if (product) {
    document.getElementById('itemCategoryUpdate').value = product.productCategory;
    document.getElementById('itemIdUpdate').value = product.productId;
    document.getElementById('itemNameUpdate').value =product.productName;
    document.getElementById('itemDescriptionUpdate').value =product.productDescription;
    document.getElementById('itemPriceUpdate').value =product.productPrice;
    document.getElementById('itemQuantityUpdate').value =product.productQuantity;
    document.getElementById('itemImageUpdate').value =product.productImage;

} else {
    console.error('Product not found');
}
}

//send the value of the selected product to the server to delete it
document.getElementById('deleteFromDb').addEventListener('click', async function(event) {
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
        DisplayProdsInSelect(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to delete product: ' + error.message);
    }
}   );  

//send the value of the selected product to the server to update it
document.getElementById('updateItem').addEventListener('click', async function(event) {
    const itemCategory = document.getElementById('itemCategoryUpdate').value;
    const itemId = document.getElementById('itemIdUpdate').value;
    const itemName = document.getElementById('itemNameUpdate').value;
    const itemDescription = document.getElementById('itemDescriptionUpdate').value;
    const itemPrice = document.getElementById('itemPriceUpdate').value;
    const itemQuantity = document.getElementById('itemQuantityUpdate').value;
    const itemImage = document.getElementById('itemImageUpdate').value;
    const productId = document.getElementById('productsList').value;
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080/products/update/${productId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productCategory:itemCategory,
                productId:itemId,
                productName: itemName,
                productDescription: itemDescription,
                productPrice: itemPrice,
                productQuantity: itemQuantity,
                productImage: itemImage }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert('Product updated successfully');
        DisplayProdsInSelect(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to update product: ' + error.message);
    }
}   );


//--------------------------
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    console.log('Token found:', token); // Log pour vérifier que le token est trouvé
    if (token) {
        fetch('http://localhost:8080/users/verifyToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        })
            .then(response => {
                console.log('Response status:', response.status); // Log pour vérifier le statut de la réponse
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('success', data.message);
                if (data.message === 'user') {
                    console.log('Token verified!');
                    window.location.href = '../html/index.html';
                } else if (data.message === 'superAdmin') {
                    console.log('Token verified!');
                    // Permettre le chargement de la page
                } else if (data.message === 'Invalid token') {
                    console.log('Token verification failed!');
                    alert('Invalid token: you cannot access this page');
                    window.location.href = '../html/login.html';
                }
            })
            .catch(error => {
                console.error('Error:', error); // Log pour vérifier l'erreur exacte
                alert('An error occurred: you cannot access this page');
                window.location.href = '../html/login.html';
            });
    } else {
        console.log('No token found'); // Log pour vérifier que le token n'est pas trouvé
        window.location.href = '../html/login.html';
    }
});