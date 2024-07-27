const hamburgerMenu=document.querySelector('.hamburger-menu');
const openMenuBar=document.querySelector('.open-menu-bar');
const languageContainer=document.querySelector('.languages');
const englishLanguageOption=document.querySelector('.english');
const geoLanguage=document.querySelector('.georgian');
const additionalMenu=document.querySelector('.additional-menu-space');
const dropBtn=document.querySelectorAll('.dropbtn');
const dropDownContentList=document.querySelectorAll('.dropdown-content');
const menuContainer=document.querySelector('.menu-container');


const offers=document.querySelector('.offers');
const parentContainerOffer=document.querySelectorAll('.offer-card-parent')
const offerContainer=document.querySelector('.offer-container');
let sliderWidth=offers.clientWidth;
const itemWidth=parentContainerOffer[4].getBoundingClientRect().width
let slidesAmount=Math.abs(Math.ceil((sliderWidth-window.innerWidth)/itemWidth)+2);
const sliderThumb=document.querySelector('.sliderthumb');
const parentSlider=document.querySelector('.slider');
const sliderBtns=document.querySelector('.slider-btns');
let sliderthumLocation=(parentSlider.clientWidth-sliderThumb.clientWidth+10-sliderBtns.clientWidth)/(slidesAmount+1);
const leftButton=document.querySelector('.left');
const rightButton=document.querySelector('.right');


const products=document.querySelector('.products');
const parentContainerProduct=document.querySelectorAll('.product-card-parent');
const productContainer=document.querySelector('.product-container')
let productSliderWidth=products.clientWidth;
const productItemWidth=parentContainerProduct[2].getBoundingClientRect().width;
let slidesAmountForProducts=Math.abs(Math.ceil((productSliderWidth-window.innerWidth)/productItemWidth)+2);
const productsSliderThumb=document.querySelector('.products-sliderthumb');
const productsParentSlider=document.querySelector('.product-slider');
const productsSliderBtns=document.querySelector('.product-slider-btns');
let productsSliderthumLocation=(productsParentSlider.clientWidth-productsSliderThumb.clientWidth+10-productsSliderBtns.clientWidth)/(slidesAmountForProducts+1);
let productSliderLeftBtn=document.querySelector('.left-product-btn');
let productSliderRightBtn=document.querySelector('.right-product-btn')



let selectedLanguage=window.localStorage.getItem('language')|| "ka";
if(selectedLanguage==='eng'){
  englishLanguageOption.textContent="ქარ";
  geoLanguage.textContent="ENG"
} else{englishLanguageOption.textContent="ENG"}



hamburgerMenu.addEventListener('click', ()=>{
  hamburgerMenu.classList.toggle('active')  
  openMenuBar.classList.toggle('open');
  menuContainer.classList.toggle('hidden')
})

geoLanguage.addEventListener('mouseenter',()=> {
 englishLanguageOption.classList.add('english-visible')
})

languageContainer.addEventListener('mouseleave',()=> {
  englishLanguageOption.classList.remove('english-visible')
  
})
englishLanguageOption.addEventListener('mouseenter',()=> {
  englishLanguageOption.classList.add('english-visible')
})
englishLanguageOption.addEventListener('mouseleave',()=> {
  englishLanguageOption.classList.remove('english-visible')
})



englishLanguageOption.addEventListener('click', ()=>{
 if(englishLanguageOption.textContent==="ENG"){
    englishLanguageOption.textContent="ქარ";
    geoLanguage.textContent='ENG';
    loadTranslations('eng');
localStorage.setItem('language', 'eng')
  } else{
    englishLanguageOption.textContent="ENG";
    geoLanguage.textContent='ქარ';
    loadTranslations('ka');
    localStorage.setItem('language', 'ka')
}})


function loadTranslations(lang) {
  fetch(`${lang}.json`)
      .then(response => {return response.json()})
      .then(data => {
       websiteTextContent=data;
    updateContent()
      });
     }

function updateContent() {
const allItems=document.querySelectorAll('[data-lang]');
 allItems.forEach((element)=>{
  
  const key = element.getAttribute('data-lang');
  element.textContent=websiteTextContent[key]
  })

}
loadTranslations(selectedLanguage)




dropBtn.forEach((el)=>{
  
el.addEventListener('click', (e)=>{
  if(e.target.nextElementSibling.classList.contains('visible')){
    removeVisibility(additionalMenu)
    
  } else {additionalMenu.classList.add('visible');
    additionalMenu.classList.remove('invisible')
    
  }
  dropDownContentList.forEach((el)=>{
      if(el!=e.target.nextElementSibling){
        removeVisibility(el)
        
        }
    })
    e.target.nextElementSibling.classList.toggle('visible')
  })
})

function checkViewportWidth() {

     additionalMenu.classList.add('invisible')
    removeVisibility(additionalMenu);
    
  dropDownContentList.forEach((el)=>{
      el.classList.remove('visible');
      
  })
  if(window.innerWidth>=992){
    menuContainer.classList.remove('hidden'), openMenuBar.classList.remove('open')
  }

}

window.addEventListener('resize',()=> checkViewportWidth());



function removeVisibility(param){
    param.classList.remove('visible')
      
}
document.addEventListener('click', (e)=>{
  if(!e.target.classList.contains('dropbtn') && additionalMenu.classList.contains('visible')  ){
    
    removeVisibility(additionalMenu)
    dropDownContentList.forEach((el)=>removeVisibility(el))

  }
})

