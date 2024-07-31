const searchForm= document.querySelector('form');
const searchResultDiv= document.querySelector('.search-result');
const container= document.querySelector('.container');
let searchQuery='';
const appID='f8f28919';
const appKey = '6a5de6744ac649e2a81d79cf6db28a5e';


searchForm.addEventListener('submit', (e)=>{
e.preventDefault();
searchQuery= e.target.querySelector('input').value;
fetchAPI();

});

async function fetchAPI(){
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appID}&app_key=${appKey}&imageSize=REGULAR`
    const response = await fetch(baseURL);
    const Data = await response.json();
    generateHTML(Data.hits);
    console.log(Data);
}

function generateHTML(results){
    
    let generatedHTML = '';
    results.map(result=>{
         generatedHTML += 
         `
         <div class="item">
                <img src='${result.recipe.image}' alt="">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view-button" href='${result.recipe.url}' target='_blank'>View recipe</a>
                </div>
                <p class="item-data">Calorie: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Diet label: ${result.recipe.dietLabels}</p>
            </div>

         `
    })

    searchResultDiv.innerHTML = generatedHTML;
}

/*the below codes creates the text effect on the web page */

var typed = new Typed('.auto-type',{
    strings :['want to cook something?', 'type it down','I will give you some ideas'],
    typeSpeed: 150,
    backSpeed: 150,
    loop: true
})