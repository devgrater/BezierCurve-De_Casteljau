let mouseY;
let mouseX;
let mouseStats = [false,false,false];

let canvasCounter = 0;
let vectorPointCounter = 0;

let points_list = [];
let canvas_list = [];

let pickedUpPoint = null;

let animationProgression = 0;
let progressionDir = 0.01;
let ballPos = 0;

let currentBezier = {x:0, y:0};

function init(){
	let bezierCanvas = createCanvas(400,400,true);
	registerMouseEvents(bezierCanvas);
	bezierCanvas.update = function(){
		if(pickedUpPoint != null){
			pickedUpPoint.x = mouseX / bezierCanvas.width;
			pickedUpPoint.y = mouseY / bezierCanvas.height;
		}
		bezierCanvas.getContext("2d").clearRect(0,0,bezierCanvas.width, bezierCanvas.height);
		drawBezier(0.01);
		for(let i = 0; i < points_list.length; i++){
			renderPoint(points_list[i], i, bezierCanvas);
		}
	};

	let verticalAnimationCanvas = createCanvas(200, 400,false);
	verticalAnimationCanvas.update = function(){
		verticalAnimationCanvas.getContext("2d").clearRect(0,0,verticalAnimationCanvas.width, verticalAnimationCanvas.height);
		renderPoint({x:0.5, y: currentBezier.y}, "", verticalAnimationCanvas);
	}

	let horizontalAnimationCanvas = createCanvas(400, 200,true);
	horizontalAnimationCanvas.update = function(){
		horizontalAnimationCanvas.getContext("2d").clearRect(0,0,horizontalAnimationCanvas.width, horizontalAnimationCanvas.height);
		renderPoint({x:currentBezier.x, y: 0.5}, "", horizontalAnimationCanvas);
	}

	let boxAnimationCanvas = createCanvas(200, 200, false);
	boxAnimationCanvas.update = function(){
		boxAnimationCanvas.getContext("2d").clearRect(0,0,boxAnimationCanvas.width, boxAnimationCanvas.height);
		renderPoint({x:0.5, y: 0.5}, "", boxAnimationCanvas, 50 * currentBezier.y);
	}

	addPoint(0.05, 0.95);
	addPoint(0.95, 0.05);
	update();
}

function registerMouseEvents(canvas){
	let boundingBox = canvas.getBoundingClientRect();

	canvas.addEventListener("mousemove", e => {
		//e.clientX;
		let globalMouseX = e.clientX;
		let globalMouseY = e.clientY;
		mouseX = globalMouseX - boundingBox.left;
		mouseY = globalMouseY - boundingBox.top;
	});

	canvas.addEventListener("mousedown", e => {
		for(let x of points_list){
			if(checkMouseInRange(x.x, x.y)){
				pickedUpPoint = x;
				break;
			}
		}
		mouseStats[e.button] = true;
	});

	canvas.addEventListener("mouseup", e => {
		pickedUpPoint = null;
		mouseStats[e.button] = false;
	});
}

function createCanvas(width, height, newline=false){
	if(newline){
		let br = document.createElement("br");
		document.body.appendChild(br);
	}

	let canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	canvas.id = "drawcanvas-" + canvasCounter;
	canvas.style = "border:1px solid #000000";

	canvasCounter += 1;
	document.body.appendChild(canvas);
	canvas_list.push(canvas);
	return canvas;
}

function update(){
	if(animationProgression > 1 || animationProgression < 0){
		progressionDir = -progressionDir;
	}
	animationProgression += progressionDir;
	currentBezier = getBezier(points_list, animationProgression);

	for(var i = 0; i < canvas_list.length; i++){
		canvas_list[i].update();
	}
	window.requestAnimationFrame(update);
}
