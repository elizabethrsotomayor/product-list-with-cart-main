const items = document.getElementsByClassName('dessert-item');
const addCartLinks = document.getElementsByClassName('add-cart');
const cartContainer = document.getElementById('cart-container');
const emptyCartImg = cartContainer.querySelector(".empty-cart-img");
const subtext = cartContainer.querySelector(".empty-cart-subtext");
const heading = cartContainer.querySelector(".cart-heading");
let frag = new DocumentFragment();

let cart = [];

let productsList = [
    {
        product: "waffle",
        name: "Waffle with Berries",
        price: 6.50,
        quantity: 0
    },
    {
        product: "creme-brulee",
        name: "Vanilla Bean Crème Brûlée",
        price: 7.00,
        quantity: 0,
    },
    {
        product: "macaron",
        name: "Macaron Mix of Five",
        price: 8.00,
        quantity: 0,
    },
    {
        product: "tiramisu",
        name: "Classic Tiramisu",
        price: 5.50,
        quantity: 0,
    },
    {
        product: "baklava",
        name: "Pistachio Baklava",
        price: 4.00,
        quantity: 0,
    },
    {
        product: "lemon-meringue",
        name: "Lemon Meringue Pie",
        price: 5.00,
        quantity: 0,
    },
    {
        product: "red-velvet",
        name: "Red Velvet Cake",
        price: 4.50,
        quantity: 0,
    },
    {
        product: "brownie",
        name: "Salted Caramel Brownie",
        price: 5.50,
        quantity: 0,
    },
    {
        product: "panna-cotta",
        name: "Vanilla Panna Cotta",
        price: 6.50,
        quantity: 0,
    },
]

function applyActiveState(item){
    console.log(item);
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

    const removeItem = document.createElement('button');
    removeItem.innerHTML = "x"
    removeItem.setAttribute("class", "cart-remove-item");

    const hr = document.createElement("hr");
    hr.setAttribute("class", "cart-item-divider");

    addedItemDiv.appendChild(itemPriceContainer);
    addedItemDiv.appendChild(removeItem);

    frag.append(addedItemDiv);
    frag.append(hr);

    cartContainer.appendChild(frag);
}

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
}

function increment(item){
    let cartIdx = cart.find(x => x.product === item);
    cartIdx.quantity++;
}

function decrement(item){
    let cartIdx = cart.find(x => x.product === item);
    cartIdx.quantity--;
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

            // Calculate and show the grand total
            doGrandTotal();
        } 

        // else if (i.product === item && cart.includes(i)) {
        //     let cartIdx = cart.find(x => x.product === item);
        //     cartIdx.quantity++;
        // }
    }
}

function ready() {
    // console.log(addCartLinks);

    // for (let i of items){
    //     console.log(i.dataset.item);
    // }

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