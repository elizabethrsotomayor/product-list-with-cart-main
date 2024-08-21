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
    heading.innerHTML = `<h3 class="cart-heading">Your Cart (${cart.length+1})</h3>`
    emptyCartImg.style.display = "none";
    subtext.style.display = "none";
    
    // Get the object from the productsList array to find the name
    let prod = productsList.find(o => o.product === item);
    
    console.log(cart);
    
    // Construct the item and append to fragment, then append fragment to cart container
//   <div class="added-item">
//         <div class="cart-item-price-container">
//           <h4 class="cart-item-heading">Classic Tiramisu</h4>
//           <span class="cart-quantity">1x</span>
//           <span class="cart-item-amount">@ $5.50</span>
//           <span class="cart-item-total">$5.50</span>
//         </div>
//         <button class="cart-remove-item">x</button>
//       </div>

//       <hr class="cart-item-divider"/>

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
    // cartQuantity.innerHTML = cartItem.quantity;
    itemPriceContainer.appendChild(cartQuantity);
    
    addedItemDiv.appendChild(itemPriceContainer);


    frag.append(addedItemDiv);
    cartContainer.append(frag);
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
            applyActiveState(item);
            constructAddedItem(item);
            cart.push(i);
            i.quantity++;
        } 

        // else if (i.product === item && cart.includes(i)) {
        //     let cartIdx = cart.find(x => x.product === item);
        //     cartIdx.quantity++;
        // }
    }
    console.log(cart);
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