domFilterPriceFrom = document.getElementById('f-price-from');
domFilterPriceTo =  document.getElementById('f-price-to');
domFilterRomFrom = document.getElementById('f-rom-from');
domFilterRomTo =  document.getElementById('f-rom-to');
domFilterRamFrom = document.getElementById('f-ram-from');
domFilterRamTo =  document.getElementById('f-ram-to');

let prods = [
    {
        "title": "4&quot; Смартфон DEXP A440 8 ГБ розовый",
        "price": "3200",
        "discount": "",
        "manufacturer": "DEXP",
        "ram": "1",
        "rom": "8",
        "img": "1.jpg"
    },
    {
        "title": "Samsung Galaxy M52",
        "price": "40999",
        "discount": "4",
        "manufacturer": "Samsung",
        "ram": "6",
        "rom": "256",
        "img": "2.jpg"
    },
    {
        "title": "Смартфон POCO F3 Черный",
        "price": "32999",
        "discount": "",
        "manufacturer": "POCO",
        "ram": "6",
        "rom": "128",
        "img": "3.jpg"
    },
    {
        "title": "Смартфон POCO F3 Белый",
        "price": "34999",
        "discount": "6",
        "manufacturer": "POCO",
        "ram": "6",
        "rom": "128",
        "img": "4.jpg"
    }
]

let manufacturersList = [
    {
        title: "DEXP",
        checked: true
    },
    {
        title: "Samsung",
        checked: true
    },
    {
        title: "POCO",
        checked: true
    }
]

let sortOrderList = ["asc", "desc", "ascPrice", "descPrice"];

emptyCart = [];

function clearCart(){
    cart = emptyCart;
    localStorage.setItem('cart', JSON.stringify(cart));
}


function checkForNullValues(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var key in arri) {
        if (arrikey === null) {
          return true;
        }
      }
    }
    return false;
  }

function isObject(value) {
    return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    );
  }

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function removeChecked(list) {
    return list.filter(item => !item.checked);
}

const searchProduct = (query) => {
    query = query.toLowerCase();
    const results = prods.filter((prod) =>
      !prod.title.toLowerCase().includes(query)
    );
    return results;
  };

// function sortProducts(products, order) {
//     console.log(order);
//     switch (order) {
//         case 0:
//           return products.sort((a, b) => getDiscount(a.price, a.discount) - getDiscount(b.price, b.discount));
//         case 1:
//           return products.sort((a, b) => getDiscount(b.price, b.discount) - getDiscount(a.price, a.discount));
//         case 2:
//           return products.slice().sort((a, b) => products.indexOf(a) - products.indexOf(b));
//         case 3:
//           return products.slice().sort((a, b) => products.indexOf(b) - products.indexOf(a));
//         default:
//           return products;
//     }
// }

function sortProducts(products, order) {
    console.log(order);
    switch (order) {
      case 0:
        const sortedAscPrice = products.sort((a, b) => getDiscount(a.price, a.discount) - getDiscount(b.price, b.discount));
        console.log(sortedAscPrice);
        return sortedAscPrice;
      case 1:
        const sortedDescPrice = products.sort((a, b) => getDiscount(b.price, b.discount) - getDiscount(a.price, a.discount));
        console.log(sortedDescPrice);
        return sortedDescPrice;
      case 2:
        const sortedAsc = products.slice().sort((a, b) => products.indexOf(a) - products.indexOf(b));
        console.log(sortedAsc);
        return sortedAsc;
      case 3:
        const sortedDesc = products.slice().sort((a, b) => products.indexOf(b) - products.indexOf(a));
        console.log(sortedDesc);
        return sortedDesc;
      default:
        console.log(products);
        return products;
    }
  }

function getDiscount(price, discount){
    if (discount !== ""){
        return parseInt((parseInt(price) * (100 - parseInt(discount))) / 100);
    }
    else{
        return parseInt(price);
    }
}


