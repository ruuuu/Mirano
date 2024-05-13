import { store } from "./store.js";

// фильтрация по типу товара:

export const initChoicesType = () => {

  const typeChoices = document.querySelector('.filter__choices--type');

  const updateTypeChoicesVisibility = () => {
    //store.updateCategories(store.getProducts());

    const categories = store.getCategories(); // { 'Монобукеты', 'WoW Эффект', 'Авторские букеты', 'Букеты из сухоцветов', 'Цветы в коробке'}

    console.log('categories from initChoicesType ', categories)

    if(categories.size){
      typeChoices.style.display = '';
      const products =  store.getProducts();
      store.updateCategories(products);
    }
    else{
      typeChoices.style.display = 'none';
    }
  }; 

  store.subscribe(updateTypeChoicesVisibility);
    
  updateTypeChoicesVisibility();
};