import { API_URL } from "./API.js";
import { fetchProducts } from "./API.js";


  // паттерн - observer 
class Store{

  constructor(){
    // нач значения
    this.observers = [];   // массив(функуий-наблюдателей за изменениями полей класса ProductStore и CartStore)
  }


  subscribe(observerFunc){ // добавляет новые функции в this.observers
    this.observers.push(observerFunc);
  }

  //  когда меняются поля классов ProductStore и CartStore, тогда вызываются сответсующие фукнции из this.observers
  notifyObservers(){  
    
    this.observers.forEach((observer) => {
     // console.log('вызвались функции ', observer) 
      observer();  // вызываются все фукнции которые есть в this.observers
    })
  }
};



class ProductStore extends Store {  // наследуем ProductStore от Store(тем самым поле this.observers и методы наследуются)

  constructor(){
    super(); // вызов контурктора класса Store(родителя)
    // нач значения
    this.products = [];   
    this.categories = new Set();  // коллекция(у нее нет повторяющихся значений)
    this.error = null;
    this.loading = false; // товары еще не загруились
  }


  fetchProducts(){ 

    //console.log('this of ProductStore ', this);
    const _self = this; // чтоб вернуть констект вызова this

    return async (params) => {  // params = { type: 'toys', category: 'Wow букет', minPrice: '1500', search: 'Пион' }
      try{
        _self.error = null;
        _self.loading = true; // пока ждем ответа от сервера
        _self.setProducts(await fetchProducts(params));
        _self.loading = false;  // товары получены с сервера
        _self.notifyObservers();  // после обновления полей this.loading и this.products, вызваются соответсующие функции
      }
      catch(err){
        _self.error = err;
        _self.setProducts([]);
        _self.loading = false;  // товары получены с сервера
        _self.notifyObservers(); // после обновления полей this.loading вызваются соответсующие функции
      }
    }
  }

  
  getProducts(){  
    return this.products; 
  }

  getLoading(){
    return this.loading;
  }

  setProducts(newProducts){     // обновляем списк продуктов(добавляем новые товары) [{}, {}]
    this.products = newProducts;
    this.updateCategories(newProducts);
    this.notifyObservers();     // после обновления this.products, вызываются соответсующие фукнции
  }


  getCategories(){  
    return this.categories;  // коллекция { 'Монобукеты', 'WoW Эффект', 'Авторские букеты', 'Букеты из сухоцветов', 'Цветы в коробке', …}
  }


  updateCategories(newProducts){ 
    this.categories.clear();  // очищает коллекцию Set()

    newProducts.forEach((product) => {
      if(product.categories){ // если у товара есть свойство catgories
        product.categories.forEach((category) => {
          this.categories.add(category);
        });
      }
    });
    
    this.notifyObservers(); // после обновления this.categories, вызываются соответющие функции
  }
};



class CartStore extends Store{

  constructor(){
    super();
    this.cart = []; // нач значение
  }


  async init(){
    await this.registerCart(); // при регитрации получим accessKey
    await this.fetchCart();
    console.log('this of CartStore ', this);
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


  async fetchCart(){ // получение товаров из Корзины

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
      this.notifyObservers(); // оповещаем об измнении this.cart
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
  
        const data = await response.json(); // [{ id, quantity, img, title, price}, {}, {}]
        this.cart = data;
        this.notifyObservers();
      }
      catch(error){
        console.error(error);
      }
  }


  async addProductCart(id){ // добавление  одного товара в Корзину по его id
    await this.postCart({ id: id, quantity: 1});
  }


  clearCart(){
    this.cart = [];
    this.notifyObservers(); // оповещаем об изменении this.cart
  }

};


export const productStore = new ProductStore(); // создание объекта класса
export const cartStore = new CartStore();