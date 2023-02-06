let button = document.querySelector("#searchButton")

async function getData (event) {

  event.preventDefault() //prevent page data from being lost by default

  let textInput = document.querySelector("#searchBar").value 

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
      
      //NEED TO figure out how to delete old search that pops up now
      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let title = anime.title
        let textNode = document.createTextNode(title)
        let newLine = document.createElement('br')
        containerDisplay.appendChild(textNode)
        containerDisplay.appendChild(newLine) 
      }

      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let rating = anime.score 
        if (rating === null) {
          let textNode = document.createTextNode("Sorry, we don't have enough information to display an accurate rating.")
          let newLine = document.createElement('br')
          containerDisplay.appendChild(textNode)
          containerDisplay.appendChild(newLine)
        } else {
          let textNode = document.createTextNode(rating)
          let newLine = document.createElement('br')
          containerDisplay.appendChild(textNode)
          containerDisplay.appendChild(newLine)
        }
      }

      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let ratingByUsers = anime.scored_by
        if (ratingByUsers === null) {
          let textNode = document.createTextNode("")
          let newLine = document.createElement('br')
          containerDisplay.appendChild(textNode)
          containerDisplay.appendChild(newLine)
        } else {
          let textNode = document.createTextNode(`according to ${ratingByUsers} fans`)
          let newLine = document.createElement('br')
          containerDisplay.appendChild(textNode)
          containerDisplay.appendChild(newLine)
        }
      }
      
      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let synopsis = anime.synopsis
        if (synopsis === null) {
          let textNode = document.createTextNode("Synopsis unavailable.")
          let newLine = document.createElement('br')
          containerDisplay.appendChild(textNode)
          containerDisplay.appendChild(newLine)
        } else {
          let textNode = document.createTextNode(synopsis)
          let newLine = document.createElement('br')
          containerDisplay.appendChild(textNode)
          containerDisplay.appendChild(newLine)
        }
      }

      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let numEpisodes = anime.episodes
        if (numEpisodes === null) {
          let textNode = document.createTextNode("Episodes: Unavailable")
          let newLine = document.createElement('br')
          containerDisplay.appendChild(textNode)
          containerDisplay.appendChild(newLine)
        } else {
          let textNode = document.createTextNode(`Episodes: ${numEpisodes}`)
          let newLine = document.createElement('br')
          containerDisplay.appendChild(textNode)
          containerDisplay.appendChild(newLine)
        }
      }
      
      

      // let rating = document.querySelector('.rating')

      // let ratingByUsers = document.querySelector('.rating-by-users')

      // let synopsis = document.querySelector('.synopsis')

      // let numEpisodes = document.querySelector('.episodes')

    })
    .catch(err => {
      console.log("Error! Something went wrong...", err)
    })

}

button.addEventListener('click', getData)