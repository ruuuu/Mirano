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

  setProducts(newProducts){ // обновляем списк продуктов(добавляем новые товары)
    this.products = newProducts;
    this.notifyObservers();
  }




}


export const store = new Store(); // создание объекта класса