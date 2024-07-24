const hamburgerMenu=document.querySelector('.hamburger-menu');
const openMenuBar=document.querySelector('.open-menu-bar');
const languageContainer=document.querySelector('.languages');
const englishLanguageOption=document.querySelector('.english');
const geoLanguage=document.querySelector('.georgian');
const additionalMenu=document.querySelector('.additional-menu-space');
const dropBtn=document.querySelectorAll('.dropbtn');
const dropDownContentList=document.querySelectorAll('.dropdown-content');
const menuContainer=document.querySelector('.menu-container')


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
  if(window.innerWidth<=992){
     additionalMenu.classList.add('invisible')
    removeVisibility(additionalMenu)
   
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


