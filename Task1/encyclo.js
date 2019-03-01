'use strict';

document.body.addEventListener('click', function (e) {
    e = e || window.event;
    e.preventDefault();
});

function goContents() {
    location.hash = 'contents';
}

window.onhashchange = loadNewPage;

loadNewPage();

function loadNewPage() {
    var hash = location.hash.substr(1);

    switch (hash) {
        case 'contents':
            loadContentsPage(hash);
            break;

        default:
            loadMainPage();
            break;
    }
}

function loadMainPage() {
    $.ajax("index.html", {
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            document.body.innerHTML = data;
        }
    });
}

function loadContentsPage() {
    $.ajax("articles.json", {
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const h1 = document.querySelector('.heading'),
                mainContext = document.querySelector('.main-context'),
                sectionsList = Object.keys(data.articles),
                namePage = data.name;

            h1.innerHTML = namePage;

            sectionsList.forEach(element => {
                const articles = data.articles[element],
                    ul = document.createElement('ul'),
                    h2 = document.createElement('h2');

                h2.innerHTML = element;
                mainContext.appendChild(h2);

                articles.forEach(element => {
                    const li = document.createElement('li'),
                        a = document.createElement('a');

                    a.setAttribute('href', '#');
                    a.innerHTML = element;

                    li.appendChild(a);
                    ul.appendChild(li);
                    mainContext.appendChild(ul);
                });
            });
        }
    });
}