// Фильтрация
function filter(data, filtersData) {

    let maxPrice = Math.max(...prods.map(prod => prod.price));
    let minPrice = Math.min(...prods.map(prod => prod.price));
    let maxRom = Math.max(...prods.map(prod => parseInt(prod.rom)));
    let minRom = Math.min(...prods.map(prod => parseInt(prod.rom)));
    let maxRam = Math.max(...prods.map(prod => parseInt(prod.ram)));
    let minRam = Math.min(...prods.map(prod => parseInt(prod.ram)));

    domFilterPriceFrom.value = filtersData.price.from;
    domFilterPriceTo.value = filtersData.price.to;

    domFilterRomFrom.value = filtersData.rom.from;
    domFilterRomTo.value = filtersData.rom.to;

    domFilterRamFrom.value = filtersData.ram.from;
    domFilterRamTo.value = filtersData.ram.to;

    
    let inputs = document.querySelectorAll('.manufacturers-elem');

    inputs.forEach((input, index) => {
        input.checked = filtersData.manufacturer[index].checked;
    });

    document.getElementById('f-discount-check').checked = filtersData.withDiscount;
    

    let filteredData = data.filter(item => {
        calcPrice = getDiscount(item.price, item.discount)

        // цена
        if (filtersData.price.from && filtersData.price.to) {
            if (calcPrice < filtersData.price.from || calcPrice > filtersData.price.to) {
                return false;
            }
        }
    
        //   внут. памят
        if (filtersData.rom.from && filtersData.rom.to) {
            if (parseInt(item.rom) < filtersData.rom.from || parseInt(item.rom) > filtersData.rom.to) {
                return false;
            }
        }
        
        //   опер. память
        if (filtersData.ram.from && filtersData.ram.to) {
            if (parseInt(item.ram) < filtersData.ram.from || parseInt(item.ram) > filtersData.ram.to) {
                return false;
            }
        }
        
        // фильтр производителей
        checkedManufacturer = false;

        removeChecked(filtersData.manufacturer).forEach(elem => {
            console.log(item.manufacturer);
            console.log(elem.title);
            console.log('\n')
            if (String(item.manufacturer) == String(elem.title)){
                // console.log('if');
                checkedManufacturer = true;
            }
        });

        if(checkedManufacturer){
            return false;
        }

        // фильтр скидки
        if (filtersData.withDiscount && item.discount == "") {
            return false;
        }
        return true;
        });

    return filteredData;
}


function showProds(){

    var notObject = false;
    try {
      var filters = JSON.parse(localStorage.getItem('filters'));
      if (JSON.stringify(filters).includes('null')) {
        notObject = true;
      }
    //   // console.log(filters);
    } catch {
      notObject = true;
    }

    if (notObject){
        clearFilterData();
    }

    filtersData = JSON.parse(localStorage.getItem('filters'));


    // убрать пустые 
    prodsShowed = prods.filter(function(e){
        return e !== null && e !== undefined;
    });

    prodsShowed = filter(prods, filtersData)
    try{
        sortOrder = localStorage.getItem('sortOrderList');
    }
    catch{
        sortOrder = 0;
        console.log('default sort');
    }

    // сортировки списка товаров
    prodsShowed = sortProducts(prodsShowed, sortOrder);
    console.log(prodsShowed);

    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';

    prodsShowed.forEach((card, cardId) => {
        cardsContainer.innerHTML+=`
        <div class="col-4 card">
                <img src="img/${card.img}" alt="">
                <div class="card-info">
                    <span class="title">
                        ${decodeHtml(card.title)}
                    </span>
                    <div>
                        <div class="price-wrap">
                            <span class="price-old">${card.discount !== "" ? card.price + " ₽" : ""}</span>
                            <span class="price-discount">${card.discount !== "" ? getDiscount(card.price, card.discount) : card.price} ₽</span>
                        </div>
                        <div class="add-cart" onclick="addCart(${cardId})">
                            В корзину
                        </div>
                    </div>
                </div>
            </div>`
        // cardId++;
    });
}

