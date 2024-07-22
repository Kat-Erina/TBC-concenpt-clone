const hamburgerMenu=document.querySelector('.hamburger-menu');
const openMenuBar=document.querySelector('.open-menu-bar');
const languageContainer=document.querySelector('.languages');
const englishLanguageOption=document.querySelector('.english');
const geoLanguage=document.querySelector('.georgian');
const additionalMenu=document.querySelector('.additional-menu-space');
const dropBtn=document.querySelectorAll('.dropbtn')


let selectedLanguage=window.localStorage.getItem('language')|| "ka";
if(selectedLanguage==='eng'){
  englishLanguageOption.textContent="ქარ";
  geoLanguage.textContent="ENG"
} else{englishLanguageOption.textContent="ENG"}



hamburgerMenu.addEventListener('click', ()=>{
  hamburgerMenu.classList.toggle('active')  
  openMenuBar.classList.toggle('open')
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

  }
  
})


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
    additionalMenu.classList.remove('visible');
    
  } else {additionalMenu.classList.add('visible');
    additionalMenu.classList.remove('invisible')
    
  }
   document.querySelectorAll('.dropdown-content').forEach((el)=>{
      if(el!=e.target.nextElementSibling){
        el.classList.remove('visible')
        
        }
    })
    e.target.nextElementSibling.classList.toggle('visible')
  })
})

function checkViewportWidth() {
  if(window.innerWidth<=992){
     additionalMenu.classList.add('invisible')
     additionalMenu.classList.remove('visible')
     document.querySelectorAll('.dropdown-content').forEach((el)=>{
    
      el.classList.remove('visible')
      
  })
  }

}

window.addEventListener('resize',()=> checkViewportWidth());

