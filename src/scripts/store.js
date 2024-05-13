class Store{

  // паттерн- obsrver 
  constructor(){
    // нач значения
    this.observers = [];   // массив(наблюдателей) состоящий из фукнций ()=>{}
    this.products = [];   
    this.categories = new Set();  // коллекция
  }


  subscribe(observerFunc){ // добавляет новые функции 
    this.observers.push(observerFunc)
  }

  
  notifyObservers(){  // увдомляе наблюдателй об изменений this.observers
    // console.log('this ', this)  // 
    this.observers.forEach((observer) => observer()) 
  }


  getProducts(){  
    return this.products; 
  }

  setProducts(newProducts){ // обновляем списк продуктов(добавляем новые товары)
    this.products = newProducts;
    this.updateCategories(newProducts);
    this.notifyObservers();
  }


  getCategories(){  
    return this.categories;  // { 'Монобукеты', 'WoW Эффект', 'Авторские букеты', 'Букеты из сухоцветов', 'Цветы в коробке', …}
  }


  updateCategories(newProducts){ 
    this.categories.clear();  // очищает

    newProducts.forEach((product) => {
      if(product.categories){
        product.categories.forEach((category) => {
          this.categories.add(category);
        });
      }
    });
    this.notifyObservers();
  }

}


export const store = new Store(); // создание объекта класса