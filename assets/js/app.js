const items = document.getElementsByClassName('dessert-item');
const addCartLinks = document.getElementsByClassName('add-cart');

function ready() {
    console.log(addCartLinks);

    for (let i of items){
        console.log(i.dataset.item)
    }
}

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", function(e) {
        ready()
    });
} else {
    // `DOMContentLoaded` has already run
    ready()
}