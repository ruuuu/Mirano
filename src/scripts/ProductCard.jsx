// карточка товара 
import { API_URL } from "./API.js";



 // как в реакт (компонент jsx)
export const ProductCard = (product) => {

  return ( 
      <li class="goods__item">
        <article class="goods__card card">
          <img class="card__image" src={`${API_URL}${product.photoUrl}`} alt={product.name} />
          <div class="card__content">
            <h3 class="card__title"> {product.name} </h3>
            <div class="card__footer">
              <p class="card__date-delivery"> сегодня&nbsp;в&nbsp;14:00 </p>
              {/* onMouseEnter- событие навдеения мышки: */}
              <button class="card__button" onMouseEnter={(evt) => {evt.target.textContent = "В Корзину"}} onMouseLeave={(evt) => {evt.target.innerHTML = `${product.price}&nbsp;P`}}> {product.price}&nbsp;P </button>
            </div>
          </div>
        </article>
      </li>
    )

}
  
 
