document.getElementById('addItemForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    var category = document.getElementById('itemCategory').value;
    var id= document.getElementById('itemId').value;
    var Name = document.getElementById('itemName').value;
    var Description = document.getElementById('itemDescription').value;
    var Price = document.getElementById('itemPrice').value;
    var Quantity = document.getElementById('itemQuantity').value;
    var Image = document.getElementById('itemImage').value;
    const response = await fetch('http://localhost:8080/add-item', {
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