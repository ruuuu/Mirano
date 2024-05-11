// карточка цветка
import { API_URL } from "./API.js";




export const ProductCard = (product) =>  (  // как в реакт 
 
    <li class="goods__item">
      <article class="goods__card card">
        <img class="card__image" src={`${API_URL}${product.photoUrl}`} alt={product.name} />
        <div class="card__content">
          <h3 class="card__title"> {product.name} </h3>
          <div class="card__footer">
            <p class="card__date-delivery"> сегодня&nbsp;в&nbsp;14:00 </p>
            <button class="card__button">
              <span class="card__price"> {product.price}&nbsp;₽ </span>
              <span class="card__button-text"> В&nbsp;корзину </span>
            </button>
          </div>
        </div>
      </article>
    </li>

)

