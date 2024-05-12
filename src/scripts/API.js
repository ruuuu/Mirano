import { store } from "./store.js";
export const API_URL = 'http://localhost:3000';



// формируем строку состоящу из search-парамтеров::
const formatQueryString = (params) => {  // params = {}

  if(Object.keys(params).length === 0){
    return '';  // выход из метода
  }

  const searchParams = new URLSearchParams();  // пока пустой {}
  Object.entries(params).forEach(([key, value]) => {   // перебираем  [ [key, value], [key, value] ]
    searchParams.append(key, value);              // добавляем пару в объект
  });
  
  
  return `?${searchParams.toString()}`;
};



export const fetchProducts = async (params = {}) => {  // по умолчанию пустой

  try{
      const response = await fetch(`${API_URL}/api/products${formatQueryString(params)}`); // без await вернет промис
    
      if(!response.ok){
        throw new Error(`HTTP status is ${response.status}`); // перейдем в блок catch
      }
      const products = await response.json();     // [{} ,{}, {}]
      
      store.setProducts(products);
      // return products;
  }
  catch(error){
      console.error(`Ошибка при получении данных: ${error}`);
      return [];
  }

 
}