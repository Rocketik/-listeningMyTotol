const movies = document.querySelector(".movies");

let timeOutManage;

searchInput.onkeydown = (e) => {
    if (timeOutManage) {
        clearTimeout(timeOutManage)
    }
    if ((e.code).slice(0, 3) == "Num" || (e.code).slice(0, 3) == "Key") {
        timeOutManage = setTimeout(() => {
            searchFunc();
            timeOutManage = undefined;
        }, 3000)
    }

    if (e.code == "Enter") {
        searchFunc();
        searchInput.value = "";
    }
}


function searchFunc() {
    let queryValue = searchInput.value;
    if (queryValue.length >= 3) {
        let loadingImg = document.createElement("img");
        loadingImg.src = "assets/images/loading.gif";
        loadingImg.width = 100;
        loadingImg.height= 100;
        loadingImg.classList.add("no-movie");
        movies.innerHTML = "";
        movies.appendChild(loadingImg);

        let url = host + routes.search("movie");
        request(url, "get", { api_key: apiKey, query: queryValue,language: "ru" }, drawFilms)
        
    }
    
}

function drawFilms(data) {
    console.log(data);
    let films = data.results;
    movies.innerHTML = "";
    if (data.total_results > 0) {
        for (let i = 0; i < films.length; i++) {
            let movies_item = document.createElement("div");
            movies_item.classList.add("movies_item");
            movies_item.addEventListener("click",(e)=>{
                moviePage(films[i].id)
            })
            movies.appendChild(movies_item);

            let movies_item_elemImg = document.createElement("div");
            movies_item_elemImg.classList.add("movies_item_elem");
            let img = document.createElement("img");
            let imgUrl = imageHost + ("w" + 200) + films[i].poster_path;
            if (films[i].poster_path != null) {
                img.src = imgUrl;
            } else {
                img.src = "assets/images/no-poster.jpg"
            }
            img.width = 200;
            img.height = 300;
            movies_item_elemImg.appendChild(img);

            movies_item.appendChild(movies_item_elemImg);

            let movies_item_text = document.createElement("div");
            movies_item_text.classList.add("movies_item_elem");
            let p = document.createElement("p");
            p.innerHTML = films[i].title;
            movies_item_text.appendChild(p);

            movies_item.appendChild(movies_item_text);


        }
    }else{
        let noFilm = document.createElement("h1");
        noFilm.classList.add("no-movie");
        noFilm.innerHTML = "There are no movies";
        movies.appendChild(noFilm);
    }


}


