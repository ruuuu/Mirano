import { productStore } from "./store.js";
export const API_URL = 'https://dull-rose-pawpaw.glitch.me'; //   http://localhost:3000  https://mirano-api-h7q7.onrender.com(на render.com выложили),  https://grape-speckled-lathe.glitch.me
// https://diamond-trusting-hardcover.glitch.me
// 
//export const API_URL = 'http://localhost:3000';


// формируем строку состоящу из search-парамтеров::
const formatQueryString = (params) => {  // params = { type: 'toys', minPrice: 1500 }

  if(Object.keys(params).length === 0){
    return '';  // выход из метода
  }

  const searchParams = new URLSearchParams();  // изначально  пустой {}
  Object.entries(params).forEach(([key, value]) => {   // перебираем  [ [key, value], [key, value] ]
    searchParams.append(key, value);              // добавляем пару в объект
  });
  
  
  return `?${searchParams.toString()}`; // ?type=toys&minPrice=1500
};



export const fetchProducts = async (params = {}) => {  // по умолчанию params пустой

  try{
      const response = await fetch(`${API_URL}/api/products${formatQueryString(params)}`); // без await вернет промис
    
      if(!response.ok){
        throw new Error(`HTTP status is ${response.status}`); // перейдем в блок catch
      }
      const products = await response.json();     // [{} ,{}, {}]
      
      console.log('products ',  products)
      
      productStore.setProducts(products);  // записали в store
      // return products;
  }
  catch(error){
      console.error(`Ошибка при получении данных: ${error}`);
      return [];
  }
};



export const sendOrder = async (orderData) => {

  try{
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(orderData)
    }); 
  
    if(!response.ok){
      throw new Error(`HTTP status is ${response.status}`); // перейдем в блок catch
    }

    return await response.json();
  }
  catch(error){
      console.error(`Ошибка отправки данных: ${error}`);
  }


};  