import { cartStore } from './store.js';
import { Order } from './Order.jsx';



const cartOrderBtn = document.querySelector('.cart__order-btn');
//console.log('cartStore: ', cartStore)


const openOrder = () => {

  const cart = cartStore.getCart();     // [ { price, quntity }, {} ]

  const totalPriceValue = cart.reduce((acc, productCart) => {
    return acc + productCart.price * productCart.quantity
  }, 0); // нач знач acc=0


  const order = Order(totalPriceValue);
  console.log('order : ', order)

  document.body.append(order);
  document.querySelector('.order').style.display = 'flex';
};



export const initOrder = () => {

  const checkCart = () => {
    const cart = cartStore.getCart(); // [{},{}]
    console.log('cart in initOrder: ', cart)

    // cartOrderBtn.disabled = !cart.length ;
    // либо так:
    if(cart.length === 0){
      cartOrderBtn.disabled = true;  // дизейблим
    }
    else{
      cartOrderBtn.disabled = false; 
    }
  };



  cartStore.subscribe(checkCart) // когда Корзина обновится, тогда вызовется checkCart() 

  cartOrderBtn.addEventListener('click', openOrder);

}