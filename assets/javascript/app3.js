function displayFinanceInfo(stockSymbol) {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bloomberg-market-and-financial-news.p.rapidapi.com/stock/get-statistics?id="+ stockSymbol+"%3Aus",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com",
            "x-rapidapi-key": "049282e5b3mshe9b4061aabe8defp165a04jsn98720904a3d7"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        $('.ticker-item').css('color','#4898EE')
    var aDiv = $('<div>')
    for (var i=0; i < response.result[0].table.length; i++){
       if(i!=response.result[0].table.length-1){
        aDiv.append(response.result[0].table[i].name+": "+response.result[0].table[i].value+"   |   ");
       }
       else{
        aDiv.append(response.result[0].table[i].name+": "+response.result[0].table[i].value);
       }
    }
    console.log(aDiv.text().length);
    console.log(aDiv)
    var speed=aDiv.text().length*.05;
    $('.ticker-move').css('animation-duration', speed+"s")
    $("#tick-scroll").html(' ')
    $("#tick-scroll").html(aDiv)
        

    
});

    };

function saveStock(stockSymbol) {
    var queryURLTwo = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=" + stockSymbol
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": queryURLTwo,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "98c0bc8010mshe66d581fddfbb96p1cfc58jsn0ab8541f5fa2"
      }
    }
  
    $.ajax(settings).done(function (response) {
      console.log(response);
        

     var currentP =  response.financialData.currentPrice.fmt;
     var purchasePrice = $("#purchasePrice").val().trim();
     var sharesOwned = $("#sharesOwned").val().trim();
     var netGain =(currentP * sharesOwned)-(sharesOwned*purchasePrice);
      $("#stockList").append(stockSymbol + " netgain = "+ netGain + "<br>");
    
  
  
    });
  
  }

  $("#saveStock").on("click", function (event) {

    event.preventDefault();
  
    var stockSymbol = $("#stocksOwned").val().trim();
  
  saveStock(stockSymbol);
   

  });
  
