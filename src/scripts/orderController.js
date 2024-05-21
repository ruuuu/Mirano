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

  order.addEventListener('click', ({ target }) => {
    if(target === order || target.closest('.order__close')){
      order.remove();  // удаляет элемент
    }
  });


  const form = document.querySelector('.order__form');

  form.addEventListener('submit', (evt) => {  // отправка данных формы на сервер
    evt.preventDefault();

    const formData = new FormData(form); // встроенный объект
    const data = {
      buyer: {
        name: formData.get('name-buyer'), // передаем значение атрибута name у поля
        phone: formData.get('phone-buyer')
      },
      recipient: {
        name: formData.get('name-recipient'),
        phone: formData.get('phone-recipient')
      },
      address: `ул. ${formData.get('street')}, дом ${formData.get('house')}, кв ${formData.get('apartment')}`,
      paymentOnline: `${formData.get('payment-online') === 'true'}`,
      deliveryDate: formData.get('delivery-date'),
      deliveryTime: formData.get('delivery-time')
    }


  })


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