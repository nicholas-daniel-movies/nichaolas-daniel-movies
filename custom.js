let url = "https://fluttering-achieved-syringa.glitch.me/movies"

let test = {
    title: 'movie title',
    rating: 4,
    director: 'Daniel'
}

const generateMovieDisplay = (movie) => {
    let { title, rating, director } = movie

    // make ELEMENTS
    let body = document.createElement('div')
    let firstLine = document.createElement('div')

    let titleDisplay = document.createElement('p')
    let ratingDisplay = document.createElement('span')

    let directorDisplay = document.createElement('p')

    // ADD CONTENT
    body.setAttribute('class' , 'single-movie')

    titleDisplay.innerText = title

    ratingDisplay.innerText = rating

    directorDisplay.innerText = director

    // ASSEMBLY
    firstLine.appendChild(titleDisplay)
    firstLine.appendChild(ratingDisplay)

    body.appendChild(firstLine)
    body.appendChild(directorDisplay)



    document.getElementById('movie').appendChild(body)

}

generateMovieDisplay(test)

fetch(url).then(function(response){
    // console.log(response)
    return response.json()
}).then(function(movies){
    console.log(movies)
})
