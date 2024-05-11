import { fetchProducts } from "./API.js";
import { ProductCard } from "./ProductCard.jsx";



export const renderProducts = async () => {

  const goodsList = document.querySelector('.goods__list');

  const products = await fetchProducts();

  goodsList.innerHTML = '';

  products.forEach((product) => {
    const productCard = ProductCard(product);
    goodsList.append(productCard);
  });


}