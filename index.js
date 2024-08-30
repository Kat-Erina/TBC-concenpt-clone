'use strict'

const hamburgerMenu=document.querySelector('.hamburger-menu');
const openMenuBar=document.querySelector('.open-menu-bar');
const languageContainer=document.querySelector('.languages');
const englishLanguageOption=document.querySelector('.english');
const geoLanguage=document.querySelector('.georgian');
const additionalMenu=document.querySelector('.additional-menu-space');
const dropBtn=document.querySelectorAll('.dropbtn');
const dropDownContentList=document.querySelectorAll('.dropdown-content');
const menuContainer=document.querySelector('.menu-container');
let main=document.querySelector('.menu-container');
let websiteTextContent;


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




const awards=document.querySelector('.awards');
const parentContainerAwards=document.querySelectorAll('.awards-card-parent')
const awardsContainer=document.querySelector('.awards-container');
let awardsSliderWidth=awards.clientWidth;
const awardItemWidth=parentContainerAwards[3].getBoundingClientRect().width
let awardsSlidesAmount=Math.abs(Math.ceil((awardsSliderWidth-window.innerWidth)/awardItemWidth)+2);
const awardsSliderThumb=document.querySelector('.awards-sliderthumb');
const parentAwardsSlider=document.querySelector('.awards-slider');
const awardsSliderBtns=document.querySelector('.awards-slider-btns');
let sliderthumLocationAward=(parentAwardsSlider.clientWidth-awardsSliderThumb.clientWidth+10-awardsSliderBtns.clientWidth)/(awardsSlidesAmount+1);
const leftButtonAward=document.querySelector('.award-left-btn');
const rightButtonAward=document.querySelector('.award-right-btn');

let clicked=false;


document.getElementById('menuButton').addEventListener('click', ()=> {
  let menuContent = document.getElementById('menuContent');
  if (menuContent.style.display === 'block') {
      menuContent.style.display = 'none';
  } else {
      menuContent.style.display = 'block';
  }
});

window.addEventListener('click', (event) =>{
  let  menuContent = document.getElementById('menuContent');
  if (event.target !== document.getElementById('menuButton') && !menuContent.contains(event.target)) {
      menuContent.style.display = 'none';
  }
});



let selectedLanguage=window.localStorage.getItem('language')|| "ka";
if(selectedLanguage==='eng'){
  englishLanguageOption.textContent="ქარ";
  geoLanguage.textContent="ENG"
} else{englishLanguageOption.textContent="ENG"}



