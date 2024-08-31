const items = document.getElementsByClassName('dessert-item');
const addCartLinks = document.getElementsByClassName('add-cart');
const cartContainer = document.getElementById('cart-container');
const emptyCartImg = cartContainer.querySelector(".empty-cart-img");
const subtext = cartContainer.querySelector(".empty-cart-subtext");
const heading = cartContainer.querySelector(".cart-heading");
const mainContainer = document.querySelector(".container")
let frag = new DocumentFragment();

let cart = [];

let productsList = [
    {
        product: "waffle",
        name: "Waffle with Berries",
        price: 6.50,
        quantity: 0,
        src: "waffle"
    },
    {
        product: "creme-brulee",
        name: "Vanilla Bean Crème Brûlée",
        price: 7.00,
        quantity: 0,
        src: "creme-brulee"
    },
    {
        product: "macaron",
        name: "Macaron Mix of Five",
        price: 8.00,
        quantity: 0,
        src: "macaron"
    },
    {
        product: "tiramisu",
        name: "Classic Tiramisu",
        price: 5.50,
        quantity: 0,
        src: "tiramisu"
    },
    {
        product: "baklava",
        name: "Pistachio Baklava",
        price: 4.00,
        quantity: 0,
        src: "baklava"
    },
    {
        product: "lemon-meringue",
        name: "Lemon Meringue Pie",
        price: 5.00,
        quantity: 0,
        src: "meringue"
    },
    {
        product: "red-velvet",
        name: "Red Velvet Cake",
        price: 4.50,
        quantity: 0,
        src: "cake"
    },
    {
        product: "brownie",
        name: "Salted Caramel Brownie",
        price: 5.50,
        quantity: 0,
        src: "brownie"
    },
    {
        product: "panna-cotta",
        name: "Vanilla Panna Cotta",
        price: 6.50,
        quantity: 0,
        src: "panna-cotta"
    },
]

function doGrandTotal() {
    // Compute the total and always round to two decimal places
    let total = 0;
    cart.forEach(element => {
        total += element.price * element.quantity;        
    });

    total = (Math.round(total * 100) / 100).toFixed(2);
    
    // Make the total order container visible and add padding to cart container to prevent overlap
    let totalOrderContainer = document.getElementsByClassName("totalorder-confirm-container")[0];
    totalOrderContainer.style.display = "inline-block";
    cartContainer.style.paddingBottom = "12rem";

    // Change the value of the order total heading to reflect the total value
    let orderAmt = document.getElementsByClassName("order-total-amt");
    orderAmt[0].innerText = `$${total}`;

    // Change the cart heading to reflect the # of items in cart
    let cartHeading = document.getElementsByClassName("cart-heading")[0];
    let numItems = cart.reduce((total, obj) => obj.quantity + total,0)
    cartHeading.innerText = `Your Cart (${numItems})`

    // If # of items in cart is zero, return the placeholder image and text
    if (cart.length === 0) {
        emptyCartImg.style.display = "inline-block";
        subtext.style.display = "inline-block";
        totalOrderContainer.style.display = "none";
        cartContainer.style.paddingBottom = "1.4rem";
    }
}

function removeItem(item) {
    const itemDiv = document.querySelectorAll(`[data-item~=${item}]`)[0];
    const active = itemDiv.querySelectorAll(".active-state")[0];
    let itemImg = itemDiv.querySelectorAll(".dessert-img")[1];
    itemImg.style.border = "";

    // Remove the active class div from the item
    active.parentNode.removeChild(active);

    // Remove the item from the cart array
    cart = cart.filter(function(el) { return el.product != item; }); 

    // Remove the item from the cart div
    let cartItem = document.getElementById(item);
    let hr = cartItem.nextElementSibling;
    
    hr.parentNode.removeChild(hr);
    cartItem.parentNode.removeChild(cartItem);
    
    doGrandTotal();
}

function updateAddedItem(item) {
    let cartIdx = cart.find(x => x.product === item);

    // Change the value of the span to reflect the change
    let itemDiv = document.querySelectorAll(`[data-item~=${item}]`)[0];
    let span = itemDiv.querySelector(".active-state span");
    span.innerText = cartIdx.quantity;

    // Change the value of the item in the cart
    let cartItem = document.getElementById(item);
    cartItem.querySelector(".cart-quantity").innerText = `${cartIdx.quantity}x`;
    
    let itemTotal = (Math.round((cartIdx.quantity * cartIdx.price) * 100) / 100).toFixed(2);
    cartItem.querySelector(".cart-item-total").innerText = `$${itemTotal}`;
}

