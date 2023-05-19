class TwitterFeedModel {
    constructor(id, title, url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }
}

function tryCatch(func, fail) {
    try { 
        return func();
    }
    catch(e) { 
        return fail;
    }
}

function getDropDownLinks(feed) {
    let links = "";
    try {
        $.each(feed.categories, function (i, feedCategory) {
            links += '<li><a class=\"dropdown-item\" href=\"?id='+ feedCategory.id +'\">'+ feedCategory.title +'</a></li>';
        });
        return links;
    }
    catch(e) { 
        console.log(e);
    }
    finally {
        links = "";
    }
}

let twitterFeeds = [];

let queryParams = new URLSearchParams(window.location.search);
let id = queryParams.get("id");

$.ajax({
    url: './assets/dist/json/feeds.json',
    dataType: 'json',
    success: function(json){
        $.each(json, function (i, item) {
            if (item.id == 7 || item.id == 8 || item.id == 9 || item.id == 10 || item.id == 11) {
                $.each(item.categories, function (ii, category) {
                    twitterFeeds.push(new TwitterFeedModel(category.id, category.title, category.url));
                });
            }
            else {
                twitterFeeds.push(new TwitterFeedModel(item.id, item.title, item.url));
            }
            
            $('#feeds').append(
                (item.id == 7 || item.id == 8 || item.id == 9 || item.id == 10 || item.id == 11 ?
                    '<li class=\"nav-item dropdown\">' +
                        '<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                            item.title +
                        '</a>' +
                        '<ul class="dropdown-menu">' +
                            getDropDownLinks(item) +
                        '</ul>' +
                    '</li>'
                :
                    '<li class="nav-item">' + 
                        '<a class="nav-link" href=\"?id='+ item.id +'\">'+ item.title +'</a>' +
                    '</li>'
                )
            );
        });

        let twitterFeed = twitterFeeds.find(element => element.id == (id == '' ? 0 : Number(id)));

        if (twitterFeed != null) {
            $('#feed').append(
                '<a class=\"twitter-timeline\" data-theme=\"dark\" href=\"'+ twitterFeed.url +'?ref_src=twsrc%5Etfw\"></a>' +
                '<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>'
            );
        }
    },
    error: function(json){
        console.error(json);
    }
});