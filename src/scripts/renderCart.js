import { cartStore } from "./store.js";



// отрисовка Корзины:
export const renderCart = () => {

  const cartList = document.querySelector('.cart__list');
  const cartPriceTotal = document.querySelector('.cart__price--total');

  const updateList = () => {
    const cart = cartStore.getCart();

  };

  cartStore.subscribe(updateList);

  updateList();

};