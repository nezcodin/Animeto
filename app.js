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

      //Access data & append to screen

      let results = res.data
      let containerDisplay = document.querySelector('.container')
      
      //removes old search when new search is made
      //resource used to help: https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild and https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild 

      while (containerDisplay.firstChild) {
        containerDisplay.removeChild(containerDisplay.firstChild);
      }


      //this cleans up the code, but now everything appends to the same div?? instead of their own unique div -> figure this out
      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let title = anime.title
        let titleDisplay = document.createElement('h3')
        titleDisplay.innerHTML = `<h3 id='listing-name'>${title}</h3>`
        containerDisplay.appendChild(titleDisplay)

        let rating = anime.score 
        let ratingDisplay = document.createElement('p')
        if (rating === null) {
          ratingDisplay.innerHTML = "<p id='listing-rating'>Sorry, we don't have enough information to display an accurate rating.</p>"
        } else {
          ratingDisplay.innerHTML = `<p id='listing-rating'>${rating}</p>`
        }
        containerDisplay.appendChild(ratingDisplay)

        let ratingByUsers = anime.scored_by
        let ratingByUsersDisplay = document.createElement('p')
        if (ratingByUsers === null) {
          ratingByUsersDisplay.innerHTML = "<p id='listing-rated-by'></p>"
        } else {
          ratingByUsersDisplay.innerHTML = `<p id='listing-rated-by'>according to ${ratingByUsers} fans</p>`
        }
        containerDisplay.appendChild(ratingByUsersDisplay)

        let numEpisodes = anime.episodes
        let numEpisodesDisplay = document.createElement('p')
        if (numEpisodes === null) {
          numEpisodesDisplay.innerHTML = "<p id='listing-episodes>Episodes: Unavailable</p>'"
        } else {
          numEpisodesDisplay.innerHTML = `<p id='listing-episodes'>Episodes: ${numEpisodes}</p>`
        }
        containerDisplay.appendChild(numEpisodesDisplay)

        let synopsis = anime.synopsis
        let synopsisDisplay = document.createElement('p')
        if (synopsis === null) {
          synopsisDisplay.innerHTML = "<p id='listing-synopsis'>Synopsis unavailable.</p>"
        } else {
          synopsisDisplay.innerHTML = `<p id='listing-synopsis'>${synopsis}</p>`
        }
        containerDisplay.appendChild(synopsisDisplay)

        
      }

    })
    .catch(err => {
      console.log("Error! Something went wrong...", err)
    })

}

button.addEventListener('click', getData)