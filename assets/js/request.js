

function buildGetQuery(object) {
    let query = "";
    for (let key in object) {
        query += key + "=" + object[key] + "&";
    }

    return "?" + query.substring(0, query.length - 1);
}
function request(url, method, params, takeInf, errorFunc, progressFunc) {
    let xmlhttp = new XMLHttpRequest();

    if (method.toLowerCase() === "get") {
        xmlhttp.open(method, url + buildGetQuery(params));
        xmlhttp.send();
    } else {
        xmlhttp.open(method, url);
        xmlhttp.send(JSON.stringify(params));
    }

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                takeInf(JSON.parse(xmlhttp.responseText));
            }else {
                alert(JSON.parse(xmlhttp.responseText).status_message);
             }
        }
    }

    xmlhttp.onerror = function () {
        if (typeof errorFunc === 'function') {
            errorFunc();
        } else {
            alert("Request error");
        }
    }

    xmlhttp.onprogress = function (event) {
        if (typeof progressFunc === 'function') {
            let percent = (event.loaded / event.total) * 100
            progressFunc(percent, event.loaded, event.total);
        }
    }


}

