function createProductNode (product){
    //DOM creation of product
    let prod = document.createElement("div");
    prod.id = "product-" + product.id;
    prod.setAttribute("class", "product");
    prod.setAttribute("draggable", "true");

    //let a = document.createElement("a");
    //a.setAttribute("href", "#");
    //a.setAttribute("class", "item");

    let img = document.createElement("img");
    img.setAttribute("src", "images/1.jpg");

    let div =  document.createElement("div");

    let pText =  document.createElement("p");
    pText.innerText = product.name;

    let pPrice =  document.createElement("p");
    pPrice.innerText = "Price: "  + product.price;

    div.appendChild(pText);
    div.appendChild(pPrice);

    let button = document.createElement("button");
    //button.id = "button-"+ product.id;
    button.setAttribute("type", "button");
    button.addEventListener("click", (ev =>{
        this.addProduct(product);
    }));


    let button_inner = document.createElement("span");
    button_inner.innerText = "Добавить";
    button.appendChild(button_inner);
    div.appendChild(button);

    prod.appendChild(img);
    prod.appendChild(div);
    //prod.appendChild(a);


    return prod;


    /*<div class="product" id="cat1">
            //<a href="#" class="item">
            <img src="images/1.jpg"/>
            <div>
            <p>Cat1</p>
            <p>Price:$25</p>
        </div>
        //</a>
        <button type="button"><span class="icon-play-white _hover"></span><span> Run code snippet</span></button>
        </div>*/

}

function createBasketProductNode (product, rowNum){

    //DOM creation of product
    let row = document.createElement("tr");
    row.id = "tr-" + product.id;


    let th = document.createElement("th");
    th.setAttribute("field", "num");
    th.innerText = rowNum;
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("field", "image");
    let img = document.createElement("img");
    img.setAttribute("src", "images/1.jpg");
    th.appendChild(img);
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("field", "name");
    th.innerText = product.name;
    row.appendChild(th);

    th = document.createElement("th");
    th.id = "tr-q-" + product.id;
    th.setAttribute("field", "quantity");
    th.innerText = product.amount;
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("field", "price");
    th.innerText = product.price;
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("field", "delete");

    let button = document.createElement("button");
    //button.id = "button-"+ product.id;
    button.setAttribute("type", "button");
    button.addEventListener("click", (ev =>{
        this.deleteProduct(product);
    }));


    let button_inner = document.createElement("span");
    button_inner.innerText = "-";
    button.appendChild(button_inner);
    th.appendChild(button);
    row.appendChild(th);

    let cart = document.getElementById("cartcontent");
    cart.appendChild(row);

}
function deleteBasketProductNode (product) {
    var element = document.getElementById("tr-" + product.id);
    console.log(element);
    element.parentNode.removeChild(element);
}

function Product (id, price, name, isCopy=false, amount=0) {
    this.id = id;
    this.isCopy = isCopy;
    this.price = price;
    this.name = name;
    this.amount = amount;

    this.copy = function () {
        let copy = new Product(this.id, this.price, this.name, true, 1);
        return copy;
    }
    this.increaseAmount = function () {
        this.amount +=1;
    }
    this.decreaseAmount = function () {
        this.amount -=1;
    }
}

function Basket () {
    this.total = 0;
    this.amt = 0;

}

function addDragEventListener(productNode){
    cartNode = document.getElementById("cart");
    productNode.addEventListener(`dragstart`, (ev =>  {
        if (productNode !== event.target) return;
        ev.dataTransfer.setData('text/plain', ev.target.id);
    }));
}
function addDropEventListener(){
    cartNode = document.getElementById("cart");

    cartNode.addEventListener(`dragover`, ev => ev.preventDefault()); // позволить продолжить бросание
    cartNode.addEventListener(`drop`, ev => {
        let id = ev.dataTransfer.getData('text/plain').slice(8);
        let product = productList[parseInt(id)];
        this.addProduct(product);
    });
}
function addProduct(product){
    if (product.amount == 0){
        product.amount = 1;
        basket.amt += 1;
        this.createBasketProductNode(product, basket.amt);
    }
    else {
        product.amount += 1;
        var quant = document.getElementById("tr-q-" + String(product.id));
        quant.innerText = product.amount;
        console.log(quant);
    }

    basket.total += product.price;
    var node = document.getElementById("total");
    node.innerText = "Total price =" + basket.total;

}

function deleteProduct(product){
    if (product.amount == 1){
        product.amount = 0;
        basket.amt -= 1;
        this.deleteBasketProductNode(product);
    }
    else {
        product.amount -= 1;
        var quant = document.getElementById("tr-q-" + String(product.id));
        quant.innerText = product.amount;
    }

    basket.total -= product.price;
    var node = document.getElementById("total");
    node.innerText = "Total price =" + basket.total;

}

let basket = new Basket();
let productList = [];
productsNode = document.getElementById("products"); //.appendChild(node);
var dict = {"hdd":"80", "sdd":"150","usbdrive":"8", "cat":"30", "dog":"15"};
var id = -1;
for(var name in dict) {
    ++id;
    let product = new Product(id, parseInt(dict[name]), name);
    productList.push (product);
    let productNode = createProductNode (product);
    productsNode.appendChild(productNode);
    this.addDragEventListener(productNode);
}
this.addDropEventListener();