// open and close cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener('click', ()=>{
    cart.classList.add('active');
});
closeCart.addEventListener('click', ()=>{
    cart.classList.remove('active');
});

// start when the document is ready

if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded',start)
}else{
    start();
}

// start
function start(){
    addEvents();
}


// update and render
function update(){
    addEvents();
    updateTotal();
}

/********  ADD Event ***********/

function addEvents(){
    // remove item from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    cartRemove_btns.forEach( (btn) => {
        btn.addEventListener("click",handle_removeCartItem);
    });

    //Change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity')
    cartQuantity_inputs.forEach(input =>{
        input.addEventListener("change",handle_changeItemQuantity);
    });
    //add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn =>{
        btn.addEventListener("click", handle_addCartItem);

    });

    //Buy Order
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder)
}



/************  handle events ***********/
let itemsAdded = []

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;

    let newToAdd = {
        title,
        price,
        imgSrc
    };

    //handell item is already exist
    if(itemsAdded.find((el) => el.title == newToAdd.title)){
        alert("This item Is alredy Exist!");
        return;
    }else{
        itemsAdded.push(newToAdd)
    }
    
    //ADD product to cart
    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML=cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
}

function handle_removeCartItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el) =>
            el.title != 
            this.parentElement.querySelector('.cart-product-title').innerHTML
        );

    update();   
}

function handle_changeItemQuantity(){
    if(isNaN(this.value)|| this.value < 1){
        this.value = 1 ;
    }
    this.value=Math.floor(this.value);

    update();
}
function handle_buyOrder(){
    if(itemsAdded.length <=0){
        alert("There is no order to place yet")
        return;
    }
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML='';
    alert("your order placed successfully");
    itemsAdded=[];
    update();
}
/******************* UPDATE ********************/
  
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });
    total = Math.round(total*100) / 100
    totalElement.innerHTML = "$" + total;
}



/*************** HTML ************/


function CartBoxComponent(title,price,imgSrc){
    return `
    <div class="cart-box">
     <img src=${imgSrc} alt="" class>
     <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
     </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    </div>
    `;
}