function clearFilterData(){

    var prices = [];

    for (var i = 0; i < prods.length; i++) {
        if (prods[i].discount !== "") {
            var discountPrice = prods[i].price * (1 - parseInt(prods[i].discount) / 100);
            prices.push(parseInt(discountPrice));
        } else {
            prices.push(parseInt(prods[i].price));
        }
    }


    let priceTo = Math.max(...prices.map(elem => parseInt(elem)));
    let priceFrom = Math.min(...prices.map(elem => parseInt(elem)));
    let romTo = Math.max(...prods.map(prod => parseInt(prod.rom)));
    let romFrom = Math.min(...prods.map(prod => parseInt(prod.rom)));
    let ramTo = Math.max(...prods.map(prod => parseInt(prod.ram)));
    let ramFrom = Math.min(...prods.map(prod => parseInt(prod.ram)));

    let manufacturers = manufacturersList;

    withDiscount = false;

    let filterData = {
        price: {
        from: priceFrom,
        to: priceTo
        },
        rom: {
        from: romFrom,
        to: romTo
        },
        ram: {
        from: ramFrom,
        to: ramTo
        },
        manufacturer: manufacturersList,
        withDiscount: withDiscount
    };

    localStorage.setItem('filters', JSON.stringify(filterData));
}

function updateFilterData(){

    let priceFrom = document.getElementById('f-price-from').value;
    let priceTo = document.getElementById('f-price-to').value;

    let romFrom = document.getElementById('f-rom-from').value;
    let romTo = document.getElementById('f-rom-to').value;

    let ramFrom = document.getElementById('f-ram-from').value;
    let ramTo = document.getElementById('f-ram-to').value;

    var manufacturers = manufacturersList;

    let inputs = document.querySelectorAll('.manufacturers-elem');

    inputs.forEach((input, index) => {
        manufacturers[index].checked = input.checked;
    });

    withDiscount = document.getElementById("f-discount-check").checked;


    let filterData = {
        price: {
        from: priceFrom,
        to: priceTo
        },
        rom: {
        from: romFrom,
        to: romTo
        },
        ram: {
        from: ramFrom,
        to: ramTo
        },
        manufacturer: manufacturers,
        withDiscount: withDiscount
    };

    console.log(filterData);

    localStorage.setItem('filters', JSON.stringify(filterData));
}


const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);

const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modalBackground")[0];
const modalClose = document.getElementsByClassName("modalClose")[0];
const modalActive = document.getElementsByClassName("modalActive")[0];



function showModal(message){
    modalBackground.style.display = "flex";
}


