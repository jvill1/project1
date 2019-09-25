var totalExpenses=0;
var expenses=[];
var monthlyIncome;
var moneyLeft;
function otherExpense(){
    if($('#expenses').val()=='Other'){
        $('#other').css('display','inline')
    }
    else{
        $('#other').css('display','none')
    }
}
function setIncome(){
    if($('#income').val()!=''){
        monthlyIncome = $('#income').val()*$('#frequency').val();
        moneyLeft = (monthlyIncome-totalExpenses);
        $('#moneyLeft').text('You have $'+moneyLeft.toFixed(2)+' left this month');
    }
    else{
        $('#moneyLeft').text('');
    }
}
function addExpense(){
    if($('#expenses').val()=='Other'){
        var thisObj = {name:$('#other').val(), amount:$('#amount').val()}
        expenses.push(thisObj)
        for(i in expenses){
            console.log(expenses[i])
        }
    }
    else{
        var thisObj = {name:$('#expenses').val(), amount:$('#amount').val()}
        expenses.push(thisObj)
        for(i in expenses){
            console.log(expenses[i])
        }
    }
    logExpenses();
    setIncome();
}
function logExpenses(){
    totalExpenses=0;
    $('#expenseList').html('')
    for(i in expenses){
        var amount =  expenses[i].amount;
        totalExpenses+=parseInt(amount);
        $('#expenseList').append($('<p>').html('<button id='+i+' class=\'remThis btn-outline-danger btn btn-sm\'>X</button> '+expenses[i].name+': $'+parseInt(amount).toFixed(2)))
    }
}
$(document).on('click','.remThis',function(){
    expenses.splice($(this).attr('id'),1);
    logExpenses();
    setIncome();
})
function setSaveInput(){
    $('#savingInput').val($('#savingSlider').val())
    calcSavings()
}
function setSaveSlider(){
    if($('#savingInput').val()!=''){
    $('#savingSlider').val(parseInt($('#savingInput').val()))
    
    }
    else{
        $('#savingSlider').val('15');
    }
    calcSavings()
}
function calcSavings(){
   var saveThis= (moneyLeft*($('#savingSlider').val()/100)).toFixed(2);
    $('#theSavings').text('Put $'+saveThis+' into savings')
    console.log(moneyLeft)
}