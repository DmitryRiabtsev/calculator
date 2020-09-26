var numbers = document.querySelectorAll(".number"); //переменная для ввода цифр 
var operations = document.querySelectorAll(".operator"); //lдля операций
var decimalBtn = document.getElementById("decimal"); //для десятичной точки
var clearBtns = document.querySelectorAll('.clear')
var resultBtn = document.getElementById("result"); //для результата
var display = document.getElementById("display"); 
var quadrant = document.getElementById("quadrant");
var MemoryCurrentNumber = 0; //память текущего ввода, по умолчанию 0
var MemoryNewNumber = false; // показывает ввели мы новое число или нет(по умолчанию нет)
var MemoryPendingOperation = ""; // память последней сохраненной операции

for (var i = 0; i < numbers.length; i++)  { // счетчик нажатий на кнопки ввода
	var numberBtn = numbers[i]; //запись ввода в массив
	numberBtn.addEventListener("click", function (e) {
		numberPress(e.target.textContent);
		// body...
	}); // происходит событие при click на number, происходит вызов функции		 
};

for (var i = 0; i < operations.length; i++)  { // счетчик нажатий на кнопки ввода
	var operator = operations[i]; //запись ввода в массив
	operator.addEventListener("click", function (e) {
		operation(e.target.textContent);
	});// происходит событие при click на number, происходит вызов функции  
};

for (var i = 0; i < clearBtns.length; i++)  { // счетчик нажатий на кнопки ввода
	var clearBtn = clearBtns[i]; //запись ввода в массив
	clearBtn.addEventListener("click", function (e) {
	clear(e.srcElement.id);
	});// происходит событие при click на number, происходит вызов функции  
};

decimalBtn.addEventListener("click", decimal);

resultBtn.addEventListener("click", result);

//quadrant.addEventListener("click",)

function numberPress (num) {   //кнопки ввода
	if(MemoryNewNumber){
		display.value = num;
		MemoryNewNumber = false;
	} else{
		if(display.value === '0'){
			display.value = num;
	} else{
		display.value += num;
	 	};
	};
};

function operation (oper) {  //операции
   var localOperationMemory =  display.value; //сохранение текущего значения ввода
    if (localOperationMemory>= "0") {
    	if(oper === "√x"){
		localOperationMemory = Math.sqrt(parseFloat(localOperationMemory));
		MemoryNewNumber = false;
	}

	if(oper === "X²"){
		localOperationMemory = localOperationMemory ** 2;
		MemoryNewNumber = false;
	}

	if(MemoryNewNumber && MemoryPendingOperation !== "="){
		display.value = MemoryCurrentNumber;
		MemoryPendingOperation = oper;
	}else{
		MemoryNewNumber = true;
		if(MemoryPendingOperation === "+"){
			MemoryCurrentNumber += parseFloat(localOperationMemory);
		} else if(MemoryPendingOperation=== "-"){
			MemoryCurrentNumber -= parseFloat(localOperationMemory);
		}else if(MemoryPendingOperation === "*"){
			MemoryCurrentNumber *= parseFloat(localOperationMemory);
		}else if(MemoryPendingOperation === "/"){
			MemoryCurrentNumber /= parseFloat(localOperationMemory);
		}else{
			MemoryCurrentNumber = parseFloat(localOperationMemory);
			
		};
		
		display.value = Math.round((MemoryCurrentNumber)*10000)/10000;
		MemoryPendingOperation = oper;
	}; 
		}else{
    	display.value = "NaN";
    };  
};

function decimal(argument) {  //десятичная точка
	var localDecimalMemory = display.value;
	if (MemoryNewNumber) {
		localDecimalMemory = "0.";
		MemoryNewNumber = false;
	} else {
		 if (localDecimalMemory.indexOf('.') === -1) {
        localDecimalMemory += '.';
     };
	};
	display.value = localDecimalMemory;
};

function clear(id) {  //очистка экрана
	if (id === "ce"){
		display.value = "0";
		MemoryNewNumber = true;
	}else if (id === "c"){
		display.value = "0";
		MemoryNewNumber = true;
		MemoryCurrentNumber = 0;
		MemoryPendingOperation = "";
	};	
};