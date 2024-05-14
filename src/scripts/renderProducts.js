import { ProductCard } from "./ProductCard.jsx";
import { store } from "./store.js";


export const renderProducts =  () => {

  const goodsList = document.querySelector('.goods__list');

  const updateList = () => {
    const products = store.getProducts(); // вместо await fetchProducts(), товары получаем уже не  с сервера,  а с хранилища
    goodsList.innerHTML = '';

    products.forEach((product) => {
      const productCard = ProductCard(product); // комопнент 
      goodsList.append(productCard);
    });
  };


  store.subscribe(updateList);
  updateList(); // вызов в первый раз
}