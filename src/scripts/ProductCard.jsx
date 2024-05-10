// карточка цветка

export const ProductCard = () =>  (  // как в реакт 
 
    <li class="goods__item">
      <article class="goods__card card">
        <img class="card__image" src="/img/flower11.jpg" alt="Авторский букет из роз, диантусов и сухоцветов" />
        <div class="card__content">
          <h3 class="card__title"> Авторский букет из роз, диантусов и сухоцветов </h3>
          <div class="card__footer">
            <p class="card__date-delivery"> сегодня&nbsp;в&nbsp;14:00 </p>
            <button class="card__button">
              <span class="card__price"> 3000&nbsp;₽ </span>
              <span class="card__button-text"> В&nbsp;корзину </span>
            </button>
          </div>
        </div>
      </article>
    </li>

)

