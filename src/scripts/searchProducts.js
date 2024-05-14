import { fetchProducts } from "./API.js";
import { callbackWithPreload } from "./preload.js";



export const initSearchProducts = () => {

  const headerForm =  document.querySelector('.header__form');
  const goodsTitle = document.querySelector('.goods__title');
  const goodSection = document.querySelector('.goods');

  headerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(headerForm); // втсроенный 

    const searchQuery = formData.get('search').trim();  // значнеие поля у котрого name="search", trim()-убирает пробелы

    if(searchQuery){
      goodsTitle.textContent = 'Результаты поиска';
      callbackWithPreload(goodSection, fetchProducts, { search: searchQuery }); // отбражение и скрытие прелоадера
      // fetchProducts({ search: searchQuery }); 
    }
    // else{
    //   goodsTitle.textContent = '';
    //   fetchProducts();
    // }
  });

}