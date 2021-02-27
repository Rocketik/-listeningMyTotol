let apiKey = "26607cf2415fbdde2137f5cedc620ff2";

let host = "https://api.themoviedb.org/3";
let imageHost = "https://image.tmdb.org/t/p/";

const routes = {
    search : (id)=>routesFunc(id,"search"),
    movie : (id)=>routesFunc(id,"movie")
}
function routesFunc(id,rout){
    if(!id){
        return `/${rout}`
    }else{
        if(Array.isArray(id)){
            let answer = `/${rout}`;
            for(let i = 0; i < id.length;i++){
                answer+=`/${id[i]}`;
            }
            return answer;
        }else{
            return `/${rout}/${id}`
        }
    }
}