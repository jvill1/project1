var totalExpenses=0;
if(JSON.parse(localStorage.getItem('expenses'))!=null){
    var expenses=JSON.parse(localStorage.getItem('expenses'));
}
else{
    var expenses=[]
}
console.log(expenses)
var monthlyIncome=localStorage.getItem('income');;
var moneyLeft;
var savePercent = localStorage.getItem('savePercent');
$('#savingSlider').val(savePercent)
$('#savingInput').val(savePercent)
$('#income').val((monthlyIncome/parseFloat($('#frequency').val())))

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
        
        printIncome();
        localStorage.setItem('income',monthlyIncome);
    }
    else{
        $('#moneyLeft').text('');
       
    }
}
function printIncome(){
    if(!isNaN(parseFloat(monthlyIncome))){
    moneyLeft = (monthlyIncome-totalExpenses);
    $('#moneyLeft').html('Your monthly income is $'+parseFloat(monthlyIncome).toFixed(2)+ '<br>You have $'+moneyLeft.toFixed(2)+' left this month');
    }
    else{
        $('#moneyLeft').html('Please set an income');
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
    localStorage.setItem('expenses', JSON.stringify(expenses));
    logExpenses();
    setIncome();
    calcSavings();
}
function logExpenses(){
    totalExpenses=0;
    $('#expenseList').html('')
    for(i in expenses){
        var amount =  expenses[i].amount;
        totalExpenses+=parseFloat(amount);
        
        $('#expenseList').append($('<p>').html('<button id='+i+' class=\'remThis btn-outline-danger btn btn-sm\'>X</button> '+expenses[i].name+': $'+parseFloat(amount).toFixed(2)))
    }
}
$(document).on('click','.remThis',function(){
    expenses.splice($(this).attr('id'),1);
    logExpenses();
    setIncome();
    calcSavings();
    localStorage.setItem('expenses', JSON.stringify(expenses));
    console.log(localStorage.getItem('expenses'))
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
    if(!isNaN(parseFloat(monthlyIncome))){
    localStorage.setItem('savePercent', $('#savingSlider').val());
    savePercent=localStorage.getItem('savePercent')
    console.log(savePercent)
   var saveThis= (moneyLeft*(savePercent/100)).toFixed(2);
    $('#theSavings').text('Put $'+saveThis+' into savings this month')
    console.log(moneyLeft)
    }
    else{
        $('#theSavings').text('Make sure you have filled in an income and percent')
    }
}

logExpenses();
printIncome();
calcSavings();