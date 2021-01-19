let url = "https://fluttering-achieved-syringa.glitch.me/movies"
let localMovies = []

$('#searching').ready(function (){
    $('#searching').hide();
})

$('#search-toggle').click(function() {
    $('#searching').toggle();
});

const generateMovieDisplay = ({
                                  title,
                                  rating,
                                  director = "No Director listed",
                                  id,
                                  genre,
                                plot
    }) => {
    // make ELEMENTS
    let body = document.createElement('div')
    let contentDisplay = document.createElement('div')
    let details = document.createElement('div')
    let plotDisplay = document.createElement('div')
    let buttonsDisplay = document.createElement('div')

    let titleDisplay = document.createElement('p')
    let ratingDisplay = document.createElement('span')
    let star = document.createElement('i')
    let directorDisplay = document.createElement('p')
    let genreDisplay = document.createElement('p')

    let deleteButton = document.createElement('button')
    let editButton = document.createElement('button')

    // ADD CONTENT
    body.setAttribute('class' , 'single-movie my-3 p-3')
    body.setAttribute('id', id)

    deleteButton.innerText = 'Delete?'
    deleteButton.setAttribute('class', 'btn btn-primary')
    deleteButton.addEventListener("click",function(id){
        console.log(id)
        deleteMovie(id)
    })

    editButton.innerText = "Edit"
    editButton.setAttribute('class', 'btn btn-success')
    editButton.setAttribute('data-toggle', '#modal')
    editButton.setAttribute('data-target', '#editModal')
    editButton.setAttribute('type', 'button')

    editButton.addEventListener("click",function(){
        $('#editModal').modal('show')
        console.log(id)
        let info = localMovies.filter(movie => movie.id === id)


        document.getElementById('editTitle').value = info[0].title
        document.getElementById('editRating').value = info[0].rating
        document.getElementById('editDirector').value = info[0].director
        document.getElementById('editPlot').value = info[0].plot
        document.getElementById('editGenre').value = info[0].genre

        document.getElementById('editMovieSubmit').addEventListener('click', function(e){
            e.preventDefault()
            console.log('BOO-yah!')
            let {actors, genre, poster, year} = info[0]

            let newTitle = document.getElementById('editTitle').value
            let newRating = document.getElementById('editRating').value
            let newDirector = document.getElementById('editDirector').value
            let newPlot = document.getElementById('editPlot').value
            let newGenre = document.getElementById('editGenre').value

            let finalEdits ={
                actors,
                genre,
                id,
                poster,
                year,
                title: newTitle,
                rating: newRating,
                director: newDirector,
                plot: newPlot,
                genre: newGenre
            }
            editMovie(finalEdits, id);
            // HERE WE CALL EDIT METHOD
        })


    })

    contentDisplay.setAttribute('class', 'd-flex')

    details.setAttribute('class', 'content-half')

    titleDisplay.setAttribute('class', 'mr-2')
    titleDisplay.innerText = title

    ratingDisplay.innerText = rating

    star.setAttribute('class', 'far fa-star')

    directorDisplay.setAttribute('class', 'mt-3')
    directorDisplay.innerText = 'Director(s): ' + director
    genreDisplay.setAttribute('class', 'mt-3')
    genreDisplay.innerText = 'Genre(s): ' + genre


    plotDisplay.setAttribute('class', 'content-half')
    plotDisplay.innerText = plot

    buttonsDisplay.setAttribute('class', 'd-flex justify-content-around')

    // ASSEMBLY
    details.appendChild(titleDisplay)
    details.appendChild(ratingDisplay)
    details.appendChild(star)
    details.appendChild(directorDisplay)
    details.appendChild(genreDisplay)

    contentDisplay.appendChild(details)
    contentDisplay.appendChild(plotDisplay)

    buttonsDisplay.appendChild(deleteButton)
    buttonsDisplay.appendChild(editButton)

    body.appendChild(contentDisplay)
    body.appendChild(buttonsDisplay)

    document.getElementById('movie').appendChild(body)
}

