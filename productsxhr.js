let Product = (function(){
  let products = [];
  return {
    loadProducts: function(invokeCallback){
      let myR = new XMLHttpRequest();
      myR.addEventListener("load", function() {
        products = JSON.parse(this.responseText);
        getProducts(products);
      });
      myR.open("GET", "products.JSON");
      myR.send();
    }
  }
})();
