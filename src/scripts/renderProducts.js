import { fetchProducts } from "./API.js";



export const renderProducts = async () => {

  const goodsList = document.querySelector('.goods__list');

  const products = await fetchProducts();

  goodsList.innerHTML = '';

  products.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = product.name;
    goodsList.append(li);


  });

}