const listItems = document.querySelectorAll('.menu-item');

listItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

  
let isAnimating = false; 
let mouseIsmoving=false;
let currentSlideIndex=0;
let currentProductSlideIndex=0;
let main=document.querySelector('.menu-container')
let rightCoordinate=offers.getBoundingClientRect().right;
let rightProductCoordinate=products.getBoundingClientRect().right;

  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }


 handleRightClick=()=>{
 
 if (offers.getBoundingClientRect().right > main.getBoundingClientRect().right) {
        currentSlideIndex++;
        offers.style.transform = `translateX(${(-currentSlideIndex) * (itemWidth + 35)}px)`;
        sliderThumb.style.transform=`translateX(${currentSlideIndex*sliderthumLocation}px)`
      } 
  
      isAnimating = false;
      mouseIsmoving=false;
}

handleLeftClick=()=>{
  
  if(currentSlideIndex===0)  return
          else  {
                 offers.style.transform=`translateX(${offers.getBoundingClientRect().left+itemWidth+35-offerContainer.getBoundingClientRect().left}px`;
               currentSlideIndex--;
               sliderThumb.style.transform=`translateX(${currentSlideIndex*sliderthumLocation}px)`
                } 
 mouseIsmoving=false
        }
   const debouncedHandleSlideRight = debounce(handleRightClick, 300);
rightButton.addEventListener('click', debouncedHandleSlideRight);

offers.addEventListener('mousedown', (event)=>{
  mouseIsmoving=true;
  xCoordinate=event.clientX;
  sliderBtns.classList.add('visible')
 })

 offers.addEventListener('mouseover', (e)=>{
  sliderBtns.style.display="flex"
  let coordinate=e.clientX;
  if(mouseIsmoving){
    coordinate=e.clientX
    if(xCoordinate<coordinate){
    
    xCoordinate=e.clientX
    handleLeftClick();

  } else {

xCoordinate=e.clientX;
handleRightClick();

}
}
  
 });


 offers.addEventListener('mouseup', ()=>{
  mouseIsmoving=false;
 
 })



 offers.addEventListener('touchstart', ()=>{
  mouseIsmoving=true;
  xCoordinate=event.touches[0].clientX;
  
 })

 offers.addEventListener('touchmove', (e)=>{
  let coordinate=e.touches[0].clientX;
 if(mouseIsmoving){
    if(xCoordinate<coordinate){
    handleLeftClick();
    mouseIsmoving=false;
  } else {
handleRightClick();
mouseIsmoving=false;
}
}})


let isAnimatingProducts=false;
handleRightClickforProduct=()=>{
 
  if (products.getBoundingClientRect().right > main.getBoundingClientRect().right) {
         currentProductSlideIndex++;
         products.style.transform = `translateX(${(-currentProductSlideIndex) * (productItemWidth + 35)}px)`;
         productsSliderThumb.style.transform=`translateX(${currentProductSlideIndex*productsSliderthumLocation}px)`
       } 
   
       isAnimatingProducts = false;
      mouseIsmovingForProduct=false
 }
    const debouncedHandleSlideRight2 = debounce(handleRightClickforProduct, 300);
    productSliderRightBtn.addEventListener('click', debouncedHandleSlideRight2);






       handleLeftClickProduct=()=>{
  
        if(currentProductSlideIndex===0)  return
                else  {
                       products.style.transform=`translateX(${products.getBoundingClientRect().left+productItemWidth+35-productContainer.getBoundingClientRect().left}px`;
                     currentProductSlideIndex--;
                     productsSliderThumb.style.transform=`translateX(${currentProductSlideIndex*productsSliderthumLocation}px)`
                      } 
       mouseIsmovingForProduct=false
              }

       let xCoordinate=0;
       let xCoordinateforProduct=0;
       let mouseIsmovingForProduct=false;

       const debouncedHandleSlideLeft = debounce(handleLeftClick, 300);
       leftButton.addEventListener('click', debouncedHandleSlideLeft)

     

const debouncedHandleSlideLeft2=debounce(handleLeftClickProduct, 300);
productSliderLeftBtn.addEventListener('click', debouncedHandleSlideLeft2)
    

    



       products.addEventListener('mousedown', (event)=>{
        mouseIsmovingForProduct=true;
        xCoordinateforProduct=event.clientX;
        productsSliderBtns.classList.add('visible')
       })


      



    products.addEventListener('mouseover', (e)=>{
      productsSliderBtns.style.display="flex"
      let coordinate=e.clientX;
      if(mouseIsmovingForProduct){
        coordinate=e.clientX
        if(xCoordinateforProduct<coordinate){
        
          xCoordinateforProduct=e.clientX
          handleLeftClickProduct();

      } else {
   
        xCoordinateforProduct=e.clientX;
        handleRightClickforProduct();
    
  }
  }
      
     });


     

       products.addEventListener('mouseup', (event)=>{
        mouseIsmovingForProduct=false;
       
       })

      

       products.addEventListener('touchstart', (event)=>{
        mouseIsmovingForProduct=true;
        xCoordinateforProduct=event.touches[0].clientX;
        
       })

       products.addEventListener('touchmove', (e)=>{
        let coordinate=e.touches[0].clientX;
       if(mouseIsmovingForProduct){
          if(xCoordinateforProduct<coordinate){
          handleLeftClickProduct();
          mouseIsmovingForProduct=false;
        } else {
          handleRightClickforProduct();
      mouseIsmovingForProduct=false;
    }
    }})


      


