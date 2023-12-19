var prods = [
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
        "discount": "4%",
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
        "discount": "6%",
        "manufacturer": "POCO",
        "ram": "6",
        "rom": "128",
        "img": "4.jpg"
    }
]

var manufacturersList = [
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

var sortOrderList = {
    selected: 0,
    list:[
        'asc',
        'desc',
        'ascPrice',
        'descPrice'
    ]
}

cart = {

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

// function updateFilterData(){
//     let priceFrom = document.getElementById('f-price-from').value;
//     let priceTo = document.getElementById('f-price-to').value;

//     // console.log(priceFrom);

//     let romFrom = document.getElementById('f-rom-from').value;
//     let romTo = document.getElementById('f-rom-to').value;

//     let ramFrom = document.getElementById('f-ram-from').value;
//     let ramTo = document.getElementById('f-ram-to').value;

//     let manufacturer1 = document.getElementById('f-manufacturer-1').checked;
//     let manufacturer2 = document.getElementById('f-manufacturer-2').checked;
//     let manufacturer3 = document.getElementById('f-manufacturer-3').checked;

//     let withDiscount = document.getElementById('f-discount-check').checked;

//     // Create an object with the input values
//     let filterData = {
//         price: {
//         from: priceFrom,
//         to: priceTo
//         },
//         rom: {
//         from: romFrom,
//         to: romTo
//         },
//         ram: {
//         from: ramFrom,
//         to: ramTo
//         },
//         manufacturer: {
//         manufacturer1: manufacturer1,
//         manufacturer2: manufacturer2,
//         manufacturer3: manufacturer3
//         },
//         withDiscount: withDiscount
//     };

//     // console.log(filterData);
    
//     // Convert the object to JSON and store it in localStorage
//     localStorage.setItem('filters', JSON.stringify(filterData));
// };

// function ClearFilterData(){
//     let priceFrom = Math.max(...prods.map(prod => prod.price));
//     let priceTo = Math.min(...prods.map(prod => prod.price));
//     let romTo = Math.max(...prods.map(prod => parseInt(prod.rom)));
//     let romFrom = Math.min(...prods.map(prod => parseInt(prod.rom)));
//     let ramTo = Math.max(...prods.map(prod => parseInt(prod.ram)));
//     let ramFrom = Math.min(...prods.map(prod => parseInt(prod.ram)));

//     let manufacturer1 = document.getElementById('f-manufacturer-1').checked;
//     let manufacturer2 = document.getElementById('f-manufacturer-2').checked;
//     let manufacturer3 = document.getElementById('f-manufacturer-3').checked;

//     let withDiscount = document.getElementById('f-discount-check').checked;

//     let filterData = {
//         price: {
//         from: priceFrom,
//         to: priceTo
//         },
//         rom: {
//         from: romFrom,
//         to: romTo
//         },
//         ram: {
//         from: ramFrom,
//         to: ramTo
//         },
//         manufacturer: {
//         manufacturer1: manufacturer1,
//         manufacturer2: manufacturer2,
//         manufacturer3: manufacturer3
//         },
//         withDiscount: withDiscount
//     };

//     localStorage.setItem('filters', filterData);
// };

function sortProducts(products, order) {
    if (order === "asc") {
        return products.sort((a, b) => getDiscount(a.price, a.discount) - getDiscount(b.price, b.discount));
    } else if (order === "desc") {
        return products.sort((a, b) => getDiscount(b.price, b.discount) - getDiscount(a.price, a.discount));
    } else if (order === "asc") {
        return products.slice().sort((a, b) => products.indexOf(a) - products.indexOf(b));
    } else if (order === "desc") {
        return products.slice().sort((a, b) => products.indexOf(b) - products.indexOf(a));
    } else {
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

function removeChecked(list) {
    return list.filter(item => !item.checked);
  }

function filter(data, filtersData) {

    let maxPrice = Math.max(...prods.map(prod => prod.price));
    let minPrice = Math.min(...prods.map(prod => prod.price));
    let maxRom = Math.max(...prods.map(prod => parseInt(prod.rom)));
    let minRom = Math.min(...prods.map(prod => parseInt(prod.rom)));
    let maxRam = Math.max(...prods.map(prod => parseInt(prod.ram)));
    let minRam = Math.min(...prods.map(prod => parseInt(prod.ram)));


    document.getElementById('f-price-from').value = filtersData.price.from;
    document.getElementById('f-price-from').setAttribute('min', minPrice);
    document.getElementById('f-price-from').setAttribute('max', maxPrice);
    document.getElementById('f-price-to').value = filtersData.price.to;
    document.getElementById('f-price-to').setAttribute('min', filtersData.minPrice);
    document.getElementById('f-price-to').setAttribute('max', filtersData.maxPrice);

    document.getElementById('f-rom-from').value = filtersData.rom.from;
    document.getElementById('f-rom-from').setAttribute('min', filtersData.minRom);
    document.getElementById('f-rom-from').setAttribute('max', maxRom);
    document.getElementById('f-rom-to').value = filtersData.rom.to;
    document.getElementById('f-rom-to').setAttribute('min', minRom);
    document.getElementById('f-rom-to').setAttribute('max', maxRom);

    document.getElementById('f-ram-from').value = filtersData.ram.from;
    document.getElementById('f-ram-from').setAttribute('min', minRam);
    document.getElementById('f-ram-from').setAttribute('max', maxRam);
    document.getElementById('f-ram-to').value = filtersData.ram.to;
    document.getElementById('f-ram-to').setAttribute('min', minRam);
    document.getElementById('f-ram-to').setAttribute('max', maxRam);

    
    let inputs = document.querySelectorAll('.manufacturers-elem');

    inputs.forEach((input, index) => {
        input.checked = filtersData.manufacturer[index].checked;
    });

    document.getElementById('f-discount-check').checked = filtersData.withDiscount;
    

    let filteredData = data.filter(item => {
        
        // price = item.discount !== "" ? (parseInt(item.price) + parseInt(item.price) * parseInt(item.discount) / 100) : "";
        
        // // console.log(price);

        calcPrice = getDiscount(item.price, item.discount)

        // цена
        if (filtersData.price.from && filtersData.price.to) {
            if (calcPrice < filtersData.price.from || calcPrice > filtersData.price.to) {
                // console.log(item.title);
                // console.log(item.price);
                return false;
            }
        }
    
        //   внут. память
        
        if (filtersData.rom.from && filtersData.rom.to) {
            if (parseInt(item.rom) < filtersData.rom.from || parseInt(item.rom) > filtersData.rom.to) {
                // console.log(item.title);
                // console.log(item.rom);
                return false;
            }
        }
        
        //   опер. память
        if (filtersData.ram.from && filtersData.ram.to) {
            if (parseInt(item.ram) < filtersData.ram.from || parseInt(item.ram) > filtersData.ram.to) {
                // console.log(item.title);
                // console.log(item.ram);
                return false;
            }
        }
        
        // фильтр производителей



        // if (manufacturer1 && item.manufacturer === "DEXP") {
        //     return true;
        // }
        // if (manufacturer2 && item.manufacturer === "Samsung") {
        //     return true;
        // }
        // if (manufacturer3 && item.manufacturer === "POCO") {
        //     return true;
        // }


        checkedManufacturer = false;

        removeChecked(filtersData.manufacturer).forEach(elem => {
            console.log(item.manufacturer);
            console.log(elem.title);
            console.log('\n')
            if (String(item.manufacturer) == String(elem.title)){
                console.log('if');
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
        // console.log(item.title);
        return true;
        });


        // // console.log(filteredData)
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
        // console.log('cleared filter data');
        // console.log(JSON.parse(localStorage.getItem('filters')));
    }

    filtersData = JSON.parse(localStorage.getItem('filters'));

    // console.log(filtersData);

    // убрать пустые 
    prodsShowed = prods.filter(function(e){
        return e !== null && e !== undefined;
    });

    prodsShowed = filter(prods, filtersData)
    try{
        sortOrder = JSON.parse(localStorage.getItem('sortOrderList'));
    }
    catch{
        sortOrder = sortOrderList;
        console.log('default sort');
    }

    // сортировки списка товаров
    prodsShowed = sortProducts(prodsShowed, sortOrder)


    const cardsContainer = document.querySelector('.cards');

    cardsContainer.innerHTML = '';

    let cardId = 0;
    prodsShowed.forEach(card => {
        const taskHTML = createTaskHTML(card, cardId);
        cardsContainer.appendChild(taskHTML);

        cardId++;
    });
}


function createTaskHTML(card, cardId) {
    const cardElem = document.createElement('div');
    cardElem.classList.add('col-4', 'card');
    
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

    if (card.discount !== ""){
        priceOld.innerText = card.price + ' ₽';
        priceDiscount.innerText = String(getDiscount(card.price, card.discount)) + ' ₽';
        // console.log((parseInt(card.price) * (100 - parseInt(card.discount))) / 100);
    }
    else{
        priceDiscount.innerText = card.price + ' ₽';
        priceOld.innerText = "";
    }

    
    // priceOld.innerText = card.discount !== "" ? (parseInt(card.price) + parseInt(card.price) * parseInt(card.discount) / 100) + ' ₽' : "";

    
    

    const addCart = document.createElement("div");
    addCart.classList.add("add-cart");
    addCart.innerText = "В корзину";

    priceWrap.appendChild(priceOld);
    priceWrap.appendChild(priceDiscount);

    cardInfo.appendChild(titleSpan);
    priceDiv.appendChild(priceWrap);
    priceDiv.appendChild(addCart);
    cardInfo.appendChild(priceDiv)

    cardElem.appendChild(cardImg);
    cardElem.appendChild(cardInfo);

    return cardElem;
}

// function setFilters(prods, isClear) {
//     let maxPrice = Math.max(...prods.map(prod => prod.price));
//     let minPrice = Math.min(...prods.map(prod => prod.price));
//     let maxRom = Math.max(...prods.map(prod => parseInt(prod.rom)));
//     let minRom = Math.min(...prods.map(prod => parseInt(prod.rom)));
//     let maxRam = Math.max(...prods.map(prod => parseInt(prod.ram)));
//     let minRam = Math.min(...prods.map(prod => parseInt(prod.ram)));
//     let filters = JSON.parse(localStorage.getItem('filters')) || false;
//     // filters = false
//     if (isClear || !filters){
//         document.getElementById('f-price-from').value = minPrice;
//         document.getElementById('f-price-from').setAttribute('min', minPrice);
//         document.getElementById('f-price-from').setAttribute('max', maxPrice);
//         document.getElementById('f-price-to').value = maxPrice;
//         document.getElementById('f-price-to').setAttribute('min', minPrice);
//         document.getElementById('f-price-to').setAttribute('max', maxPrice);
    
//         document.getElementById('f-rom-from').value = minRom;
//         document.getElementById('f-rom-from').setAttribute('min', minRom);
//         document.getElementById('f-rom-from').setAttribute('max', maxRom);
//         document.getElementById('f-rom-to').value = maxRom;
//         document.getElementById('f-rom-to').setAttribute('min', minRom);
//         document.getElementById('f-rom-to').setAttribute('max', maxRom);
    
//         document.getElementById('f-ram-from').value = minRam;
//         document.getElementById('f-ram-from').setAttribute('min', minRam);
//         document.getElementById('f-ram-from').setAttribute('max', maxRam);
//         document.getElementById('f-ram-to').value = maxRam;
//         document.getElementById('f-ram-to').setAttribute('min', minRam);
//         document.getElementById('f-ram-to').setAttribute('max', maxRam);
//     }
//     else{
//         console.log(filters);
//         document.getElementById('f-price-from').value = filters.price.from;
//         document.getElementById('f-price-from').setAttribute('min', minPrice);
//         document.getElementById('f-price-from').setAttribute('max', maxPrice);
//         document.getElementById('f-price-to').value = filters.price.to;
//         document.getElementById('f-price-to').setAttribute('min', filters.minPrice);
//         document.getElementById('f-price-to').setAttribute('max', filters.maxPrice);
    
//         document.getElementById('f-rom-from').value = filters.rom.from;
//         document.getElementById('f-rom-from').setAttribute('min', filters.minRom);
//         document.getElementById('f-rom-from').setAttribute('max', maxRom);
//         document.getElementById('f-rom-to').value = filters.rom.to;
//         document.getElementById('f-rom-to').setAttribute('min', minRom);
//         document.getElementById('f-rom-to').setAttribute('max', maxRom);
    
//         document.getElementById('f-ram-from').value = filters.ram.from;
//         document.getElementById('f-ram-from').setAttribute('min', minRam);
//         document.getElementById('f-ram-from').setAttribute('max', maxRam);
//         document.getElementById('f-ram-to').value = filters.ram.to;
//         document.getElementById('f-ram-to').setAttribute('min', minRam);
//         document.getElementById('f-ram-to').setAttribute('max', maxRam);
//     }
// }

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

    // console.log(prices);

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
        manufacturer: manufacturers,
        withDiscount: withDiscount
    };

    // console.log(filterData)

    localStorage.setItem('filters', JSON.stringify(filterData));
}

function updateFilterData(){

    let priceFrom = document.getElementById('f-price-from').value;
    let priceTo = document.getElementById('f-price-to').value;

    // Get values from ROM input fields
    let romFrom = document.getElementById('f-rom-from').value;
    let romTo = document.getElementById('f-rom-to').value;

    // Get values from RAM input fields
    let ramFrom = document.getElementById('f-ram-from').value;
    let ramTo = document.getElementById('f-ram-to').value;

    var manufacturers = manufacturersList;

    // domManufacturers = document.getElementsByClassName('manufacturers-elem');

    // for (var i = 0; i < domManufacturers.length; i++) {
    //     var manufacturer = domManufacturers[i].checked;
    //     if (!manufacturers['manufacturer' + (i+1)]) {
    //         manufacturers['manufacturer' + (i+1)] = manufacturer;
    //     }
    // }

    // withDiscount = document.getElementById('f-discount-check').checked
    

    // try{
    //     Object.keys(document.getElementsByClassName('manufacturers-elem')).forEach(element => {
    //         manufacturers.appendChild({ [element.dataset.ftitle]: element.checked});
    //     });
    // }
    // catch{
    //     manufacturers = manufacturersList;
    //     console.log("Updateted cleared data");
    // }

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
        localSortOrderList = sortOrderList;

        localSortOrderList.selected = 0;

        localStorage.setItem('sortOrderList', JSON.stringify(localSortOrderList));
        showProds();
    });
    document.getElementById('desc-sort-btn').addEventListener('click', e => {
        localSortOrderList = sortOrderList;

        localSortOrderList.selected = 1;

        localStorage.setItem('sortOrderList', JSON.stringify(localSortOrderList));
        showProds();
    });
    document.getElementById('ascPrice-sort-btn').addEventListener('click', e => {
        localSortOrderList = sortOrderList;

        localSortOrderList.selected = 3;

        localStorage.setItem('sortOrderList', JSON.stringify(localSortOrderList));
        showProds();
    });
    document.getElementById('descPrice-sort-btn').addEventListener('click', e => {
        localSortOrderList = sortOrderList;

        localSortOrderList.selected = 4;

        localStorage.setItem('sortOrderList', JSON.stringify(localSortOrderList));
        showProds();
    });
})