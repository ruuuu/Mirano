export const debounce = (fn ,ms) => {  // вернет фунцию
  let idTimeout;

  return (...args) => { 
    clearInterval(idTimeout);
    idTimeout = setTimeout(() => {  // setTimeout() функция поставится в очередь через х ms
      fn(...args)
    }, ms)  // вызовется переданная функция  через каждые x ms
  }
};