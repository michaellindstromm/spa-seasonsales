let productS = [];
let productObj; //defining variable to hold each product at index i in main for loop
let productId = [];
let prodName = [];
let prodPrice = [];
let prodCategoryId = [];
let getProducts = function(products){
  productS = products.products; //getting first value (products) from JSON object in array "products".
  for (var i = 0; i < productS.length; i++) { //loop through JSON data and push all product information into an array
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
let getCategories = function(categories){ //loop through JSON data and push all category information into an array
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

let buildWebApp = function() { //this function only runs once all JSON data is loaded (readyState: 4)
  let body = document.getElementById("body"); //create select element with first option disabled
  let select = document.createElement("select");
  select.id = "seasonalOptions";
  let disabledOption = document.createElement("option");
  disabledOption.innerHTML = "Seasonal Discount";
  disabledOption.setAttribute("disabled", true); //set attribute for first option
  disabledOption.setAttribute("selected", true);
  select.appendChild(disabledOption);
  let option;
  let options =[]; //this is used to add eventlistener to select correct section to display
  for (var l = 0; l < categorieS.length; l++) { //loop through number of categories to create number of selectable options
    option = document.createElement("option");
    option.innerHTML = catSeasonDiscName[l];
    option.value = categoryId[l];
    options.push(categoryId[l]); //push categoryId to array (options) to use in the eventlistener

    select.appendChild(option);
    //*********** Need to add eventlistener here to change table price when certain season option is selected, but will do that later once information is in the table
    body.appendChild(select);
  }

  document.getElementById("seasonalOptions").addEventListener("change", function(e){

    for (var m = 0; m < options.length; m++) { //loop number of options and if the value of the option select == the sectionId at that option in the loop then show section and hid other sections.
      let thisSection = sectionsToShow[m];
      if (this.value == sectionIds[m]) {
        thisSection.classList.remove("hidden");
        thisSection.classList.add("visible");
      } else {
        thisSection.classList.remove("visible");
        thisSection.classList.add("hidden");
      }
    }
  })



  //*****************
  //*****************
  //Create sections for toggling discounts.

  let section;
  let sectionIds = [];
  let sectionsToShow = [];
  for (var i = 0; i < categorieS.length; i++) { //this loops through all the categories and creates a new section and table within the section for each category that has different pricing based upon which season is selected
    section = document.createElement("section");
    section.id = catSeasonDiscName[i];
    sectionIds.push(categoryId[i]);
    section.classList.add("hidden");
    let table = document.createElement("table");
    let headTR = document.createElement("TR");
    let productTH = document.createElement("TH");
    productTH.innerHTML = "Product";
    productTH.classList.add("productCol");
    let departmentTH = document.createElement("TH");
    departmentTH.innerHTML = "Department";
    departmentTH.classList.add("departmentCol");
    let priceTH = document.createElement("TH");
    priceTH.innerHTML = "Price";
    priceTH.classList.add("priceCol");
    headTR.appendChild(productTH);
    headTR.appendChild(departmentTH);
    headTR.appendChild(priceTH);
    table.appendChild(headTR); //The ugly mess above this, is just building the general table structure to display the information.

    let tr;
    let prodTD;
    let depTD;
    let priceTD;
    for (var k = 0; k < productS.length; k++) { //creates table rows for every product
      tr = document.createElement("TR");

      prodTD = document.createElement("TD"); // create cells with product names

      prodTD.innerHTML = prodName[k];
      prodTD.id = productId[k];
      prodTD.classList.add("productCol")

      tr.appendChild(prodTD);

      //*********************************
      //*********************************

      depTD = document.createElement("TD");
      for (var j = 0; j < categorieS.length; j++) { //create cells with correct department names based off of matching id's
        if(prodCategoryId[k] === categoryId[j]) {
          depTD.innerHTML = categoryName[j]
        }
      }
      depTD.classList.add("departmentCol");
      tr.appendChild(depTD);

      //*********************************
      //*********************************

      priceTD = document.createElement("TD");

      if (prodCategoryId[k] === categoryId[i]) { //creates cells with correct price based off season selected and discount associated with the season
        priceTD.innerHTML = "$ " + ((prodPrice[k]*(1 - categoryDiscount[i])).toFixed(2)); // cell shows price of item and associated discount if prodCategoryId is equal to the categoryId based upon which season is selected
        priceTD.classList.add(`${categoryName[i]}`); //adds class to style correct cells based on discount season
      } else {
        priceTD.innerHTML = "$ " + prodPrice[k];
      }
      priceTD.classList.add("priceCol");


      tr.appendChild(priceTD);
      table.appendChild(tr);
    }
    section.appendChild(table);
    body.appendChild(section);
    sectionsToShow.push(section); //this array is used for the eventlistener to know which season section to show
  }
}


Product.loadProducts(getProducts);
Category.loadCategories(getCategories);
