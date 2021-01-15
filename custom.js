let url = "https://fluttering-achieved-syringa.glitch.me/movies"

let test = {
    title: 'movie title',
    rating: 4,
    director: 'Daniel'
}

const generateMovieDisplay = ({
                                  title,
                                  rating,
                                  director = "No Director listed"
}) => {
    // let { title, rating, director } = movie

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

// generateMovieDisplay(test)

function getMovies() {
    fetch(url).then(function (response) {
        // console.log(response)
        return response.json()
    }).then(function (movies) {
        document.getElementById('loading').style.display = 'none'
        console.log(movies)

        // document.getElementById('movie').innerHTML = ''

        movies.map(movie => {

            generateMovieDisplay(movie)
        })
    }).catch( error => {
        document.getElementById('loading').style.display = 'block'
        document.getElementById('load-message').innerText = 'Failed to load Movies'
        console.error(error)
    });
}
getMovies()





let newMovie = {
    "title": "The Dark Knight",
    "rating": "5",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_SX300.jpg",
    "year": "2008",
    "genre": "Action, Thriller, ",
    "director": "Christopher Nolan",
    "plot": "Batman struggles to maintain order against the Joker.",
    "actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Gary Oldman",
    "id": `${Math.random() * 2000}`
}

const optionAdd = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMovie)
}

const addMovie = (movie) => {
    const optionAdd = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    }
    fetch(url, optionAdd).then(function(response){
        getMovies()
        console.log(response)
    })
}

// EDITING EDITING EDITING EDITING EDITING

let editedMovie = {
    "title": "The Edited Knight",
    "rating": "Edited",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_SX300.jpg",
    "year": "Edited",
    "genre": "Edited",
    "director": "Edited",
    "plot": "Edited",
    "actors": "Edited",
    "id": `1337.327659575014`
}

const optionEdit = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedMovie)
}

const editMovie = (movie) => {
    fetch(url + '/1337.327659575014', optionEdit).then(function(response){
        console.log(response)
    })
}

const optionDelete = {
    method:'DELETE'
}

const deleteMovie = (id) => {
    fetch( url + `/${id}`, optionDelete).then(function(response){
        console.log(response)
})
}

document.getElementById('newMovieSubmit').addEventListener('click', function(e){
    e.preventDefault()
    var title= document.getElementById('newTitle').value
    var director= document.getElementById('newDirector').value
    var rating= document.getElementById('newRating').value
    var plot= document.getElementById('newPlot').value
    let movie = {
        title,
        director,
        rating,
        plot
    }
    addMovie(movie)
    // console.log(movie);
})

// deleteMovie('1337.327659575014')
// editMovie(editedMovie)

// addMovie(newMovie)