import { API_URL } from "./API.js";
import { cartStore } from "./store.js";


// товар Корзины:
export const CartElem = (cartProduct) => (  //  комопнент реакт, вернет верстку

    <li class="cart__item">
      <img class="cart__image" src={`${API_URL}${cartProduct.photoUrl}`} alt={cartProduct.name} />
      <h4 class="cart__item-title"> {cartProduct.name} </h4>
      <div class="cart__counter">
        {/* повесили обработчик: */}
        <button onClick = {() => { 
          cartStore.postCart({id: cartProduct.id, quantity: cartProduct.quantity - 1}) }
          }> - </button>
        <input class="cart__counter-input" type="number" min="0" max="99" value={cartProduct.quantity} />
         {/* повесили обработчик: */}
        <button onClick = {() => { 
          cartStore.postCart({id: cartProduct.id, quantity: cartProduct.quantity +1}) }
          }> + </button>
      </div>
      <p class="cart__price"> {cartProduct.price * cartProduct.quantity}&nbsp;₽ </p>
    </li>
);