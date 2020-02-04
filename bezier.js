/*递归算法
 *假设有4点1,2,3,4以及贝塞尔进度t
 *则可以获取三个点：1+(2-1)*t, 2+(3-2)*t, 3+(4-3)*t
 *根据这三个点继续计算，算至只剩两点1,2时，返回的点1+(2-1)*t即为贝塞尔进度为t时的点坐标
 *此方法适用于任意数量的点
 */
function getBezier(points, t){
	if(points.length < 2){
		return {x: points[0].x, y:points[0].y};
	}
	else if(points.length == 2){
		return {x: (points[0].x + (points[1].x - points[0].x) * t),
				y: (points[0].y + (points[1].y - points[0].y) * t)}
	}
	else{
		let newpoints = [];
		for(let i = 0; i + 1 < points.length; i++){
			let point =
			{x: (points[i].x + (points[i+1].x - points[i].x) * t),
			 y: (points[i].y + (points[i+1].y - points[i].y) * t)};
			 newpoints.push(point);
		}
		return getBezier(newpoints, t);
	}
}

function drawBezier(step_size){
	let progress = 0;
	let canvas = canvas_list[0];
	let ctx = canvas.getContext("2d");
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(points_list[0].x * canvas.width, points_list[0].y * canvas.height);
	while(progress < 1){
		let point = getBezier(points_list, progress);
		ctx.lineTo(point.x * canvas.width, point.y * canvas.height);
		progress += step_size;
	}
	ctx.stroke();
}
