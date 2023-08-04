const main = document.querySelector('main')

// MODAL
const contactBtn = document.getElementById('contact')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modal__close')


const startModal = () => {
    modal.classList.add('block')
    modal.classList.remove('hidden')
}
const exitModal = () => {
    modal.classList.add('hidden')
    modal.classList.remove('block')
}

contactBtn.addEventListener('click', () => {
startModal()
})
modalClose.addEventListener('click', () =>{
   exitModal()
})
modal.addEventListener('click', (e) => {
    if(e.target == modal){
        exitModal()
    }
})
document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape' && modal.classList.contains('block')){
        exitModal()
    }
})

// SEARCH

const search = document.getElementById('movie-search')
const searchCard = document.querySelector('.search-value')
const errorMessage = document.querySelector('.error-search')

const updateUi = (movieInfo) => {
    searchCard.classList.remove('hidden')
    searchCard.classList.add('opacityAnimationPlus')
   if(movieInfo.Response === 'True') {
    searchCard.innerHTML = ``
    movieInfo.Search.map((item) => {
        console.log(item);
        searchCard.innerHTML += `
        <div class="swiper-slide relative w-full  max-w-[250px] h-[300px] px-[10px] rounded-[5px]">
                            <a href="#">
                                <img class="w-full max-w-[220px] h-[100px] mt-2 rounded-[5px]" src=${item.Poster}>
                                <h3 class="absolute bottom-0 left-3 w-full max-w-[220px] text-center px-[0px]  py-[5px] rounded-[5px]">${item.Title}</h3>
                            </a>
                      </div>
        `
    })
   }else{
    searchCard.classList.add('hidden')
    errorMessage.classList.add('opacityAnimation')
    errorMessage.classList.remove('hidden')
    errorMessage.classList.add('block')
    setTimeout(() => {
        errorMessage.classList.add('hidden')
      }, "2000");
    
   }
}

const getMovie = async (movieName) => {
    const data = await getData(movieName)
    
    return data
}

search.addEventListener('submit', (e) => {
    e.preventDefault()
    const movieName = search.movie.value.trim()
    search.reset()
    getMovie(movieName)
    .then((data) => updateUi(data))
})

// FAVORITE-SLIDER
const getMovieFav = async (movieNameFav) => {
    const data = await getData(movieNameFav)
    
    return data
}
getMovieFav('hero')
.then((data) => updateUiFav(data))
const updateUiFav = (movieInfoFav) => {
   if(movieInfoFav.Response === 'True') {
    movieInfoFav.Search.map((item) => {
        favoriteList.innerHTML += `
                      <div class="swiper-slide relative w-full  max-w-[250px] h-[300px] bg-slate-400 px-[10px] rounded-[5px]">
                                <img class="w-full max-w-[230px]  mt-2 rounded-[5px]" height="200" src=${item.Poster} alt="movie img">
                                <h3 class="absolute bottom-3 left-0 w-full  text-center px-[10px] bg-orange-400 py-[5px] rounded-[5px]">${item.Title}</h3>
                      </div>
        `
    })
   }
}
// PREMIER-SLIDER
const getMoviePre = async (movieNamePre) => {
    const data = await getData(movieNamePre)
    
    return data
}
getMoviePre('future')
.then((data) => updateUiPre(data))

const updateUiPre = (movieInfoPre) => {
   if(movieInfoPre.Response === 'True') {
    movieInfoPre.Search.map((item) => {
        premierList.innerHTML += `
                      <div class="swiper-slide relative w-full  max-w-[250px] h-[300px] px-[10px] rounded-[5px]">
                            <a href="#">
                                <img class="w-full max-w-[230px] mt-2 rounded-[5px]" src=${item.Poster} alt="movie img">
                                <h3 class="absolute bottom-1 left-0 w-full  text-center px-[10px] bg-red-500 py-[5px] rounded-[5px]">${item.Title}</h3>
                            </a>
                      </div>
        `
    })
   }
}
// HERO-SLIDER

const heroList = document.getElementById('hero-list')
// FAVORITE
const favoriteList = document.getElementById('favorite-list')
// PREMIER
const premierList = document.getElementById('premier-list')

const getHeroPage = async (movieName) => {
    const data = await getData(movieName)
    
    return data
}
getHeroPage('new')
.then((data) => updateUiHero(data))

const updateUiHero = (movieHero) => {
   if(movieHero.Response === 'True') {
    movieHero.Search.map((item) => {
        heroList.innerHTML += `
        <div class="swiper-slide">
        <img src=${item.Poster} />
    </div>
        `
    })
   }
}


// CATEGORY-SECTION

const categoryList = document.getElementById('category-section')
const categoryItems = document.querySelectorAll('.category-filter')
const categoryCards = document.querySelector('.category-list')

// const categoryFilter = [
//     {name:"Comedy"},
//     {name:"Horror"},
//     {name:"Drama"},
//     {name:"Fantasy"},
//     {name:"Action"},
// ]

// categoryFilter.map((e) => {
//     categoryList.innerHTML += `
//     <li class="category-filter py-2 px-4 backdrop-invert bg-white/30 backdrop-opacity-40 rounded-[5px]">${e.name}</li>
//     `
// })

// categoryFilter.map((item) => {
    
// })
const getCategory = async (movieName) => {
    const data = await getData(movieName)
    return data
}
getCategory('red')
.then((data) => updateUiCategory(data))


const updateUiCategory = (movieCategory) => {
   if(movieCategory.Response === 'True') {
    movieCategory.Search.map((item) => {
        categoryCards.innerHTML += `
                        <div class="swiper-slide relative w-full  max-w-[250px] h-[300px] px-[10px] rounded-[5px]">
                            <a href="#">
                                <img class="w-full max-w-[220px] h-[100px] mt-2 rounded-[5px]" src=${item.Poster}>
                                <h3 class="absolute bottom-0 left-3 w-full max-w-[220px] text-center px-[0px] bg-red-500 py-[5px] rounded-[5px]">${item.Title}</h3>
                            </a>
                        </div>
        `
    })
   }
}


categoryItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        categoryCards.innerHTML = ``
        switch (item.textContent) {
            case 'Comedy':
                getCategory('comedy')
                .then((data) => updateUiCategory(data))
                break;
            case 'Horror':
                getCategory('horror')
                .then((data) => updateUiCategory(data))
                break;
            case 'Drama':
                getCategory('drama')
                .then((data) => updateUiCategory(data))
                break;
            case 'Fantasy':
                getCategory('fantasy')
                .then((data) => updateUiCategory(data))
                break;
            case 'Action':
                getCategory('action')
                .then((data) => updateUiCategory(data))
                break;
        }
    })
})







// function getFunctionValue(movie, updateNamme){
//     //malumot olgani
//     const getMovie = async (movieName) => {
//         const data = await getData(movieName)
//         return data
//     }

//     //Kino nomini bergani
//     getMovie(movie)
//     .then((data) => updateNamme(data))
//     }