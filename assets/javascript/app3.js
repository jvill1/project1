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

function saveStock(stock) {
    var queryURLTwo = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis?symbol=" + myStocks[stock].stockSymbol
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
  
    $.ajax(settings).done(function (response,) {
      console.log(response);
      console.log(JSON.stringify(myStocks)+'<br>'+stock)

     var currentP =  response.financialData.currentPrice.fmt;
     
     var netGain =(currentP * myStocks[stock].numShares)-(myStocks[stock].numShares*myStocks[stock].purchasePrice);
      $("#stockList").append('<button id='+stock+' class=\'btn btn-outline-danger killStock\'>X</button> '+myStocks[stock].stockSymbol + " Netgain: "+ netGain.toFixed(2) + "<br>");
    
  
  
    });
  
  }
if(JSON.parse(localStorage.getItem('myStocks'))!=null){
  var myStocks = JSON.parse(localStorage.getItem('myStocks'));
}
else{
  var myStocks = [];
}
  $("#saveStock").on("click", function(){
    var symb= $("#stocksOwned").val().trim()
    var shares = $("#sharesOwned").val().trim()
    var price =$("#purchasePrice").val().trim()
    var aStock = {'stockSymbol':symb, 'numShares':shares, 'purchasePrice':price}
    myStocks.push(aStock);
    localStorage.setItem('myStocks',JSON.stringify(myStocks));
    addStocks();
  } );

$(document).on('click','.killStock',function(){
  myStocks.splice($(this).attr('id'),1);
  localStorage.setItem('myStocks',JSON.stringify(myStocks));
  console.log(JSON.stringify(myStocks)+'<br>'+stock)
   addStocks();
})  

function addStocks () {

  
$("#stockList").html('');
for(stock in myStocks){

saveStock(stock);
}

}
$(document).ready(addStocks());