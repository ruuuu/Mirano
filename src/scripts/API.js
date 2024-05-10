export const API_URL = 'http://localhost:3000';


export const fetchProducts = async () => {

  try{
      const response = await fetch(`${API_URL}/api/products`); // без await вернет промис
    
      if(!response.ok){
        throw new Error(`HTTP status is ${response.status}`); // перейдем в блок catch
      }
      const data = await response.json();
      return data;
  }
  catch(error){
      console.error(`Ошибка при получении данных: ${error}`);
      return [];
  }

 
}