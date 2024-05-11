
const jsx = (tag, attributes = {}, ...children) => { // ...children - дочериние элементы, attributes = { class: '', src: '', alt: '' }

  console.log('tag ', tag, 'attributes ', attributes);

  if(typeof tag === 'function'){  // если тэг это фукнция
    return tag(attributes, ...children);
  }

  const element = document.createElement(tag);

  // перебираем объект:
  console.log(Object.entries(attributes))   // [ ['class' 'card__title',]  ['src', '/img/floer1.jpg'],  ['alt', 'Наименование'] ]

  Object.entries(attributes).forEach(([key, value]) => {
    if(key === 'class'){
      element.classList.add(...value.split(' '));  // 'goods__card', 'card'
    }
    else if(key.startsWith('on') && key.toLowerCase() in window){  // если key это обработчик события, ex: onSubmit, onClick)
      element.addEventListener(key.toLowerCase().substring(2), value)
    }
  });
}


export default jsx;