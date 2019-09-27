function stockYear(stockSymbol) {

    var queryURL = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&region=US&symbol=" +
      stockSymbol + "&lang=en&range=1y"
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": queryURL,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "ded0697cd3msh050b2527bad8a96p16ea07jsn43f474e17f08"
      }
    }
    $.ajax(settings).done(function (response) {
      console.log(response);
      var data = {
        labels: [],
        stockHistory: []
      };

      for (i = 0; i < 249; i++) {

        var stockHistory = [];
        data.stockHistory.push(response.chart.result[0].indicators.adjclose[0].adjclose[i]);

      }

       for (i = 0; i < 249; i++) {
        var labels = [];
        data.labels.push([i]);
      }
      //////////////////////////////////////////////////////////////////////////////
      var ctx = document.getElementById('chart').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        //The data for our dataset
        data: {
          labels: data.labels,
         // labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], // this doesnt work as good
          datasets: [{
            label: 'CLOSING PRICE (PAST YEAR)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data.stockHistory
          }]
        },
        options: {}
      });
    });
  }
  ////////////////////////////////////////////////////////////////////////



  function stockWeek(stockSymbol) {

    var queryURLThree =
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&region=US&symbol=" + stockSymbol +
      "&lang=en&range=1mo"
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": queryURLThree,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "ded0697cd3msh050b2527bad8a96p16ea07jsn43f474e17f08"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);

      var data = {
        labels: [],
        stockHistory: []
      };

      for (i = 15; i < 20; i++) {

        var stockHistory = [];
        data.stockHistory.push(response.chart.result[0].indicators.adjclose[0].adjclose[i]);

      }


      //////////////////////////////////////////////////////////////////////////////
      var ctx = document.getElementById('chart-two').getContext('2d');
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        //The data for our dataset
        data: {
          labels: ["M", "T", "W", "R", "F"],
          datasets: [{
            label: 'CLOSING PRICE (PAST WEEK)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data.stockHistory
          }]
        },
        options: {}
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  function stockDetails(stockSymbol) {
    var queryURLTwo = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=" + stockSymbol
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": queryURLTwo,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "ded0697cd3msh050b2527bad8a96p16ea07jsn43f474e17f08"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);

      $("#info").append("Current Price: " + response.financialData.currentPrice.fmt + "<br>");
      $("#info").append("Volume Traded Today: " + response.summaryDetail.volume.longFmt + "<br>");
      $("#info").append("Market Cap: " + response.summaryDetail.marketCap.fmt + "<br>");


    });

  }


  $("#select-stock").on("click", function (event) {

    event.preventDefault();

    var stockSymbol = $("#stock-input").val().trim();
    
    $("#chart").empty();
    $("#chart-two").empty();
    $("#info").empty();
    stockDetails(stockSymbol);
    stockWeek(stockSymbol);
    stockYear(stockSymbol);
    $("#chart").hide();
    
  });
  function changeGraph(){
    if($('#Time-Period').val()=='Last Year'){
        $("#chart-two").empty();
        $("#chart-two").hide();
        $("#chart").show();
        
        
    }
    else{
      $("#chart").empty();
      $("#chart").hide();
      $("#chart-two").show();
    }
    
    }

  $("#Last-Year").hide();