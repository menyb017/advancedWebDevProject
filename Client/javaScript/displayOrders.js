const orderContainer = document.getElementById("orderContainer");

const fetchOrders = () => {
  fetch("http://localhost:8080/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayOrders(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      orderContainer.innerHTML = "<h1>No orders available.</h1>";
    });
};

document.addEventListener("DOMContentLoaded", () => {
  fetchOrders();
});

async function displayOrders(orderItems) {
  // Clear container before displaying orders
  orderContainer.innerHTML = "";

  // ✅ If the API returns an empty array, show a message
  if (!orderItems.length) {
    orderContainer.innerHTML = "<h1>No orders available.</h1>";
    return;
  }

  orderItems.forEach((order) => {
    // Convert order items into a single HTML block
    const orderItemsHTML = order.orderItems
      .map((item) => {
        return `
        <div class="orderCard">
          <img src="${item.productImage}" alt="${item.productName}" class="product-image"/>
          <div class="order-data">
            <div class="order-item">Product ID: ${item.productId}</div>
            <div class="order-item">Name: ${item.productName}</div>
            <div class="order-item">Price: ${item.productPrice}$</div>
            <div class="order-item">Chosen Quantity: ${item.selectedQuantity}</div>
            <div class="order-item">Size: ${item.selectedSize}</div>
          </div>
        </div>`;
      })
      .join("");

    // Create a div for the order details
    const orderCard = document.createElement("div");
    orderCard.className = "order-card";

    orderCard.innerHTML = `
      <div class="order-header">
        <h3>Order ID: ${order._id}</h3>
        <h4>User: ${order.user}</h4>
        <h4>Shipping State: ${order.shippingState}</h4>
        <h4>Shipping City: ${order.shippingCity}</h4>
        <h4>Shipping Address: ${order.shippingAddress}</h4>
        <h4>Email Address: ${order.email}</h4>
        <h4>Zip Code: ${order.shippingZipCode}</h4>
        <h4>Items Price: ${order.itemsPrice}$</h4>
      </div>
      <div class="order-items">
        <h3>Order Items:</h3>
        ${orderItemsHTML}
      </div>`;

    orderContainer.appendChild(orderCard);
  });
}
