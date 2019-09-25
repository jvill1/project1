var totalExpenses=0;
var expenses=[];
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
        var monthlyIncome = $('#income').val()*$('#frequency').val();
        $('#moneyLeft').text('You have $'+(monthlyIncome-totalExpenses).toFixed(2)+' left this month');
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
$('#addExpense').on('click','.remThis',function(){
    expenses.splice($(this).attr('id'),1);
    logExpenses();
})