hamburgerMenu.addEventListener('click', ()=>{
  hamburgerMenu.classList.toggle('active')  
  main.classList.toggle('hidden')
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
    menuContainer.classList.remove('hidden'), 
    openMenuBar.classList.remove('open');
    hamburgerMenu.classList.remove('active')
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
let currentAwardsSlideIndex=0
let xCoordinate=0;
let xCoordinateforAward=0;
let xCoordinateforProduct=0;

let rightCoordinate=offers.getBoundingClientRect().right;
let rightProductCoordinate=products.getBoundingClientRect().right;

let isAnimatingAward = false; 
let mouseIsmovingAward=false;

  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

let offersParam={
  container:offers,
   slideIndex:currentSlideIndex,
   itemWidth,
   sliderThumb,
   sliderthumLocation,
   isAnimating,
   mouseIsmoving,
   xCoordinate,
   btns:sliderBtns
 
 }
 let paramsObjectAward={
  container:awards,
  slideIndex:currentAwardsSlideIndex,
  itemWidth:awardItemWidth,
  sliderThumb:awardsSliderThumb,
  sliderthumLocation:sliderthumLocationAward,
  isAnimating:isAnimatingAward,
  mouseIsmoving:mouseIsmovingAward,
  xCoordinate:xCoordinateforAward,
  btns:awardsSliderBtns
}

let isAnimatingProducts=false;
let mouseIsmovingForProduct=false;

const productsParamObject={
container:products,
  slideIndex:currentProductSlideIndex,
  itemWidth:productItemWidth,
  sliderThumb:productsSliderThumb,
  sliderthumLocation:productsSliderthumLocation,
  isAnimating:isAnimatingProducts,
  mouseIsmoving:mouseIsmovingForProduct,
  xCoordinate:xCoordinateforProduct,
  btns:productsSliderBtns
  
}

function rightClick(paramObject){
  console.log("dkjb")
  if (paramObject.container.getBoundingClientRect().right > main.getBoundingClientRect().right) {
    paramObject.slideIndex++;
    paramObject.container.style.transform =`translateX(${(-paramObject.slideIndex) * (paramObject.itemWidth + 35)}px)`;
    paramObject.sliderThumb.style.transform=`translateX(${paramObject.slideIndex*paramObject.sliderthumLocation}px)`;
       } 
      paramObject.isAnimating = false;
      paramObject.mouseIsmoving=false;
       }

 
function  leftClick(paramObject, container){
  if(paramObject.slideIndex===0)  return
          else  {
            paramObject.container.style.transform=`translateX(${paramObject.container.getBoundingClientRect().left+paramObject.itemWidth+35-container.getBoundingClientRect().left}px`;
            paramObject.slideIndex--;
            paramObject.sliderThumb.style.transform=`translateX(${paramObject.slideIndex*paramObject.sliderthumLocation}px)`
                } 
 paramObject.mouseIsmoving=false,
 paramObject.isAnimating=false
        }



function handleRightClick(){rightClick(offersParam)}
const debouncedHandleSlideRight = debounce(handleRightClick, 300);
function handleLeftClick(){leftClick(offersParam, offerContainer)};
const debouncedHandleSlideLeft = debounce(handleLeftClick, 300);


function handleAwardsRightClick(){rightClick(paramsObjectAward);}
const debounceHandleSlideRightAward=debounce(handleAwardsRightClick, 300);
function handleLeftClickAward(){leftClick(paramsObjectAward, awardsContainer)}
const debounceHandleSlideLeftAward=debounce(handleLeftClickAward, 300);


leftButton.addEventListener('click', debouncedHandleSlideLeft)
rightButton.addEventListener('click',debouncedHandleSlideRight );

rightButtonAward.addEventListener('click', debounceHandleSlideRightAward)
leftButtonAward.addEventListener('click', debounceHandleSlideLeftAward)


function handleRightClickforProduct(){rightClick(productsParamObject)}
const debouncedHandleSlideRight2 = debounce(handleRightClickforProduct, 300);
function handleLeftClickProduct(){leftClick(productsParamObject, productContainer)};
const debouncedHandleSlideLeftProducts=debounce(handleLeftClickProduct, 300);
productSliderRightBtn.addEventListener('click', debouncedHandleSlideRight2);

productSliderLeftBtn.addEventListener('click', debouncedHandleSlideLeftProducts);
productSliderRightBtn.addEventListener('click', debouncedHandleSlideRight2);


function handleMouseDown(paramObject, event){
  paramObject.xCoordinate=event.clientX,
  paramObject.mouseIsmoving=true
}

offers.addEventListener('mousedown', (event)=>{handleMouseDown(offersParam, event), console.log("offer works")})
awards.addEventListener('mousedown', (event)=>{handleMouseDown(paramsObjectAward, event), console.log("awards works")})
products.addEventListener('mousedown', (event)=>{handleMouseDown(paramsObjectAward, event), console.log("products works")})

function handleMouseOver(paramObj, event, leftFn, rightFn){
  paramObj.btns.classList.add('visible')
  paramObj.btns.style.display="flex"
  let coordinate=event.clientX;
  console.log(coordinate)
  if(paramObj.mouseIsmoving){
    coordinate=event.clientX
    if(paramObj.xCoordinate<coordinate){
    
      paramObj.xCoordinate=event.clientX
    leftFn();

  } else {

paramObj.xCoordinate=event.clientX;
rightFn();

}
}
paramObj.mouseIsmoving=false 
}

offers.addEventListener('mouseover', (event)=>handleMouseOver(offersParam, event, debouncedHandleSlideLeft, debouncedHandleSlideRight)
);
 awards.addEventListener('mouseover', (event)=>handleMouseOver(paramsObjectAward, event, debounceHandleSlideLeftAward, debounceHandleSlideRightAward)
);
products.addEventListener('mouseover', (event)=>handleMouseOver(productsParamObject, event, debouncedHandleSlideLeftProducts, debouncedHandleSlideRight2)
);



function handleTouchstart(paramObj, event){
paramObj.mouseIsmoving=true;
paramObj.xCoordinate=event.touches[0].clientX
}

function handleTouchmove(paramObject, event, leftFn, rightFn){
  let {mouseIsmoving}=paramObject;
  let coordinate=event.touches[0].clientX;
  if(paramObject.mouseIsmoving){
     if(paramObject.mouseIsmoving<coordinate){
    leftFn()
     mouseIsmoving=false;
   } else {
 rightFn();
 mouseIsmoving=false;
 }
 }

}
 offers.addEventListener('touchstart', (event)=>{handleTouchstart(offersParam, event)})

 offers.addEventListener('touchmove', (e)=>{
  handleTouchmove(offersParam, e, debouncedHandleSlideLeft, debouncedHandleSlideRight)
})

awards.addEventListener('touchstart', (event)=>{handleTouchstart(paramsObjectAward, event)})
awards.addEventListener('touchmove', (e)=>{
handleTouchmove(paramsObjectAward, e, debounceHandleSlideLeftAward, debounceHandleSlideRightAward)});
products.addEventListener('touchstart', (event)=>{handleTouchstart(productsParamObject, event)})

products.addEventListener('touchmove', (e)=>{
handleTouchmove(productsParamObject, e, debouncedHandleSlideLeftProducts, debouncedHandleSlideRight2)})