import '@/scss/index.scss';
import { initHeaderFixer } from "@/scripts/headerFixer";
import { initChoices } from './scripts/choices.js';
import { initCart } from './scripts/cart.js';
import { fetchProducts } from './scripts/API.js';
import { renderProducts } from './scripts/renderProducts.js';





const init = () => {
  initHeaderFixer();
  initChoices();
  initCart();
  fetchProducts({ type: 'bouquets' });
  renderProducts();
}

init();

// для старых браузеров(котрые не знают про type="module" в  <script type="module" src="/src/index.js"></script>):
//document.addEventListener('DOMContentLoaded', init) // как только загрузится html вызовется init

// const btns = document.querySelectorAll('.choices__btn');

// const box0 = choices[0].querySelector('.choices__box');
// const box1 = choices[1].querySelector('.choices__box');

// btns[0].addEventListener('click', () => {

//   if(box1.classList.contains('choices__box--open')){
//     box1.classList.remove('choices__box--open')
//   }
// });


// btns[1].addEventListener('click', () => {

//   if(box0.classList.contains('choices__box--open')){
//     box0.classList.remove('choices__box--open')
//   }

// });
