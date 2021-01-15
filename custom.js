let url = "https://fluttering-achieved-syringa.glitch.me/movies"
let localMovies = []

const generateMovieDisplay = ({
                                  title,
                                  rating,
                                  director = "No Director listed",
                                    id
    }) => {
    // make ELEMENTS
    let body = document.createElement('div')
    let firstLine = document.createElement('div')

    let titleDisplay = document.createElement('p')
    let ratingDisplay = document.createElement('span')

    let directorDisplay = document.createElement('p')
    let deleteButton = document.createElement('button')
    let editButton = document.createElement('button')

    // ADD CONTENT
    body.setAttribute('class' , 'single-movie')
    body.setAttribute('id', id)

    deleteButton.innerText = 'Delete?'
    deleteButton.setAttribute('class', 'btn btn-primary')
    deleteButton.addEventListener("click",function(){
        console.log(id)
        deleteMovie(id)
    })

    editButton.innerText = "Edit"
    editButton.setAttribute('class', 'btn btn-success')
    editButton.setAttribute('data-toggle', '#modal')
    editButton.setAttribute('data-target', '#editModal')
    editButton.setAttribute('type', 'button')
    // data-toggle="modal"
    // data-target="#editModal"
    editButton.addEventListener("click",function(){
        $('#editModal').modal('show')
        console.log(id)
        let info = localMovies.filter(movie => movie.id === id)


        document.getElementById('editTitle').value = info[0].title
        document.getElementById('editRating').value = info[0].rating
        document.getElementById('editDirector').value = info[0].director
        document.getElementById('editPlot').value = info[0].plot

        document.getElementById('editMovieSubmit').addEventListener('click', function(e){
            e.preventDefault()
            console.log('BOO-yah!')
            let {actors, genre, poster, year} = info[0]

            let newTitle = document.getElementById('editTitle').value
            let newRating = document.getElementById('editRating').value
            let newDirector = document.getElementById('editDirector').value
            let newPlot = document.getElementById('editPlot').value

            let finalEdits ={
                actors,
                genre,
                id,
                poster,
                year,
                title: newTitle,
                rating: newRating,
                director: newDirector,
                plot: newPlot
                // newTITLE
            }
            editMovie(finalEdits, id);
            // HERE WE CALL EDIT METHOD
            console.log(finalEdits)
        })


    })

    titleDisplay.innerText = title

    ratingDisplay.innerText = rating

    directorDisplay.innerText = director

    // ASSEMBLY
    firstLine.appendChild(titleDisplay)
    firstLine.appendChild(ratingDisplay)

    body.appendChild(firstLine)
    body.appendChild(directorDisplay)
    body.appendChild(deleteButton)
    body.appendChild(editButton)

    document.getElementById('movie').appendChild(body)

}

function getMovies() {
    fetch(url).then(function (response) {
        // console.log(response)
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
        console.log(response)
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
        console.log(response)
        updateIndividual(movie, id)
    }).catch( error => {
        alert('Failed to Edit')
        console.error(error)
    });
}

const updateIndividual = (movie, id) => {
    // document.getElementById(`${id}`).style.background = 'blue'
    // document.querySelector('#movie').innerHTML = ''
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
        // generateMovieDisplay()
        console.log(response.json())
    }).catch( error => {
        alert('Failed to Delete')
        console.error(error)
    });
}

// NEW MOVIE BUTTON
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


// console.log(titleSort);




// deleteMovie(10)
// editMovie(editedMovie)
// addMovie(newMovie)