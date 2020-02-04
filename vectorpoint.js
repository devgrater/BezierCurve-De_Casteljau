const validClickRadius = 10;

function renderPoint(obj, id, canvas, radius=10){
	let context = canvas.getContext("2d");

	let width = canvas.width;
	let height = canvas.height;

	let x = width * obj.x;
	let y = height * obj.y;
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);

	context.fillStyle = 'white';
	context.fill();

	context.strokeStyle = 'black';
	context.stroke();

	context.font = '10px sans';
	context.fillStyle = 'black';
	context.fillText('' + id, x - 5, y + 5);
}

function checkMouseInRange(x, y){
	let canvas = canvas_list[0];
	let diffX = x * canvas.width - mouseX;
	let diffY = y * canvas.height - mouseY;
	if(diffX * diffX + diffY * diffY < validClickRadius * validClickRadius){
		return true;
	}
	return false;
}

function addPoint(x, y){
	if(points_list.length < 2){
		points_list.push({x:x, y:y});
		return;
	}
	else{
		points_list.splice(points_list.length - 1, 0, {x:x, y:y});
	}

}

function removePoint(){
	if(points_list.length == 1){
		points_list = [];
	}
	else if(points_list.length == 2){
		points_list.splice(points_list.length - 1, 1);
	}
	else{
		points_list.splice(points_list.length - 2, 1);
	}
	vectorPointCounter -= 1;
}
