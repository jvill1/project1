var totalExpenses=0;
if(JSON.parse(localStorage.getItem('expenses'))!=null){
    var expenses=JSON.parse(localStorage.getItem('expenses'));
}
else{
    var expenses=[]
}
if(localStorage.getItem('entertainment')!=null){
    entertainmentBudget=localStorage.getItem('entertainment');
}
else{
    entertainmentBudget=$('#entertainment').val();
}
console.log(expenses)
var monthlyIncome=localStorage.getItem('income');;

var moneyLeft;
var savePercent = localStorage.getItem('savePercent');
$('#savingSlider').val(savePercent);
$('#savingInput').val(savePercent);
$('#income').val((monthlyIncome/parseFloat($('#frequency').val())));
var totalOfEntertainment=0;
var saveThis=((monthlyIncome*(savePercent/100)).toFixed(2));
function otherExpense(){
    if($('#expenses').val()=='Other'){
        $('#other').css('display','inline');
    }
    else{
        $('#other').css('display','none');
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
    // if(!isNaN(parseFloat(monthlyIncome))){
    moneyLeft = ((monthlyIncome-totalExpenses)-saveThis);
    $('#moneyLeft').html('Your monthly income is $'+parseFloat(monthlyIncome).toFixed(2)+ '<br>You have $'+moneyLeft.toFixed(2)+' left this month');
    // }
    // else{
    //     $('#moneyLeft').html('Please set an income');
    // }
}
function addExpense(thing){
    if(thing=='entertainment'){
            var thisStuff=$('#purchases').val().split(' $');
            console.log(thisStuff)
            var thisObj = {name:thisStuff[0], amount:thisStuff[1], type:'btn-outline-primary'}
            expenses.push(thisObj)
            for(i in expenses){
                console.log(expenses[i])
            }
        
        localStorage.setItem('expenses', JSON.stringify(expenses));
        logExpenses('entertainment');
        setIncome();
        calcSavings();
    }
    else{
        if($('#expenses').val()=='Other'){
            var thisObj = {name:$('#other').val(), amount:$('#amount').val(), type:'btn-outline-danger'}
            expenses.push(thisObj)
            for(i in expenses){
                console.log(expenses[i])
            }
        }
        else{
            var thisObj = {name:$('#expenses').val(), amount:$('#amount').val(), type:'btn-outline-danger'}
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
}
function logExpenses(stuff){
    totalExpenses=0;
    totalOfEntertainment=0;
    $('#expenseList').html('')
    for(i in expenses){
        var amount =  expenses[i].amount;
        totalExpenses+=parseFloat(amount);
        
        $('#expenseList').append($('<p>').html('<button id='+i+' class=\'remThis '+expenses[i].type+' btn btn-sm\'>X</button> '+expenses[i].name+': $'+parseFloat(amount).toFixed(2)))
        if(expenses[i].type=='btn-outline-primary'){
            totalOfEntertainment+=parseFloat(amount);
        }
        
    }
    logEntBudget();
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
    $('#savingInput').val($('#savingSlider').val());
    calcSavings();
    console.log('help')
    printIncome();
}
function setSaveSlider(){
    if($('#savingInput').val()!=''){
    $('#savingSlider').val(parseFloat($('#savingInput').val()))
    
    }
    else{
        $('#savingSlider').val('15');
    }
    calcSavings()
    printIncome()
}
function calcSavings(){
    console.log('help2')
    if(!isNaN(parseFloat(monthlyIncome))){
    localStorage.setItem('savePercent', $('#savingSlider').val());
    savePercent=localStorage.getItem('savePercent')
    saveThis=((monthlyIncome*(savePercent/100)).toFixed(2));
    console.log(saveThis)
    $('#theSavings').text('Put $'+saveThis+' into savings this month')
    console.log(moneyLeft)
    }
    else{
        $('#theSavings').text('Make sure you have filled in an income and percent')
    }
}
function setEntertainmentBudget(){
    localStorage.setItem('entertainment', $('#entertainment').val());
}
$('#entertainment').val(localStorage.getItem('entertainment'))
function logEntBudget(){
    $('#leftOfEnter').text('You have $'+($('#entertainment').val()-totalOfEntertainment).toFixed(2)+' left in your Entertainment Budget')
}
logExpenses();
printIncome();
calcSavings();