function addCart(prodId){
    console.log(cart);
    cartElem = {
        number: 1,
        product: prodId
    }
    cart.push(cartElem);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

function minusElemCart(elemId){
    cart[elemId].number--;
    if(cart[elemId].number <= 0){
        cart.splice(elemId, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function plusElemCart(elemId){
    cart[elemId].number++;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


function renderCart(){
    if (localStorage.getItem('cart')){
        try{
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        catch{
            cart = emptyCart;
        }
    }
    else{
        cart = emptyCart;
    }


    var sumOrder = 0;

    const cartContainer = document.querySelector('.modalWindow');

    cartContainer.innerHTML = '';

    const cartContainerCards = document.createElement('div');
    cartContainerCards.classList.add('CartCards');

    const cartOrderInfo = document.createElement('div');

    
    let elemId = 0;
    for (let i = 0; i < cart.length; i++) {
        const elem = cart[i];
        const taskHTML = createCartHTML(elem, elemId, sumOrder);
        cartContainerCards.appendChild(taskHTML[0]);
        elemId++;

        sumOrder+=Number(taskHTML[1]);
      }

    cartContainer.appendChild(cartContainerCards);


    const cartOrderInfoSum = document.createElement('div');
    cartOrderInfoSum.innerText = sumOrder + ' ₽';


    const cartOrderInfoBtn = document.createElement('div');
    cartOrderInfoBtn.classList.add('add-cart');
    cartOrderInfoBtn.innerText = 'Заказать';

    cartOrderInfo.appendChild(cartOrderInfoSum);
    cartOrderInfo.appendChild(cartOrderInfoBtn);

    cartContainer.appendChild(cartOrderInfo);

    showModal();
}

function createCartHTML(elem, elemId, sumOrder){
    
    card = prods[elem.product];
    console.log(elem.product);

    const cardElem = document.createElement('div');
    cardElem.classList.add('card');
    cardElem.classList.add('modalCard');
    
    const cardImg = document.createElement('img');
    cardImg.src = `img/${card.img}`;
    cardImg.alt = '';

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('title');
    titleSpan.innerText = decodeHtml(card.title);

    const priceDiv = document.createElement('div');

    const priceWrap = document.createElement('div');
    priceWrap.classList.add('price-wrap');

    const priceOld = document.createElement('span');
    priceOld.classList.add('price-old');

    const priceDiscount = document.createElement('span');
    priceDiscount.classList.add('price-discount');

    const priceFull = document.createElement('span');
    priceFull.classList.add('price-discount');

    if (card.discount !== ""){
        priceOld.innerText = card.price + ' ₽';
        priceDiscount.innerText = String(elem.number) + ' ✖ ' + String(getDiscount(card.price, card.discount)) + ' ₽';
        priceFull.innerText = String(getDiscount(card.price, card.discount) * elem.number) + ' ₽';
        // console.log((parseInt(card.price) * (100 - parseInt(card.discount))) / 100);

        sumOrder += getDiscount(card.price, card.discount);
    }
    else{
        priceDiscount.innerText = String(elem.number) + ' ✖ ' + card.price + ' ₽';
        priceFull.innerText = card.price * elem.number + ' ₽';
        priceOld.innerText = "";

        sumOrder += card.price;
    }

    
    // priceOld.innerText = card.discount !== "" ? (parseInt(card.price) + parseInt(card.price) * parseInt(card.discount) / 100) + ' ₽' : "";

    
    

    const elemInfo = document.createElement("div");
    elemInfo.classList.add("cartElemInfo");

    const elemInfoNum = document.createElement("div");
    elemInfoNum.innerText = elem.number;
    elemInfoNum.classList.add('cei-number');

    const elemInfoMinus = document.createElement("div");
    elemInfoMinus.innerText = '-';
    elemInfoMinus.classList.add('cei-minus-number');
    elemInfoMinus.setAttribute('onclick', 'minusElemCart('+String(elemId)+')');

    const elemInfoPlus = document.createElement("div");
    elemInfoPlus.innerText = '+';
    elemInfoPlus.classList.add('cei-plus-number');
    elemInfoPlus.setAttribute('onclick', 'plusElemCart('+String(elemId)+')');

    elemInfo.appendChild(elemInfoNum);
    elemInfo.appendChild(elemInfoMinus);
    elemInfo.appendChild(elemInfoPlus);

    // addCart.setAttribute('onclick', 'plusElemCart('+String(elemId)+')');

    priceWrap.appendChild(priceOld);
    priceWrap.appendChild(priceDiscount);
    priceWrap.appendChild(priceFull);

    cardInfo.appendChild(titleSpan);
    priceDiv.appendChild(priceWrap);
    priceDiv.appendChild(elemInfo);
    cardInfo.appendChild(priceDiv)

    cardElem.appendChild(cardImg);
    cardElem.appendChild(cardInfo);

    return [cardElem, sumOrder];
}

if (localStorage.getItem('cart')){
    var cart = JSON.parse(localStorage.getItem('cart'));
}
else{
    var cart = emptyCart;
}

showProds()

function applyFilters(){
    updateFilterData()

    showProds();
}

function resetFilters(){
    clearFilterData();

    showProds();
}

document.addEventListener('DOMContentLoaded', e => {
    document.getElementsByClassName('apply-btn')[0].addEventListener('click', e => applyFilters());
    document.getElementsByClassName('reset-btn')[0].addEventListener('click', e => resetFilters());


    document.getElementById('asc-sort-btn').addEventListener('click', e => {


        localStorage.setItem('sortOrderList', 0);
        showProds();
    });
    document.getElementById('desc-sort-btn').addEventListener('click', e => {



        localStorage.setItem('sortOrderList', 1);
        showProds();
    });
    document.getElementById('ascPrice-sort-btn').addEventListener('click', e => {


        localStorage.setItem('sortOrderList', 2);
        showProds();
    });
    document.getElementById('descPrice-sort-btn').addEventListener('click', e => {


        localStorage.setItem('sortOrderList', 3);
        showProds();
    });

    document.getElementsByClassName('cart-btn')[0].addEventListener('click', e => {
        renderCart();
    });


    modalClose.addEventListener("click", function () {
        modalBackground.style.display = "none";
    });

    modalBackground.addEventListener("click", function (event) {
        if (event.target === modalBackground) {
            modalBackground.style.display = "none";
        }
    });
})