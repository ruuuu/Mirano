import { fetchProducts } from "./API.js";
import { ProductCard } from "./ProductCard.jsx";



export const renderProducts = async () => {

  const goodsList = document.querySelector('.goods__list');

  const products = await fetchProducts();

  goodsList.innerHTML = '';

  products.forEach((product) => {
    // const li = document.createElement('li');
    // li.textContent = product.name;
    // goodsList.append(li);

    const producCard = ProductCard(product);

  });

}