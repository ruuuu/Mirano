
const jsx = (tag, attributes = {}, ...children) => { // ...children - дочериние элементы

  console.log('tag ', tag);

  if(typeof tag === 'function'){  // если тэг это фукнция
    return tag(attributes, ...children);
  }

  const element = document.createElement(tag);

  // перебираем объект:
  Object.entries(attributes)
}


export default jsx;