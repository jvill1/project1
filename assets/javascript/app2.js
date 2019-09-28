function displayFinanceInfo(stockSymbol) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bloomberg-market-and-financial-news.p.rapidapi.com/stock/get-statistics?id="+stockSymbol+"%3Aus",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com",
            "x-rapidapi-key": "049282e5b3mshe9b4061aabe8defp165a04jsn98720904a3d7"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);

    });

    };