import { store } from "./store.js";

// фильтрация по типу товара:

export const initChoicesType = () => {

  const typeChoices = document.querySelector('.filter__choices--type');

  const updateTypeChoicesVisibility = () => {
    
    const categories = store.getCategories(); // { 'Монобукеты', 'WoW Эффект', 'Авторские букеты', 'Букеты из сухоцветов', 'Цветы в коробке'}

    console.log('categories from initChoicesType ', categories)

    if(categories.size){
     
      typeChoices.style.display = '';
      const filterTypeList = document.querySelector('.filter__type-list');
      filterTypeList.innerHTML = '';
      console.log('1')
      
      const products = store.getProducts();
      store.updateCategories(products);
      const newCategories = store.getCategories();
      //console.log('newCategories in choiceType ', newCategories)

      // newCategories.forEach((category) => {
      //     const li = document.createElement('li');
      //     li.classList.add('filter__type-item');
      //     const button = document.createElement('button');
      //     button.classList.add('filter__type-btn');
      //     button.type = 'button';
      //     button.textContent = category;

      //     li.append(button);
      //     filterTypeList.append(li);
      //  });

      
    }
    else{
      typeChoices.style.display = 'none';
    }
  }; 

  store.subscribe(updateTypeChoicesVisibility);
    
  updateTypeChoicesVisibility();
};