function constructAddedItem(item){
    // Update the cart heading and remove the placeholder image and subtext    
    heading.innerText = `Your Cart (${cart.length})`
    emptyCartImg.style.display = "none";
    subtext.style.display = "none";
    
    // Get the object from the productsList array to find the name and price
    let prod = productsList.find(o => o.product === item);

    // Get the object from the cart array to find the quantity
    let cartItem = cart.find(i => i.product === item);
    
    // Construct the item and append to fragment, then append fragment to cart container
    const addedItemDiv = document.createElement('div');
    addedItemDiv.setAttribute("class", "added-item");

    // Set ID of item in cart to reference later to update values
    addedItemDiv.setAttribute("id", item);

    const itemPriceContainer = document.createElement('div');
    itemPriceContainer.setAttribute("class", "cart-item-price-container");
    
    const itemHeading = document.createElement('h4');
    itemHeading.setAttribute("class", "cart-item-heading");
    itemHeading.innerText = prod.name;
    itemPriceContainer.appendChild(itemHeading);

    const cartQuantity = document.createElement('span');
    cartQuantity.setAttribute("class", "cart-quantity");
    cartQuantity.innerHTML = cartItem.quantity + "x";
    itemPriceContainer.appendChild(cartQuantity);

    const cartItemAmt = document.createElement('span');
    cartItemAmt.setAttribute("class", "cart-item-amount");
    cartItemAmt.innerHTML = `@ $${(Math.round((prod.price) * 100) / 100).toFixed(2)}`
    itemPriceContainer.appendChild(cartItemAmt);

    const cartItemTotal = document.createElement('span');
    cartItemTotal.setAttribute("class", "cart-item-total");
    cartItemTotal.innerHTML = `$${(Math.round((cartItem.quantity * prod.price) * 100) / 100).toFixed(2)}`;
    itemPriceContainer.appendChild(cartItemTotal);

    const removeItemBtn = document.createElement('button');
    removeItemBtn.innerHTML = "x"
    removeItemBtn.setAttribute("class", "cart-remove-item");

    const hr = document.createElement("hr");
    hr.setAttribute("class", "cart-item-divider");

    addedItemDiv.appendChild(itemPriceContainer);
    addedItemDiv.appendChild(removeItemBtn);

    removeItemBtn.addEventListener('click', () => {
        let cartIdx = cart.find(x => x.product === item);
        cartIdx.quantity = 0;
        removeItem(item);
    });

    frag.append(addedItemDiv);
    frag.append(hr);

    cartContainer.appendChild(frag);
}

function applyActiveState(item){
    // Obtain the item container and append the active state div before the end
    let itemDiv = document.querySelectorAll(`[data-item~=${item}]`)[0];
    let html = `<div class="active-state">
          <button class="adjust-quantity decrement">-</button>
          <span class="quantity">1</span>
          <button class="adjust-quantity increment">+</button>
        </div>`

    itemDiv.insertAdjacentHTML('beforeend', html);

    // Apply selected state to item img
    let itemImg = itemDiv.querySelectorAll(".dessert-img")[1];    
    itemImg.style.border = "2px solid hsl(14, 86%, 42%)";
    
    // Event listeners for increment/decrement buttons
    let activeStateItem = itemDiv.querySelectorAll(".active-state")[0];
    const incrementBtn = activeStateItem.querySelectorAll("button")[1];
    const decrementBtn = activeStateItem.querySelectorAll("button")[0];

    incrementBtn.addEventListener("click", () => increment(item));
    decrementBtn.addEventListener("click", () => decrement(item));
}

function increment(item){    
    let cartIdx = cart.find(x => x.product === item);
    cartIdx.quantity++;

    updateAddedItem(item);
    doGrandTotal();
}

function decrement(item){
    let cartIdx = cart.find(x => x.product === item);
    cartIdx.quantity--;

    if (cartIdx.quantity === 0) {
        removeItem(item);
    } else {
        updateAddedItem(item);
        doGrandTotal();
    }
    
}

