let webStore = new Vue({
  el: "#app",
  data: {
    //index page data
    pageTitle: "Lessons to buy",
    classes: arrayOfClasses,
    showItems: true,
    populatedLocalStorage: false,
    addToCartButton: true,
    showBasketButton: true,

    //basket page data
    basketClassesArray: [],
    displayBasketClasses: false,
  },
  mounted: function () {
    //allows to execute methods on pageload
    this.checkLocalStorage();
  },
  methods: {
    initializeSort: function (event) {
      let order = document.getElementById("order").value;
      let attribute = document.getElementById("attribute").value;

      //sort descending for price
      if (order == "descending" && attribute == "price") {
        arrayOfClasses.sort(function (a, b) {
          return parseInt(a.price) - parseInt(b.price);
        });
      }
      //sort ascending for price
      else if (order == "ascending" && attribute == "price") {
        arrayOfClasses.sort(function (a, b) {
          return parseInt(a.price) - parseInt(b.price);
        });
        arrayOfClasses.reverse();
      } else if (order == "ascending" && attribute == "availability") {
        arrayOfClasses.sort(function (a, b) {
          return parseInt(a.price) - parseInt(b.price);
        });
        arrayOfClasses.reverse();
      } else if (order == "descending" && attribute == "availability") {
        arrayOfClasses.sort(function (a, b) {
          return parseInt(a.price) - parseInt(b.price);
        });
      }
      //sort ascending for subject
      else if (order == "ascending" && attribute == "subject") {
        arrayOfClasses.sort(function (a, b) {
          var stringA = a.subject.toLowerCase(),
            stringB = b.subject.toLowerCase();
          if (stringA < stringB) return -1;
          if (stringA > stringB) return 1;
          return 0; //default return value (no sorting)
        });
      } else if (order == "descending" && attribute == "subject") {
        arrayOfClasses.sort(function (a, b) {
          var stringA = a.subject.toLowerCase(),
            stringB = b.subject.toLowerCase();
          if (stringA > stringB) return -1;
          if (stringA < stringB) return 1;
          return 0; //default return value (no sorting)
        });
      } else if (order == "descending" && attribute == "location") {
        arrayOfClasses.sort(function (a, b) {
          var stringA = a.subject.toLowerCase(),
            stringB = b.subject.toLowerCase();
          if (stringA > stringB) return -1;
          if (stringA < stringB) return 1;
          return 0; //default return value (no sorting)
        });
      } else if (order == "ascending" && attribute == "location") {
        arrayOfClasses.sort(function (a, b) {
          var stringA = a.subject.toLowerCase(),
            stringB = b.subject.toLowerCase();
          if (stringA < stringB) return -1;
          if (stringA > stringB) return 1;
          return 0; //default return value (no sorting)
        });
      }
    },

    addToBasket: function (index) {
      let indexArray = [];

      if (arrayOfClasses[index].spaces > 0) {
        this.populatedLocalStorage = true;

        if (localStorage.getItem("basketIndexArray") == undefined) {
          indexArray = [index];
          localStorage.basketIndexArray = JSON.stringify(indexArray);
        } else {
          indexArray = JSON.parse(localStorage.basketIndexArray);
          indexArray.push(index);
          localStorage.basketIndexArray = JSON.stringify(indexArray);
        }
        arrayOfClasses[index].spaces--;

        if (arrayOfClasses[index].spaces == 0) {
          document.getElementById(index).style.display = "none";
        }
      }
      this.showBasketButton = true;
    },
    checkLocalStorage: function () {
      //to run on load
      if (localStorage.getItem("basketIndexArray")) {
        this.populatedLocalStorage = true;
      }
    },

    loadBasketPage: function () {
      this.showItems = false;
      this.pageTitle = "Basket";
      this.showBasketButton = false;

      let arrayOfBasketSession = [];
      let basketClassesArrayTemp = [{}];
      arrayOfBasketSession = JSON.parse(localStorage.basketIndexArray);

      for (let x = 0; x < arrayOfBasketSession.length; x++) {
        for (let y = 0; y < arrayOfClasses.length; y++) {
          if (arrayOfBasketSession[x] == arrayOfClasses[y].id) {
            basketClassesArrayTemp = {
              id: arrayOfClasses[y].id,
              img: arrayOfClasses[y].img,
              subject: arrayOfClasses[y].subject,
              location: arrayOfClasses[y].location,
              price: arrayOfClasses[y].price,
            };
            this.basketClassesArray.push(basketClassesArrayTemp);
            this.displayBasketClasses = true;
          }
        }
      }
    },
    loadMainPage: function () {
      this.showItems = true;
      this.pageTitle = "Lessons to buy";
      this.displayBasketClasses = false;
      if (localStorage.getItem("basketIndexArray")) {
        this.showBasketButton = true;
      }
      this.basketClassesArray = [];
    },
    removeClass: function (id) {
      let indexArray = [];
      indexArray = JSON.parse(localStorage.basketIndexArray);

      for (let i = 0; i < indexArray.length; i++) {
        if (indexArray[i] == id) {
          indexArray.splice(i, 1);
          localStorage.clear();
          this.basketClassesArray = [];

          if (indexArray.length !== 0) {
            localStorage.basketIndexArray = JSON.stringify(indexArray);
            this.loadBasketPage();
          }
          break;
        }
      }
    },
  },
});
