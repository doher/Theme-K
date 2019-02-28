'use strict';

function goContents() {
    location.hash = 'contents';
}

window.addEventListener('hashchange', function loadNewPage() {
    var hash = location.hash.substr(1);

    loadData(hash);
}, false);

function loadData() {
    $.ajax("articles.json", {
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const h1 = document.querySelector('.heading'),
                mainContext = document.querySelector('.main-context'),
                ul = document.createElement('ul');

            h1.innerHTML = data.name;

            console.log(data.name);

            for (const key in data.articles) {
                if (data.articles.hasOwnProperty(key)) {
                    const element = data.articles[key],
                        li = document.createElement('li'),
                        a = document.createElement('a');

                    a.innerHTML = element;
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            }

            mainContext.appendChild(ul);
        }
    });
}