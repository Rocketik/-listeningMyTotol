function moviePage(id) {
    let homeMain = document.querySelector(".home-main");
    homeMain.style.display = "none";

    let url = host + routes.movie(`${id}`);
    request(url, "get", { api_key: apiKey, language: "ru" }, drawMoviePage)
}

function drawMoviePage(data) {
    let moviePage = document.createElement("div");
    moviePage.classList.add("main");
    moviePage.classList.add("movie-page");
    document.body.appendChild(moviePage);

    let back = document.createElement("h1");
    back.innerHTML = "↖ Back to Search";
    back.classList.add("back");
    moviePage.appendChild(back);
    back.addEventListener("click",(e)=>{
        backSearch(moviePage)
    })

    let pageParent = document.createElement("div");
    pageParent.classList.add("movie-page_parent");
    moviePage.appendChild(pageParent);

    drawTop(data, pageParent);
    drawBottom(data, pageParent);

    setTimeout(()=>{
        moviePage.style.opacity = 1;
    },10)
}

/**
 * 
 * @param {*} data tvyalner menak array
 * @param {*} pageParent 
 */

function drawTop(data, pageParent) {


    //top
    let moviePageTop = document.createElement("div");
    moviePageTop.classList.add("movie-page_top");
    let bgSrc = imageHost + ("w" + 500) + data.backdrop_path;

    moviePageTop.style.backgroundImage = `url(${bgSrc}),url(${"assets/images/no-bg.jpg"})`
    pageParent.appendChild(moviePageTop);

    //poster
    let moviePageTopPoster = document.createElement("div");
    moviePageTopPoster.classList.add("movie-page_top_poster");
    moviePageTop.appendChild(moviePageTopPoster);

    let poster = document.createElement("img");
    let postSrc;
    if (data.poster_path != null) {
        postSrc = imageHost + ("w" + 200) + data.poster_path;
    } else {
        postSrc = "assets/images/no-poster.jpg"
    }

    poster.width = 200;
    poster.height = 300;
    poster.src = postSrc;
    moviePageTopPoster.appendChild(poster);

    //info
    let moviePageTopInfo = document.createElement("div");
    moviePageTopInfo.classList.add("movie-page_top_info");
    moviePageTop.appendChild(moviePageTopInfo);

    let title = document.createElement("h1");
    let h1Inner = `${data.title} <span class="film-data">${data.release_date.slice(0, data.release_date.indexOf("-"))}</span>`
    title.innerHTML = h1Inner;
    moviePageTopInfo.appendChild(title);

    let text = document.createElement("p");
    text.innerHTML = data.overview;
    moviePageTopInfo.appendChild(text)
}
function drawBottom(data, pageParent) {
    let moviePageBottom = document.createElement("div");
    moviePageBottom.classList.add("movie-page_bottom");
    pageParent.appendChild(moviePageBottom);

    //credits
    let moviePageBottomCredits = document.createElement("div");
    moviePageBottomCredits.classList.add("movie-page_bottom_credits");
    moviePageBottom.appendChild(moviePageBottomCredits);





    let creditsUrl = host + routes.movie([data.id, "credits"]);
    request(creditsUrl, "get", { api_key: apiKey, language: "ru" }, (creditsData) => {
        let actersInf = creditsData.cast;

        if (actersInf.length > 0) {
            let creditsTittle = document.createElement("h1");
            creditsTittle.innerHTML = "Credits";
            moviePageBottomCredits.appendChild(creditsTittle);

            // acters
            let acters = document.createElement("div");
            acters.classList.add("acters");
            moviePageBottomCredits.appendChild(acters);
            console.log(actersInf);
            for (let i = 0; i < 20; i++) {
                let acters_item = document.createElement("div");
                acters_item.classList.add("acters_item");
                acters.appendChild(acters_item);

                let acters_item_elemImg = document.createElement("div");
                acters_item_elemImg.classList.add("acters_item_elem");
                acters_item.appendChild(acters_item_elemImg);

                let acters_item_elemImage = document.createElement("img");
                let acterImgUrl = imageHost + ("w" + 200) + actersInf[i].profile_path;
                acters_item_elemImage.src = acterImgUrl;
                acters_item_elemImage.onerror = () => {
                    acters_item_elemImage.src = "assets/images/no-poster.jpg";
                }
                acters_item_elemImage.width = 200;
                acters_item_elemImage.height = 300;
                acters_item_elemImg.appendChild(acters_item_elemImage);

                let acters_item_elemText = document.createElement("div");
                acters_item_elemText.classList.add("acters_item_elem");
                acters_item.appendChild(acters_item_elemText);

                let acters_item_elemP = document.createElement("p");
                acters_item_elemP.innerHTML = actersInf[i].name;
                acters_item_elemText.appendChild(acters_item_elemP);


            }
        }



    })

    // videos   


    let videosUrl = host + routes.movie([data.id, "videos"]);
    request(videosUrl, "get", { api_key: apiKey, language: "ru" }, (videosData) => {
        let videosInf = videosData.results;
        let moviePageBottomVideos;
        let videosTittle;
        let videos
        if(videosInf.length > 0){
            moviePageBottomVideos = document.createElement("div");
            moviePageBottomVideos.classList.add("movie-page_bottom_videos");
            moviePageBottom.appendChild(moviePageBottomVideos);

            videosTittle = document.createElement("h1");
            videosTittle.innerHTML = "Videos";
            moviePageBottomVideos.appendChild(videosTittle);


            videos = document.createElement("div");
            videos.classList.add("videos");
            moviePageBottomVideos.appendChild(videos);
        }
        for (let i = 0; i < videosInf.length; i++) {
            let video_item = document.createElement("div");
            video_item.classList.add("video_item");
            video_item.style.backgroundImage = `url(${"https://img.youtube.com/vi/" + videosInf[i].key + "/0.jpg"})`;
            videos.appendChild(video_item);

            let videoPlayImage = document.createElement("img");
            videoPlayImage.src = "assets/images/play.png";
            videoPlayImage.width = 70;
            videoPlayImage.height = 50;
            video_item.appendChild(videoPlayImage)
            video_item.onclick = (e) => {
                if (e.target == videoPlayImage || e.target == video_item) {
                    videoBlur();
                    let videoPlayer = document.createElement("iframe");
                    if (document.querySelector("iframe") == null) {
                        let videoPlayer = document.createElement("iframe");
                        videoPlayer.width = 560;
                        videoPlayer.height = 315;
                        videoPlayer.classList.add("video-player");
                        videoPlayer.src = "https://www.youtube.com/embed/" + videosInf[i].key;
                        document.body.appendChild(videoPlayer)
                    } else {
                        document.querySelector(".video-player").remove()
                        closeVideoBlur()
                    }

                    document.onclick = (e) => {
                        let delVideo = document.querySelector(".video-player");
                        console.log();
                        if (e.target != delVideo && e.target != video_item && e.target != videoPlayImage) {
                            delVideo.remove()
                            closeVideoBlur()
                        }

                    }
                }


            }

        }


    })
}

function videoBlur() {
    document.querySelector(".movie-page").classList.add("blur");
    document.body.classList.add("no-scroll")
}

function closeVideoBlur(main) {
    document.querySelector(".movie-page").classList.remove("blur");
    document.body.classList.remove("no-scroll")
}

function backSearch(moviePage){

    moviePage.remove();

    let homeMain = document.querySelector(".home-main");
    homeMain.style.display = "block";
    let noFilm = document.createElement("h1");
        noFilm.classList.add("no-movie");
        noFilm.innerHTML = "There are no movies";

    let movies = document.querySelector(".movies");
    movies.innerHTML = "";
    movies.appendChild(noFilm);
    homeMain.style.opacity = 0;
    setTimeout(()=>{
        homeMain.style.opacity = 1;
    },00)
}