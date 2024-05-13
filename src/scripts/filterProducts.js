import { fetchProducts } from "./API.js";

// фильтр по типу: 

const filterType = (type) => {
  fetchProducts({ type: type.value });
}



export const filterProducts = () => {

  const filterForm = document.querySelector('.filter__form');

  // change - событе происхоит когда теряет фокус
  // filterForm.addEventListener('change', (evt) => {

  // })

  filterForm.addEventListener('input', (evt) => {
      const target = evt.target;
      console.log('target ', target);

      filterType(filterForm.type);

      if(target.name === 'type'){  // если нажали на радио input
        console.log('filterForm.type: ', filterForm.type);
        filterType(filterForm.type);   // filterForm.type где name=type
      }
  });

};