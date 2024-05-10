export const initCart = () => {

  const headerCartBtn = document.querySelector('.header__cart-btn');
  const cartClose = document.querySelector('.cart__close');
  const cart = document.querySelector('.cart');


  const toggleCart = () => {
    cart.classList.toggle('cart--open');

    if(cart.classList.contains('cart--open') && window.innerWidth > 1360){
      cart.scrollIntoView({   // скроллим плавно к корзине
        behavior: 'smooth'
      })
    }
  }


  headerCartBtn.addEventListener('click', toggleCart);


  cartClose.addEventListener('click', () => {
    cart.classList.remove('cart--open')
  });

}