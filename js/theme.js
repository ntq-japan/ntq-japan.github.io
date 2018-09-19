var blogTitle = 'Nơi tổng hợp những bài viết về chuyện nghề | NTQ Solution JSC\'s Blog';

hljs.initHighlightingOnLoad();
marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

var open = function(url) {
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest;
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject();
            }
        };

        xhr.onerror = function() {
            reject();
        }

        xhr.send();
    });
};

var launch = function() {
    var body = document.querySelector(".main");
    var file = window.location.hash.replace(/#/g, '');
    if (body != undefined) {
        if (file) {
            open('./posts/' + file + '.md').then(function(data){
                if (data != '') {
                    var lines = data.split('\n');
                    var title = blogTitle;
                    if (lines.length > 0) {
                        title = lines[0].replace(/#/g, '') + ' | ' + blogTitle;
                    }
                    body.innerHTML = marked(data);
                    document.title = title;
                }
            });
        } else {
            open('./posts/home.md').then(function(data){
                document.title = blogTitle;
                body.innerHTML = marked(data);
            });
        }
    }
};

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                /*remove the attribute, and call this function once more:*/
                elmnt.removeAttribute("w3-include-html");
                includeHTML();
            }
        } 
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
    }
  }
}

var startup = function(isLaunch) {
    includeHTML();
    if (isLaunch) {
        launch();
    }
};