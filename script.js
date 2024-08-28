//NO OUTSIDE SOURCES USED
var count = 1;
var gridlength = 9;
var sequenceLength = 2;
var sequence = [];
init();
// initializes the program, sets up all of the graphics and begins the sequence loop.
function init()
{
	var sequence = generateSequence(sequenceLength);

	//tracker setup
	var tracker = document.getElementById("tracker");
	for(var i =1; i<=sequenceLength; i++)
	{
		var div = document.createElement("div")
		div.id = "t"+i;
		div.className = "step";
		tracker.appendChild(div);
	}

	//display setup
	var displayContainer = document.getElementById("displayContainer");
	for(var i =1; i<=gridlength; i++)
	{
		var div = document.createElement("div")
		div.id = "c"+i;
		div.className = "cell";
		displayContainer.appendChild(div);
	}

	//input setup
	var inputContainer = document.getElementById("inputContainer");
	for(var i =1; i<=gridlength; i++)
	{
		var button = document.createElement("button")
		button.id = i;
		button.class = "button";
		button.onclick = function() {checkInput(this.id,sequence);};
		inputContainer.appendChild(button);
	}

	lockInput(true);
	playSequence(1, sequence);
}
//advances to the next level after the user completes a sequence ie: 2 flashes -> 3 flashes
function nextLevel()
{
	clearAnimations(gridlength, "")
	lockInput(true);

	count = 1;
	sequenceLength++;

	var tracker = document.getElementById("tracker");
	var div = document.createElement("div")
	div.id = "t"+sequenceLength;
	div.className = "step";
	tracker.appendChild(div);
	for(var i =1; i<=gridlength; i++)
	{
		var button = document.getElementById(i);
		button.onclick = function() {checkInput(this.id,sequence);};
	}
	for(var i =1; i<=sequenceLength; i++)
	{
		var step = document.getElementById("t"+i);
		step.style.backgroundColor = "white";
	}
	
	var sequence = generateSequence(sequenceLength);
	playSequence(1, sequence);
}
// generates a random sequence with 'totalSteps' number of steps and returns said sequence
function generateSequence( totalSteps )
{
	sequence = [0,0,0,0,0,0,0,0,0];
	for(let step = 1; step<=totalSteps;){
		var rand = Math.round(Math.random()*9);
		if(sequence[rand] == 0){
			sequence[rand] = step;
			step++;
		}
	}
	return sequence;
}
//recursive method that plays an entire sequence one step at a time. takes parameters step (current step it is on) and sequence.
function playSequence(step, sequence)
{
	clearAnimations(gridlength, "c")
	clearAnimations(sequenceLength, "t")
	
	var pos = 0;
	for(var i = 0; i<sequence.length; i++){
		if(sequence[i]==step)
		{
			pos=i+1;
			break;
		}
		else if(i==sequence.length-1)
		{
			unlockInput();
			return;
		}
	}
	var cell = document.getElementById("c"+pos);
	var trackerStep = document.getElementById("t"+step);
	cell.style.animation = "pingBlue 1s";
	trackerStep.style.animation = "pingGreen 1s";
	step++;
	setTimeout(playSequence, 1500, step, sequence);
}
//checks if the user's input is correct.
function checkInput(id,sequence)
{
	if(sequence[id-1] == count)
	{
		var trackerStep = document.getElementById("t"+count);
		trackerStep.style.backgroundColor = "limegreen";
		
		
		if(count==sequenceLength)
		{
			if(sequenceLength==9)
			{
				alert("You won!");
				return;
			}
			nextLevel();
		}
		else{
			count++;
		}
	}
	else
	{
		lockInput(false);
		j = 9;
		while(j>1)
		{
			try {
				var temp = document.getElementById("t"+j);
				temp.remove();
				j--;
			} catch (error) {
				j--;
			}
		}
		var temp1 = document.getElementById("t"+1);
		temp1.style.backgroundColor = "white";
		count = 1;
		sequenceLength = 1;
		for(var i =1;i<=gridlength;i++)
		{
			var button = document.getElementById(i);
			button.style.animation = "pingRed 1s";
		}
		setTimeout(nextLevel, 800);
	}
}
//locks the input so the user cannot click on the buttons. The param gray is a bool, If true gray out the buttons, if false dont mess with the button's style.
function lockInput(gray){
	
	var inputContainer = document.getElementById("inputContainer");
	if(gray){
		inputContainer.style.backgroundColor = "gray";
		inputContainer.style.opacity = "50%";
	}
	else{
		
		inputContainer.style.background = "rgba(255,255,255,0)";
	}
	for(var i =1; i<=gridlength; i++)
	{
		var button = document.getElementById(i);
		button.style.zIndex = -1;
		button.style.pointerEvents = "none";
	}
}
//unlocks the input so the user can click on the buttons
function unlockInput()
{
	var inputContainer = document.getElementById("inputContainer");
	inputContainer.style.backgroundColor = "black";
	inputContainer.style.opacity = "100%";
	for(var i =1; i<=gridlength; i++)
	{
		var button = document.getElementById(i);
		button.style.zIndex = 0;
		button.style.pointerEvents = "auto";
	}
}
//clears any animations set on elements, so new animations can be played.
function clearAnimations(j, id)
{
	for(var i =1;i<=j;i++)
	{
		var temp = document.getElementById(id+i);
		temp.style.animation = "none";
	}
}