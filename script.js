var count = 1;
var gridlength = 9;
var sequenceLength = 2;
init();
function init()
{
	var sequence = generateSequence(sequenceLength)

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
		button.onclick = function() {checkInput(this.id,sequence);};
		inputContainer.appendChild(button);
	}

	lockInput();
	playSequence(1, sequence);
}
function nextLevel()
{
	lockInput();

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
	console.log(sequence);
	playSequence(1, sequence);
}
function generateSequence( totalSteps )
{
	var sequence = [0,0,0,0,0,0,0,0,0];
	for(let step = 1; step<=totalSteps;){
		var rand = Math.round(Math.random()*9);
		if(sequence[rand] == 0){
			sequence[rand] = step;
			step++;
		}
	}
	return sequence;
}
function playSequence(step, sequence)
{
	for(var i =1;i<=gridlength;i++)
	{
		var cell = document.getElementById("c"+i);
	
		cell.style.animation = "none";
	}
	for(var i =1;i<=sequenceLength;i++)
	{
		var ts = document.getElementById("t"+i);
	
		ts.style.animation = "none";
	}
	
	var pos = 0;
	for(var i = 0; i<sequence.length; i++){
		if(sequence[i]==step)
		{
			pos=i+1;
			break;
		}
		else if(i==sequence.length-1) //returns out of the function if it searches through the whole sequence
		{
			unlockInput();
			return;
		}
	}
	var cell = document.getElementById("c"+pos);
	var trackerStep = document.getElementById("t"+step);
	cell.style.animation = "ping 1s";
	trackerStep.style.animation = "ping 1s";
	console.log("playing "+ i+": "+step);
	step++;
	setTimeout(playSequence, 1500, step, sequence);
}
function checkInput(id,sequence)
{
	if(sequence[id-1] == count)
	{
		console.log("Correct!");
		var trackerStep = document.getElementById("t"+count);
		trackerStep.style.backgroundColor = "limegreen";
		
		
		if(count==sequenceLength)
		{
			nextLevel();
		}
		else{
			count++;
		}
	}
}
function lockInput(){
	var inputContainer = document.getElementById("inputContainer");
	inputContainer.style.backgroundColor = "gray";
	inputContainer.style.opacity = "50%";
	for(var i =1; i<=gridlength; i++)
	{
		var button = document.getElementById(i);
		button.style.zIndex = -1;
		button.style.pointerEvents = "none";
	}
}
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