function addToCart(item) {
    for (let i of productsList) {
        if (i.product === item && !cart.includes(i)) {            
            // Product gets added to the cart array
            cart.push(i);

            // Find the cart item and increase quantity in cart when added to cart
            let cartItem = cart.find(o => o.product === i.product);
            cartItem.quantity++;

            // Construct the item in the cart container
            constructAddedItem(item);

            // Apply active state to the item and increment/decrement buttons
            applyActiveState(item);

            // Calculate and show the grand total
            doGrandTotal();
        }
    }
}

function orderConfirm() {
  document.getElementById("overlay").style.display = "block";
  document.getElementsByClassName("order-confirm-container")[0].style.display = "flex";
    
  let total = 0;
    
  cart.forEach(item => {
    total += item.price * item.quantity;
    });

  const itemsList = document.getElementsByClassName("order-confirm-items-list")[0];
  
  // Construct the items in the confirm modal by looping through the cart and appending to the fragment, then append frag to items list container
  cart.forEach((item) => {
    let orderConfirmItem = document.createElement("div");
    orderConfirmItem.setAttribute("class", "order-confirm-item");

    let img = document.createElement("img");
    img.setAttribute("src", `assets/images/image-${item.src}-thumbnail.jpg`);
    img.setAttribute("alt", item.product);
    img.setAttribute("class", "order-confirm-thumbnail");

    let orderConfirmTitleSubtitle = document.createElement("div");
    orderConfirmTitleSubtitle.setAttribute("class", "order-confirm-title-subtitle");
    
    let itemTitleSpan = document.createElement("span");
    itemTitleSpan.setAttribute("class", "order-confirm-item-title");
    itemTitleSpan.innerText = item.name;

    let orderConfirmQuantityPrice = document.createElement("div");
    orderConfirmQuantityPrice.setAttribute("class", "order-confirm-quantity-price");

    let cartQuantity = document.createElement("span");
    cartQuantity.setAttribute("class", "cart-quantity");
    cartQuantity.innerText = `${item.quantity}x`;

    let cartItemAmount = document.createElement("span");
    cartItemAmount.setAttribute("class", "cart-item-amount");
    cartItemAmount.innerText = `$${(Math.round((item.price) * 100) / 100).toFixed(2)}`;

    let orderConfirmItemTotal = document.createElement("span");
    orderConfirmItemTotal.setAttribute("class", "order-confirm-item-total");
    orderConfirmItemTotal.innerText = `$${(Math.round((item.quantity * item.price) * 100) / 100).toFixed(2)}`;

    let hr = document.createElement("hr");
    hr.setAttribute("class", "order-confirm-divider");

    orderConfirmQuantityPrice.appendChild(cartQuantity);
    orderConfirmQuantityPrice.appendChild(cartItemAmount);

    orderConfirmTitleSubtitle.appendChild(itemTitleSpan);
    orderConfirmTitleSubtitle.appendChild(orderConfirmQuantityPrice);

    orderConfirmItem.appendChild(img);
    orderConfirmItem.appendChild(orderConfirmTitleSubtitle);
    orderConfirmItem.appendChild(orderConfirmItemTotal);

    frag.appendChild(orderConfirmItem);
    frag.appendChild(hr);
});
    
    const orderConfirmTotalContainer = document.createElement("div");
    orderConfirmTotalContainer.setAttribute("class", "order-confirm-total-container");

    const orderConfirmTotal = document.createElement("span");
    orderConfirmTotal.setAttribute("class", "order-confirm-total");
    orderConfirmTotal.innerText = "Order Total";

    const orderConfirmTotalAmt = document.createElement("span");
    orderConfirmTotalAmt.setAttribute("class", "order-confirm-total-amt");
    orderConfirmTotalAmt.innerText = `$${(Math.round(total * 100) / 100).toFixed(2)}`

    orderConfirmTotalContainer.appendChild(orderConfirmTotal);
    orderConfirmTotalContainer.appendChild(orderConfirmTotalAmt);

    frag.appendChild(orderConfirmTotalContainer);

    itemsList.appendChild(frag);
}

function resetCart() {
  document.getElementById("overlay").style.display = "none";
  document.getElementsByClassName("order-confirm-container")[0].style.display = "none";
  cart = [];

  for(let i of items) {
    if (i.childNodes.length === 12) {
        removeItem(i.dataset.item);
    }
  }
  
}

function ready() {
    // Add event listener to each "add to cart" link
    for (let j of addCartLinks) {
        j.addEventListener('click', () => addToCart(j.dataset.item));
    }
}

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", function(e) {
        ready();
    });
} else {
    // `DOMContentLoaded` has already run
    ready();
}