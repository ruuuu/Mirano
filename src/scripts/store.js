import { API_URL } from "./API.js";
import { fetchProducts } from "./API.js";


  // паттерн - observer 
class Store{

  constructor(){
    // нач значения
    this.observers = [];   // массив(наблюдателей) состоящий из фукнций ()=>{}
  }


  subscribe(observerFunc){ // добавляет новые функции 
    this.observers.push(observerFunc);
  }

  
  notifyObservers(){  // увдомляем наблюдателей об изменений this.observers
    // console.log('this ', this)  // 
    this.observers.forEach((observer) => observer()); 
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


  async fetchProducts(params){ // params = { type: 'toys', category: 'Wow букет', minPrice: '1500', search: 'Пион' }

    console.log('this of ProductStore ', this);

    try{
      this.error = null;
      this.loading = true; // пока ждем ответа от сервера
      this.products = await fetchProducts(params);
      this.loading = false;  // товары получены с сервера
      this.notifyObservers();
    }
    catch(err){
      this.error = err;
      this.products = [];
      this.loading = false;  // товары получены с сервера
      this.notifyObservers();
    }
  }

  
  getProducts(){  
    return this.products; 
  }


  setProducts(newProducts){     // обновляем списк продуктов(добавляем новые товары)
    this.products = newProducts;
    this.updateCategories(newProducts);
    this.notifyObservers();     // оповещаем всех об изменении
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
    
    this.notifyObservers();
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
    this.notifyObservers();
  }

};


export const productStore = new ProductStore(); // создание объекта класса
export const cartStore = new CartStore();