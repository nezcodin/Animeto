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
    })
    .catch(err => {
      console.log("Error! Something went wrong...", err)
    })

}

button.addEventListener('click', getData)