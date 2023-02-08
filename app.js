let button = document.querySelector("#search-button")

async function getData (event) {

  event.preventDefault() //prevent page data from being lost by default

  let textInput = document.querySelector("#search-bar").value 

  const url = `https://api.jikan.moe/v4/anime?q=${textInput}`

  fetch(url)
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log("Success! We're connected.", res)

      //Keep certain elements on screen and some hidden

      header.style.display = 'none'
      headerSubtitle.style.display = 'none'
      searchBar.style.display = 'block'
      searchButton.style.display = 'block'


      //Access data & append to screen

      let results = res.data
      let containerDisplay = document.querySelector('.container')
      const checkboxes = document.querySelectorAll('input[type="checkbox"]')


      //filter functionality

      // checkboxes.forEach(checkbox => {
      //   checkbox.addEventListener('change', functionName)
      // })

      // function functionName(e) {

      // }


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

        let image = anime.images.jpg.large_image_url
        imageDisplay = document.createElement('img')
        imageDisplay.innerHTML = `<img id='listing-image' alt='anime photo'></img>`
        imageDisplay.src = image //for some reason adding the src in the innerHTML wasn't working, but this does
        listingDisplay.appendChild(imageDisplay)
        
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
const searchButton = document.querySelector('#search-button')
const filter = document.querySelector('#under-heading')

header.addEventListener('click', () => {
        searchBar.style.display = 'block'
        searchButton.style.display = 'block'
        filter.style.display = 'block'
})

//search event

button.addEventListener('click', getData)