domFilterPriceFrom = document.getElementById('f-price-from');
domFilterPriceTo =  document.getElementById('f-price-to');
domFilterRomFrom = document.getElementById('f-rom-from');
domFilterRomTo =  document.getElementById('f-rom-to');
domFilterRamFrom = document.getElementById('f-ram-from');
domFilterRamTo =  document.getElementById('f-ram-to');
domSearchQuery = document.getElementById('f-search');

const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);

const bodyElementHTML = document.getElementsByTagName("body")[0];
const modalBackground = document.getElementsByClassName("modalBackground")[0];
const modalClose = document.getElementsByClassName("modalClose")[0];
const modalActive = document.getElementsByClassName("modalActive")[0];

domSortingsList = document.querySelectorAll('.sortings a');

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
      typeof value === 'object' & value !== null && !Array.isArray(value)
    );
}

function formatGoodsCount(count) {
    let lastDigit = count % 10;
    let lastTwoDigits = count % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return count + " товаров";
    } else if (lastDigit === 1) {
      return count + " товар";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return count + " товара";
    } else {
      return count + " товаров";
    }
  }
  

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function removeChecked(list) {
    return list.filter(item => !item.checked);
}

const searchProduct = (query, arr) => {
    query = String(query).toLowerCase();
    if (query == '') {return arr;}
    const results = arr.filter((elem) =>
        elem.title.toLowerCase().includes(query)
    );
    return results;
};


function sortProducts(products, order) {
    switch (parseInt(order)) {
      case 0:
        return products;
      case 1:
        return products.reverse();
      case 2:
        return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 3:
        return products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      default:
        return products;
    }
}

function sortProductsDom(num){
    domSortingsList.forEach(elem => {
        elem.classList.remove('sorting-selected');
    });
    domSortingsList[num].classList.add('sorting-selected');
    localStorage.setItem('sortOrderList', num);
    showProds();
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

    domFilterPriceFrom.value = filtersData.price.from;
    domFilterPriceTo.value = filtersData.price.to;
    domFilterRomFrom.value = filtersData.rom.from;
    domFilterRomTo.value = filtersData.rom.to;
    domFilterRamFrom.value = filtersData.ram.from;
    domFilterRamTo.value = filtersData.ram.to;

    domSearchQuery = document.get

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
            if (String(item.manufacturer) == String(elem.title)){
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

// Показ карточек
function showProds(){
    notObject = false;
    try {
      filters = JSON.parse(localStorage.getItem('filters'));
      if (JSON.stringify(filters).includes('null')) {
        notObject = true;
      }
    } catch {
      notObject = true;
    }

    if (notObject){
        clearFilterData();
    }
    filtersData = JSON.parse(localStorage.getItem('filters'));
    prodsShowed = filter(prods, filtersData)

    prodsShowed = searchProduct(localStorage.getItem('searchQuery'), prodsShowed);

    // сортировки списка товаров
    try{
        sortOrder = localStorage.getItem('sortOrderList');
    }
    catch{
        sortOrder = 0;
        localStorage.setItem('sortOrderList', 0);
    }
    prodsShowed = sortProducts(prodsShowed, sortOrder);
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
    });
}

function updateFilterData(mode){
    manufacturers = manufacturersList;
    switch (mode) {
        case 'clear':
            prices = [];
            for (var i = 0; i < prods.length; i++) {
                if (prods[i].discount !== "") {
                    discountPrice = prods[i].price * (1 - parseInt(prods[i].discount) / 100);
                    prices.push(parseInt(discountPrice));
                } else {
                    prices.push(parseInt(prods[i].price));
                }
            }
            localStorage.setItem('searchQuery', '')
            withDiscount = false;
            priceTo = Math.max(...prices.map(elem => parseInt(elem)));
            priceFrom = Math.min(...prices.map(elem => parseInt(elem)));
            romTo = Math.max(...prods.map(prod => parseInt(prod.rom)));
            romFrom = Math.min(...prods.map(prod => parseInt(prod.rom)));
            ramTo = Math.max(...prods.map(prod => parseInt(prod.ram)));
            ramFrom = Math.min(...prods.map(prod => parseInt(prod.ram)));

            break;
    
        default:
            let inputs = document.querySelectorAll('.manufacturers-elem');

            inputs.forEach((input, index) => {
                manufacturers[index].checked = input.checked;
            });

            priceFrom = document.getElementById('f-price-from').value;
            priceTo = document.getElementById('f-price-to').value;
            romFrom = document.getElementById('f-rom-from').value;
            romTo = document.getElementById('f-rom-to').value;
            ramFrom = document.getElementById('f-ram-from').value;
            ramTo = document.getElementById('f-ram-to').value;

            withDiscount = document.getElementById("f-discount-check").checked;
            localStorage.setItem('searchQuery', document.getElementById('f-search').value);
            break;
    }

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
    localStorage.setItem('filters', JSON.stringify(filterData));
}

function showModal(){
    modalBackground.style.display = "flex";
}

//КОРЗИНА
function addCart(prodId) {
    const cartElem = cart.find((elem) => elem.product === prodId);
    if (cartElem) {
        cartElem.number++;
    }
    else {
        cart.push({number: 1, product: prodId});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
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

function deleteElemCart(elemId){
    cart.splice(elemId, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart(){
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : emptyCart;

    let sumOrder = 0;
    let numOrder = 0;

    const cartContainer = document.querySelector('.modalWindow');

    cartContainer.innerHTML = '';

    const cartContainerCards = document.createElement('div');
    cartContainerCards.classList.add('cartCards');

    cart.forEach((elem, index) => {
        card = prods[elem.product];
        cartContainerCards.innerHTML+=`<div class="card">
        <img src="img/${card.img}" alt="">
        <div class="card-info">
            <div class="title">
                ${card.title}
            </div>
            <div class="cartCardInfo">
                <div class="cartElemInfo">
                    <div class="cei-minus-number" onclick="minusElemCart(${index})">
                        -
                    </div>
                    <div class="cei-number">
                        ${elem.number}
                    </div>
                    <div class="cei-plus-number" onclick="plusElemCart(${index})">
                        +
                    </div>
                </div>
                <div class="price-wrap">
                    <span class="price-old">${card.discount !== "" ? elem.number * card.price + " ₽" : ""}</span>
                    <span class="price-discount">${card.discount !== "" ? elem.number * getDiscount(card.price, card.discount) : elem.number * card.price} ₽</span>

                </div>
                
                <div class="deleteBtn" onclick="deleteElemCart(${index})"></div>
                
            </div>
        </div>`;
        if (card.discount !== ""){
            sumOrder += elem.number * getDiscount(card.price, card.discount);
        }
        else{
            sumOrder += elem.number * card.price;
        }
        numOrder += elem.number;
    });

    cartContainer.appendChild(cartContainerCards);
    cartContainer.innerHTML+=`<div class="orderInfoContainer">
        <div class="orderInfo">
            <p>В корзине<p>
            <p>${formatGoodsCount(numOrder)} </p>
            <div class="orderSum">${sumOrder} ₽</div>
            <div class="add-cart">Заказать</div>
        </div>
    </div>`;

    showModal();
}

// Запуск
cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : emptyCart;
showProds()

//Обработка нажатий
document.addEventListener('DOMContentLoaded', e => {
    document.getElementsByClassName('apply-btn')[0].addEventListener('click', e => {
        updateFilterData();
        showProds();});

    document.getElementsByClassName('reset-btn')[0].addEventListener('click', e => {
        updateFilterData('clear');
        showProds();});

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