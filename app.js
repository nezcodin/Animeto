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

      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let title = anime.title
      }

      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let rating = anime.score //if...else: if score = null then display "rating unavailable", otherwise display the value
        //console.log(rating)
      }

      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let ratingByUsers = anime.scored_by
        //console.log(ratingByUsers) //if...else: if scored_by = null then display nothing, otherwise display the value
      }
      
      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let synopsis = anime.synopsis
        //console.log(synopsis) //if...else: if synopsis = null then display "synopsis unavailable", otherwise display the string value
      }

      for (let i = 0; i < results.length; i++) {
        let anime = results[i]
        let numEpisodes = anime.episodes
        console.log(numEpisodes) //if...else: if episodes = null then display "unavailable", otherwise display number of episodes
      }
      
      let rating = document.querySelector('.rating')

      let ratingByUsers = document.querySelector('.rating-by-users')

      let synopsis = document.querySelector('.synopsis')

      let numEpisodes = document.querySelector('.episodes')

    })
    .catch(err => {
      console.log("Error! Something went wrong...", err)
    })

}

button.addEventListener('click', getData)