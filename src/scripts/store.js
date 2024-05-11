class Store{

  constructor(){
    this.observers = [];   // массив(наблюдателей) состоящий из фукнций ()=>{}
    this.products = [];
  }


  subscribe(observerFunc){ // добавляет новые функции 
    this.observers.push(observerFunc)
  }

  
  notifyObservers(){  // увдомляе наблюдателй об изменений this.observers
    this.observers.forEach((observer) => observer()) 
  }


  getProducts(){
    return this.products;
  }

  setProducts(newProducts){ // обновляем списк продуктов
    this.products = newProducts;
    this.notifyObservers();
  }




}


const store = new Store(); // вызов класса