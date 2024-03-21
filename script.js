console.log(generateSequence(5));
displaySequence(1);
function generateSequence( totalSteps )
{
	var sequence = [0,0,0,0,0,0,0,0,0];
	for(let step = 1; step<=9;){
		var rand = Math.round(Math.random()*9);
		if(sequence[rand] == 0){
			sequence[rand] = step;
			step++;
		}
	}
	return sequence;
}
function displaySequence(step, sequence)
{
	if(step<=9){
		var cell = document.getElementById(step);
		cell.style.animation = "ping 1.5s";
		step++;
		setTimeout(displaySequence, 1500, step, 1);
	}
}