function getMovies() {
    fetch(url).then(function (response) {
        return response.json()
    }).then(function (movies) {
        localMovies = movies
        document.getElementById('loading').style.display = 'none'

        console.log(movies)
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

const addMovie = (movie) => {
    const optionAdd = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    }
    fetch(url, optionAdd).then(function(response){
        generateMovieDisplay(movie)

        document.getElementById('newTitle').value = ''
        document.getElementById('newDirector').value = ''
        document.getElementById('newRating').value = ''
        document.getElementById('newPlot').value = ''
        document.getElementById('newGenre').value = ''
    }).catch( error => {
        alert('Failed to add')
        console.error(error)
    });
}

// EDITING EDITING EDITING EDITING EDITING

const editMovie = (movie, id) => {
    const optionEdit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    }
    fetch(url + `/${id}`, optionEdit).then(function(response){
        updateIndividual(movie, id)
    }).catch( error => {
        alert('Failed to Edit')
        console.error(error)
    });
}

const updateIndividual = (movie, id) => {
    $('#movie').html("<div class= \"container\" id=\"movie\">\n" +
        "        <div id=\"loading\">\n" +
        "            <h2 id=\"load-message\">LOADING...</h2>\n" +
        "        </div>\n" +
        "    </div>")
    getMovies()
}

const deleteMovie = (id) => {
    const optionDelete = {
        method:'DELETE'
    }

    fetch( url + `/${id}`, optionDelete).then(function(response){
        document.getElementById(`${id}`).style.display = 'none'
    }).catch( error => {
        alert('Failed to Delete')
        console.error(error)
    });
}

// NEW MOVIE BUTTON
document.getElementById('newMovieSubmit').addEventListener('click', function(e){
    e.preventDefault()

    var title= document.getElementById('newTitle').value
    if(title === ''){
        title = 'No Title listed'
    }

    var director= document.getElementById('newDirector').value
    if(director === ''){
        director = 'No Director listed'
    }

    var rating= document.getElementById('newRating').value
    if(rating === ''){
        rating = 'No rating listed'
    }

    var plot= document.getElementById('newPlot').value
    if(plot === ''){
        plot = 'No Plot provided'
    }

    var genre = document.getElementById('newGenre').value
    if(genre === ''){
        genre = 'No Genre provided'
    }

    let movie = {
        title,
        director,
        rating,
        plot,
        genre
    }

    addMovie(movie)
})

const sortByRatings = () => {
    let ratingsSort = localMovies.sort(function(a, b){
        return parseInt(a.rating) - parseInt(b.rating)
    })
    $('#movie').html("<div class= \"container\" id=\"movie\">\n" +
        "    </div>")
    ratingsSort.map(movie => {
        generateMovieDisplay(movie)
    })
}

const sortByTitle = () => {
    let titleSort = localMovies.sort(function(a, b){
        let titleA = a.title.toUpperCase()
        let titleB = b.title.toUpperCase()
        if(titleA < titleB){
            return -1;
        }
        if(titleA > titleB){
            return 1;
        }
        return 0
    })

    $('#movie').html("<div class= \"container\" id=\"movie\">\n" +

        "    </div>")

    titleSort.map(movie => {
        generateMovieDisplay(movie)
    })
}

document.getElementById('rating-sort').addEventListener('click', sortByRatings)
document.getElementById('title-sort').addEventListener('click', sortByTitle)

const searchByTitle = () => {
    $('#movie').html("<div class= \"container\" id=\"movie\">\n" +

        "    </div>")
    var searchText = document.getElementById('search').value

    let searchedArray = localMovies.filter(movie => {
        return movie.title.includes(searchText)
    })

    searchedArray.map(result => generateMovieDisplay(result))
}

document.getElementById('searchButton').addEventListener('click', searchByTitle)

const searchByGenre = () => {
    $('#movie').html("<div class= \"container\" id=\"movie\">\n" +

        "    </div>")
    var searchText = document.getElementById('genre-search').value


    let searchedArray = localMovies.filter(movie => {
        if(movie.genre){
            return movie.genre.toLowerCase().includes(searchText.toLowerCase())
        }
    })
    searchedArray.map(result => generateMovieDisplay(result))
}

document.getElementById('searchGenreButton').addEventListener('click', searchByGenre)

// deleteMovie(10)
// editMovie(editedMovie)
// addMovie(newMovie)