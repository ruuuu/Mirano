import '@/scss/index.scss';

const header = document.querySelector('.header');
const body = document.body;
let headerHeight = header.offsetHeight;




window.addEventListener('scroll', () => { // window-браузер

  const scrollDistance = window.scrollY; // какое расстояние проскролили
  //console.log('scrollDistance ', scrollDistance)

  if(scrollDistance > 200){
    header.classList.add('header--fixed');
    body.style.paddingTop = `${headerHeight}px`;
  }else{
    header.classList.remove('header--fixed');
    body.style.paddingTop = '0';
  }
});



const adjustElementPosition = (elem, count = 0) => {
  const rect = elem.getBoundingClientRect(); // { bottom: , left: , width: , height: , right: , x: , y: }
  
  const viewportWidth = window.innerWidth;  // ширина окна браузера

  if(rect.left < 0){
    elem.style.left = "0";
    elem.style.right = "auto";
    elem.style.transform = "translateX(0)";
  }
  else if(rect.right > viewportWidth){
    elem.style.left = "auto";
    elem.style.right = "0";
    elem.style.transform = "translateX(0)";
  }
  else{
    elem.style.left = "50%";
    elem.style.right = "auto";
    elem.style.transform = "translateX(-50%)";
  }

  const postRect = elem.getBoundingClientRect();    // { bottom: , left: , width: , height: , right: , x: , y: }
  if((postRect.left < 0 || postRect.right > viewportWidth) && count < 3 ){
    count++;
    adjustElementPosition(elem, count);
  }
};



const choices = document.querySelectorAll('.choices');


choices.forEach((choice, i) => {
  const btn = choice.querySelector('.choices__btn');
  const box = choice.querySelector('.choices__box');

  btn.addEventListener('click', (i) => {

    box.classList.toggle('choices__box--open');
    
    
    
    adjustElementPosition(box);

    window.addEventListener('resize', () => { 
      //console.log('поьзователь меняет размер окна')
      adjustElementPosition(box);
     });
  });

});


const btns = document.querySelectorAll('.choices__btn');

const box0 = choices[0].querySelector('.choices__box');
const box1 = choices[1].querySelector('.choices__box');

btns[0].addEventListener('click', () => {

  if(box1.classList.contains('choices__box--open')){
    box1.classList.remove('choices__box--open')
  }
});


btns[1].addEventListener('click', () => {

  if(box0.classList.contains('choices__box--open')){
    box0.classList.remove('choices__box--open')
  }

});
