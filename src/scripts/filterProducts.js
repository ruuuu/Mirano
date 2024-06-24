import { fetchProducts } from "./API.js";
import { debounce } from "./debounce.js";
import { callbackWithPreload } from "./preload.js";




// фильтр по типу(Цветы, Игрушки, Открытки) и фильтр по Цене: 

export const filterProducts = () => {

  const filterForm = document.querySelector('.filter__form');
  const goodsTitle = document.querySelector('.goods__title');
  const goodSection = document.querySelector('.goods');


  const applyFilters = (category) => {  // category- Тип товара

    const formData = new FormData(filterForm);    // FormData -встроенный объект
    const type = formData.get('type');            // значнеие поля у котрого name="type"
    const minPrice = formData.get('minPrice');    // значнеие поля у котрого name="minPrice"
    console.log('minPrice: ', minPrice)
   
    const maxPrice = formData.get('maxPrice');
    console.log('maxPrice: ', maxPrice);
    const params = {};

    if(type){
      params.type = type;
    }

    if(minPrice){
      params.minPrice = minPrice;
    }

    if(maxPrice){
      params.maxPrice = maxPrice;
    }

    if(category){  // Тип товара
      params.category = category;
    }

    console.log('params: ', params) // { type: 'toys', category: 'Wow букет', minPrice: '1500' }  { type: 'toys', category: 'Wow букет', maxPrice: '1700' }
    // fetchProducts(params);
    callbackWithPreload(goodSection, fetchProducts, params); // отбражение и скрытие прелоадера
  };
 

  applyFilters(); 

  const applyPriceFilters = debounce(applyFilters, 500); // чтобы фильтр резко не срабатывал, фунуия вызывается через каждые 500ms. Снимаем нагрузку на сервер, запрос отправится тлоько когда перестанем вводить    

 

  filterForm.addEventListener('input', (evt) => { // при каждом вводе в поле, сработает событие
    const target = evt.target;
    // console.log('target ', target); // <input type="radio">

    if(target.name === 'type'){  // если нажали на input type="radio"
      goodsTitle.textContent = target.labels[0].textContent;
      filterForm.maxPrice.value = '';
      filterForm.minPrice.value = '';
      applyFilters();   
      return; // выход
    }


    if(target.name === 'minPrice' || target.name === 'maxPrice'){  // если заполнили minPrice и maxPrice
      applyPriceFilters();
    }
  });



  filterForm.addEventListener('click', ({ target }) => { 

    if(target.closest('.filter__type-btn')){
      applyFilters(target.textContent);
    }
  });

};