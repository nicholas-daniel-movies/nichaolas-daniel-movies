let url = "https://fluttering-achieved-syringa.glitch.me/movies"

fetch(url).then(function(response){
    // console.log(response)
    return response.json()
}).then(function(movies){
    console.log(movies)
})
