function displayFinanceInfo(stockSymbol) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bloomberg-market-and-financial-news.p.rapidapi.com/stock/get-statistics?id=aapl%3Aus",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com",
            "x-rapidapi-key": "049282e5b3mshe9b4061aabe8defp165a04jsn98720904a3d7"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);

    var aDiv = $('<div>')
    for (var i=0; i < response.result[0].table.length; i++){
       if(i!=response.result[0].table.length-1){
        aDiv.append(response.result[0].table[i].name+": "+response.result[0].table[i].value+"   |   ");
       }
       else{
        aDiv.append(response.result[0].table[i].name+": "+response.result[0].table[i].value);
       }
    }
    $("#tick-scroll").html(aDiv)
        

    
});

    };
displayFinanceInfo();