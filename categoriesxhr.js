let Category = (function(){
  let categories = [];
  return {
    loadCategories: function(invokedCallback){
      let myR = new XMLHttpRequest();
      myR.addEventListener("load", function(){
        categories = JSON.parse(this.responseText)
        getCategories(categories);
        if (myR.readyState === 4) {
          buildWebApp();
        }
      })
      myR.open("GET", "categories.JSON");
      myR.send();
    }
  }
})();
