import { fetchProducts } from "./API.js";

// фильтр по типу(Цветы, Игрушки, Открытки): 

const filterType = (type) => { // передаем input
  fetchProducts({ type: type.value });
}



export const filterProducts = () => {

  const filterForm = document.querySelector('.filter__form');

  // change - событе происхоит когда теряет фокус
  // filterForm.addEventListener('change', (evt) => {

  // })

  filterForm.addEventListener('input', (evt) => {
      const target = evt.target;
      console.log('target ', target); // <input type="radio">

      console.log('filterForm.type: ', filterForm.type);          // [ input.#bouquets, input.#toys, input.#postcards ]
      filterType(filterForm.type);            // обращаемся к input так: form.type, где type это значение атрибута name

      if(target.name === 'type'){  // если нажали на радио input
        filterType(filterForm.type);   // filterForm.type где name=type
      }
  });

};