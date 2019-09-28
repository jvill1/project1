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
  