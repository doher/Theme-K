'use strict';

let artiles = {};

document.body.addEventListener('click', function (e) {
    e = e || window.event;
    e.preventDefault();

    let item = e.target;

    if (item.getAttribute('data-list')) {
        let article = item.getAttribute('data-list');

        goArticlePage(article);
    }
});

function goContentPage() {
    location.hash = 'content';
}

function goMainPage() {
    location.hash = '';
}

function goArticlePage(article) {
    location.hash = article;
}

window.onhashchange = loadNewPage;

loadNewPage();

function loadNewPage() {
    let hash = location.hash.substr(1),
        isArticle = hash.indexOf('article') >= 0;

    switch (hash) {
        case 'content':
            loadContentPage();
            break;

        default:
            loadMainPage();
            break;
    }

    if (isArticle) {
        loadArticlePage();
    }
}

function loadMainPage() {
    $.ajax("index.html", {
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            document.body.innerHTML = data;
            document.title = 'Main';
        }
    });
}

function loadContentPage() {
    $.ajax('content.html', {
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            const main = document.querySelector('.changed-block');
            main.innerHTML = data;
            document.title = 'Content';

            if (isEmpty(artiles)) {
                $.ajax('articles.json', {
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        artiles = data;

                        createDOMContent(artiles);
                    }
                });
            }

            createDOMContent(artiles);
        }
    });
}

function loadArticlePage() {
    $.ajax("article.html", {
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            const main = document.querySelector('.changed-block'),
                hash = location.hash.substr(1);

            main.innerHTML = data;

            const h1 = document.querySelector('.heading');

            document.title = hash;
            h1.innerHTML = hash;
        }
    });
}

function createDOMContent(artiles) {
    const mainContext = document.querySelector('.main-context');

    for (const key in artiles) {
        const ul = document.createElement('ul'),
            section = document.createElement('section'),
            h2 = document.createElement('h2');

        h2.innerHTML = key.toUpperCase();
        section.appendChild(h2);

        if (artiles.hasOwnProperty(key)) {
            const elements = artiles[key];

            Object.keys(elements).forEach(element => {
                const li = document.createElement('li'),
                    a = document.createElement('a');

                a.setAttribute('href', '#');
                a.setAttribute('data-list', key + '_' + element);

                a.innerHTML = key + '_' + element;

                li.appendChild(a);
                ul.appendChild(li);
                section.appendChild(ul);
            });
        }

        mainContext.appendChild(section);
    }
}

function isEmpty(object) {

    for (const key in object) {
        return false;
    }

    return true;
}
