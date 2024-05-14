import { store } from "./store.js";
import { ListType } from "./ListType.jsx";


// фильтрация по типу товара:

export const initChoicesType = () => {

  const typeChoices = document.querySelector('.filter__choices--type');
  const choicesBox = document.querySelector('.filter__choices-box--type');

 

  const updateTypeChoicesVisibility = () => {
    
    const categories = store.getCategories(); // { 'Монобукеты', 'WoW Эффект', 'Авторские букеты', 'Букеты из сухоцветов', 'Цветы в коробке'}

    //console.log('categories from initChoicesType ', categories)

    if(categories.size){
      typeChoices.style.display = '';
      choicesBox.textContent = '';
      
      const listType = ListType([...categories]); // компонент jsx, [...categories] превратили из коллекци в массив
      // console.log('listType ', listType)
      choicesBox.append(listType);
    }
    else{
      typeChoices.style.display = 'none';
    }
  }; 

  store.subscribe(updateTypeChoicesVisibility);
    
  updateTypeChoicesVisibility();
};