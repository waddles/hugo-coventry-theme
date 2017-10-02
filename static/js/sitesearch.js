var solrIndex = '/index.json'
    ,searchOverlay = document.querySelector('.navbar-form.search')
    ,searchButton = document.getElementById('search-button')
    ,searchInput = document.getElementById('navbar-search')
    ,searchResults = document.getElementById('search-results')
    ,searchReq = new XMLHttpRequest()
    ,searchData
;

window.addEventListener('keyup', function(event) {
    var keyPressed = event.keyCode;
    if (keyPressed === 83) { // type 's' anywhere to start searching
        searchInput.focus();
    } else if (keyPressed === 27) {
        $('#result-ajax-search').hide();
    }
}, true);

searchButton.addEventListener('click', function(event) {
    $('#result-ajax-search').show();
    searchInput.focus();
}, true);

/* Begin Lunr live search
  for more information on lunr.js, go to http://lunrjs.com/ */
searchInput.addEventListener('keyup', lunrSearch, true);
searchInput.addEventListener('blur', function(){$('#result-ajax-search').hide()}, true);
window.index = lunr(function() {
    this.field('id');
    this.field('url');
    this.field('title', { boost: 50 });
    this.field('subtitle');
    this.field('description');
    this.field('tags',{ boost: 30});
    this.field('content', { boost: 10 });
});

$('.searchbox').addClass("s-loading");
searchReq.open('GET', solrIndex, true);
searchReq.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        searchData = JSON.parse(this.response);
        searchData.forEach(function(obj, index) {
            obj['id'] = index;
            window.index.add(obj);
        });
    } else {
        console.log("Failed to download " + solrIndex);
    }
    $('.searchbox').removeClass("s-loading");
}
searchReq.onerror = function() {
    console.log("Error when attempting to load " + solrIndex);
    $('.searchbox').removeClass("s-loading");
}
searchReq.send();

function lunrSearch(event) {
    var query = searchInput.value;
    if (query.length === 0) {
        searchResults.innerHTML = '';
    }
    if ((event.keyCode !== 9) && (query.length > 2)) {
        var matches = window.index.search(query);
        displayResults(matches);
    }
}

function displayResults(results) {
    var inputVal = searchInput.value;
    if (results.length) {
        searchResults.innerHTML = '';
        results.forEach(function(result) {
            var item = window.searchData[result.ref];
            var resHtml = '<li class="result-item">';
            resHtml += item.thumbnail ? '<img class="search-item-img" src="' + item.thumbnail + '" />' : '<img class="search-item-img" src="/images/post-image.jpg" />';
            resHtml += '<a class="search-item-title" href="' + item.ref + '">' + item.title + '</a>';
            resHtml += item.description ? '<span class="search-item-description">' + item.description + '</span>' : '';
            resHtml += '<div class="result-item-more">';
            if (item.categories) {
                resHtml += '<ul class="category-list"><li><i class="fa fa-folder-open"></i><li>';
                for (var i = 0; i < item.categories.length; i++) {
                    resHtml += '<li><a href="/categories/' + item.categories[i].split(' ').join('-').toLowerCase() + '" class="category">' + item.categories[i] + '</a>,</li>';
                }
                resHtml += '</ul>';
            }
            if (item.tags) {
                resHtml += '<ul class="tag-list"><li><i class="fa fa-tags"></i></li>';

                for (var i = 0; i < item.tags.length; i++) {
                    resHtml += '<li><a href="/tags/' + item.tags[i].split(' ').join('-').toLowerCase() + '" class="tag">' + item.tags[i] + '</a>,</li>';
                }
                resHtml += '</ul>';
            }
            resHtml += '</div>';
            searchResults.innerHTML += resHtml + '</li>';
        })
    } else {
        searchResults.innerHTML = '<li class="result-item none">No results found for <span class="search-term">' + inputVal + '</span></li>';
    }
    $('#result-ajax-search').show();
    $(".result-item").hover(function () {
        $(this).find(".result-item-more").show().animate({ opacity: "1" }, { queue: false });
    }, function () {
        $(this).find(".result-item-more").hide().animate({ opacity: "0" }, { queue: false });
    });
}
