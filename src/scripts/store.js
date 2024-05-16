import { API_URL } from "./API.js";



class Store{

  // паттерн- observer 
  constructor(){
    // нач значения
    this.observers = [];   // массив(наблюдателей) состоящий из фукнций ()=>{}
  }


  subscribe(observerFunc){ // добавляет новые функции 
    this.observers.push(observerFunc);
  }

  
  notifyObservers(){  // увдомляе наблюдателй об изменений this.observers
    // console.log('this ', this)  // 
    this.observers.forEach((observer) => observer()); 
  }
};



class ProductStore extends Store{  // наследуем ProductStore от Store(тем самым поле this.observers и методы наследуются)

  constructor(){
    super(); // вызов контурктора класса Store(родителя)
    // нач значения
    this.products = [];   
    this.categories = new Set();  // коллекция
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
};



class CartStore extends Store{

  constructor(){
    super();
    this.cart = []; // нач значение
  }


  async init(){
    await this.registerCart(); // при регитрации придут куки
    await this.fetchCart();
  }


  async registerCart(){ // Регистрирует новую корзину и возвращает уникальный ключ доступа (`accessKey`), который сохраняется в куках.
    try{
      const response = await fetch(`${API_URL}/api/cart/register`, {
        method: 'POST',
        credentials: 'include',  // мои куки будут передатьвася серверу
      });

      if(!response.ok){
        throw new Error(`ошибка запроса: ${response.status}`);
      }
    }
    catch(error){
      console.error(error);
    }
  }


  getCart(){
    return this.cart;
  }


  async fetchCart(){
    try{
      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'GET',
        credentials: 'include'  // мои куки будут передатьвася серверу
      });

      if(!response.ok){
        throw new Error(`ошибка запроса: ${response.status}`);
      }

      const data = await response.json();
      this.cart = data;
      this.notifyObservers();
    }
    catch(error){
      console.error(error);
    }
  }


  async postCart({ id, quantity }){  // добавление товара в Корзину

      try{
        const response = await fetch(`${API_URL}/api/cart/items`, {
          method: 'POST',
          credentials: 'include',  // мои куки будут передатьвася серверу
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({ productId: id, quantity: quantity })
        });
  
        if(!response.ok){
          throw new Error(`ошибка запроса: ${response.status}`);
        }
  
        const data = await response.json();
        this.cart = data;
        this.notifyObservers();
  
      }
      catch(error){
        console.error(error);
      }
  }


  async addProductCart(id){ // добавление  1 го товара в Корзину
    await this.postCart({ id: id, quantity: 1});
  }

};


export const productStore = new ProductStore(); // создание объекта класса
export const cartStore = new CartStore();