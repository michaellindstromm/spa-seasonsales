let productS = [];
let productObj; //defining variable to hold each product at index i in main for loop
let productId = [];
let prodName = [];
let prodPrice = [];
let prodCategoryId = [];
let getProducts = function(products){
  productS = products.products; //getting first value (products) from JSON object in array "products".
  for (var i = 0; i < productS.length; i++) {
    productObj = productS[i];
    productId.push(productObj.id);
    prodName.push(productObj.name);
    prodPrice.push(productObj.price);
    prodCategoryId.push(productObj.category_id);

  }
  // console.log(productS);
}
let categorieS = [];
let categoryObj;
let categoryId = [];
let categoryName = [];
let catSeasonDiscName = [];
let categoryDiscount = [];
let getCategories = function(categories){
  categorieS = categories.categories; //getting first value (categories) from JSON object in array "categories".
  for (var i = 0; i < categorieS.length; i++) {
    categoryObj = categorieS[i];
    categoryId.push(categoryObj.id);
    categoryName.push(categoryObj.name);
    catSeasonDiscName.push(categoryObj.season_discount);
    categoryDiscount.push(categoryObj.discount);
  }
  // console.log(categoryDiscount);
}

let buildWebApp = function() {
  let body = document.getElementById("body");
  let select = document.createElement("select");
  let disabledOption = document.createElement("option");
  disabledOption.innerHTML = "Seasonal Discount";
  disabledOption.setAttribute("disabled", true);
  disabledOption.setAttribute("selected", true);
  select.appendChild(disabledOption);
  for (var l = 0; l < catSeasonDiscName.length; l++) {
    let option = document.createElement("option");
    option.innerHTML = catSeasonDiscName[l];
    option.value = catSeasonDiscName[l];

    select.appendChild(option);
    //*********** Need to add eventlistener here to change table price when certain season option is selected, but will do that later once information is in the table
    body.appendChild(select);
  }



  //*****************
  //*****************
  //Create sections for toggling discounts.

  let section;
  for (var i = 0; i < categorieS.length; i++) {
    section = document.createElement("section");
    section.id = categoryId[i];
    section.classList.add("hidden");
    let table = document.createElement("table");
    let headTR = document.createElement("TR");
    let productTH = document.createElement("TH");
    productTH.innerHTML = "Product";
    let departmentTH = document.createElement("TH");
    departmentTH.innerHTML = "Department";
    let priceTH = document.createElement("TH");
    priceTH.innerHTML = "Price";
    headTR.appendChild(productTH);
    headTR.appendChild(departmentTH);
    headTR.appendChild(priceTH);
    table.appendChild(headTR); //The ugly mess above this, is just building the general table structure to display the information.

    let tr;
    let prodTD;
    let depTD;
    let priceTD;
    for (var k = 0; k < productS.length; k++) {
      tr = document.createElement("TR");

      prodTD = document.createElement("TD"); // create cells with product names

      prodTD.innerHTML = prodName[k];
      prodTD.id = prodCategoryId[k];

      tr.appendChild(prodTD);

      //*********************************
      //*********************************

      depTD = document.createElement("TD");
      for (var j = 0; j < categorieS.length; j++) { //create cells with correct department names based off of matching id's
        if(prodCategoryId[k] === categoryId[j]) {
          depTD.innerHTML = categoryName[j]
        }
      }
      tr.appendChild(depTD);

      //*********************************
      //*********************************

      priceTD = document.createElement("TD");

      if (prodCategoryId[k] === categoryId[i]) {
        priceTD.innerHTML = "$ " + ((prodPrice[k]*(1 - categoryDiscount[i])).toFixed(2))
      } else {
        priceTD.innerHTML = "$ " + prodPrice[k];
      }

      tr.appendChild(priceTD);
      table.appendChild(tr);
    }
    section.appendChild(table);
    body.appendChild(section);

  }

}


Product.loadProducts(getProducts);
Category.loadCategories(getCategories);
