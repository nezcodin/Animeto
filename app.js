let searchButton = document.querySelector("#search-button")

async function getData (event) {

  event.preventDefault() //prevent page data from being lost by default

  let textInput = document.querySelector("#search-bar").value 

  const url = `https://api.jikan.moe/v4/anime?q=${textInput}`

  const urlGenre = `https://api.jikan.moe/v4/genres/anime`


  fetch(urlGenre)
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log("Success! We're connected to genres.", res)

//FILTER FUNCTIONALITY, COME BACK TO THIS & RELATED ELEMENTS


  //   let checkboxes = document.querySelectorAll('input[type="checkbox"]')
  //   for (let i = 0; i < checkboxes.length; i++) {
  //     checkboxes[i].addEventListener('change', function() {
  //       let label = document.querySelector('label[for="' + this.id + '"]')
  //       let labelText = label.textContent
  //       console.log(label)
  //       console.log(labelText)
  //   })
  // }

      let selectedGenres = []

      // checkboxes.forEach(checkbox => {
      //   checkbox.addEventListener('change', event => {
      //     if (event.target.checked) {
      //       selectedGenres.push(event.target.value)
      //     } else {
      //       const index = selectedGenres.indexOf(event.target.value)
      //       selectedGenres.splice(index, 1)
      //     }
      //     console.log(selectedGenres)
      //   })
      // })
      




    })
    .catch(err => {
      console.log("Error. There's a problem with calling the genres.")
    })


  fetch(url)
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log("Success! We're connected.", res)

      //Keep certain elements on screen and some hidden

      header.style.display = 'none'
      headerSubtitle.style.display = 'none'
      searchBar.style.display = 'inline-block'
      searchButton.style.display = 'inline-block'
      filterMenu.style.display = 'none'
      filter.style.display = 'none'


      //Access data & append to screen

      let results = res.data
      let containerDisplay = document.querySelector('.container')
      
      //removes old search when new search is made
      //resource used to help: https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild and https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild 

      while (containerDisplay.firstChild) {
        containerDisplay.removeChild(containerDisplay.firstChild);
      }


      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let listingDisplay = document.createElement('div')
        listingDisplay.setAttribute("id", "listing")
        containerDisplay.appendChild(listingDisplay)

        let image = anime.images.jpg.large_image_url
        imageDisplay = document.createElement('img')
        imageDisplay.innerHTML = `<img id='listing-image' alt='anime photo'></img>`
        imageDisplay.src = image //for some reason adding the src in the innerHTML wasn't working, but this does
        listingDisplay.appendChild(imageDisplay)

        let title = anime.title
        let titleDisplay = document.createElement('h3')
        titleDisplay.innerHTML = `<h3 id='listing-name'>${title}</h3>`
        listingDisplay.appendChild(titleDisplay)  

        let rating = anime.score 
        let ratingDisplay = document.createElement('p')
        if (rating === null) {
          ratingDisplay.innerHTML = "<p id='listing-rating'>Sorry, we don't have enough information to display an accurate rating.</p>"
        } else {
          ratingDisplay.innerHTML = `<p id='listing-rating'>${rating}</p>`
        }
        listingDisplay.appendChild(ratingDisplay)

        let ratingByUsers = anime.scored_by
        let ratingByUsersDisplay = document.createElement('p')
        if (ratingByUsers === null) {
          ratingByUsersDisplay.innerHTML = "<p id='listing-rated-by'></p>"
        } else {
          ratingByUsersDisplay.innerHTML = `<p id='listing-rated-by'>according to ${ratingByUsers} fans</p>`
        }
        listingDisplay.appendChild(ratingByUsersDisplay)

        let numEpisodes = anime.episodes
        let numEpisodesDisplay = document.createElement('p')
        if (numEpisodes === null) {
          numEpisodesDisplay.innerHTML = "<p id='listing-episodes>Episodes: Unavailable</p>'"
        } else {
          numEpisodesDisplay.innerHTML = `<p id='listing-episodes'>Episodes: ${numEpisodes}</p>`
        }
        listingDisplay.appendChild(numEpisodesDisplay)

        let synopsis = anime.synopsis
        let synopsisDisplay = document.createElement('p')
        if (synopsis === null) {
          synopsisDisplay.innerHTML = "<p id='listing-synopsis'>Synopsis unavailable.</p>"
        } else {
          synopsisDisplay.innerHTML = `<p id='listing-synopsis'>${synopsis}</p>`
        }
        listingDisplay.appendChild(synopsisDisplay)

      }

    })
    .catch(err => {
      console.log("Error! Something went wrong...", err)
    })

}

//changing home page events

const header = document.querySelector('#name')
const headerSubtitle = document.querySelector('#heading-subtitle')
const searchBar = document.querySelector('#search-bar')
const filter = document.querySelector('#under-heading')
const openFilter = document.querySelector('#open-filter')
const filterMenu = document.querySelector('.filter-menu')

header.addEventListener('click', () => {
  searchBar.style.display = 'inline-block'
  searchButton.style.display = 'inline-block'
  filter.style.display = 'none'

})

openFilter.addEventListener('click', () => {
  filterMenu.style.display = 'block'
})

//search event

searchButton.addEventListener('click', getData)