// Локальные переменные
var canvas, ctx;
var vAlpha = 1;
var vShiftX = vShiftY = 0;
var distance = -700;
var SpeedTurn = 0.05; //0.05
var iHalfX, iHalfY;

// Создаем сферу
var obj = new sphere(16);

var socket = new WebSocket("ws://localhost:8081");

var arr = Array();
var i = 0;

socket.onmessage = function(event) {
    var data_myo = JSON.parse(event.data);
    buyerData.datasets[0].data.push(data_myo.speed);
    
    buyerData.labels.push(++i);
    if(i > 17){
        buyerData.datasets[0].data.shift();
        buyerData.labels.shift();
    }
    new Chart(buyers).Line(buyerData);

    switch (data_myo.route) {
        case 3: // Left Key
            var x = 0;
            var y = iHalfY;
            if ((x >= 0) && (y >= 0)) {
                vShiftY = SpeedTurn * (x - iHalfX) / iHalfX;
                vShiftX = SpeedTurn * (y - iHalfY) / iHalfY;
                drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2, -30, 100, 200); 
            }
            break; 
        case 1:  // Up key
            var x = iHalfX;
            var y = 0;
            if ((x >= 0) && (y >= 0)) {
                vShiftY = SpeedTurn * (x - iHalfX) / iHalfX;
                vShiftX = SpeedTurn * (y - iHalfY) / iHalfY;
                drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2 - 40, 0, 100, 200);
            }
            break; 
        case 4: // Right Key
            var x = canvas.width;
            var y = iHalfY;
            if ((x >= 0) && (y >= 0)) {
                vShiftY = SpeedTurn * (x - iHalfX) / iHalfX;
                vShiftX = SpeedTurn * (y - iHalfY) / iHalfY;
                drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2, 30, 100, 200); 
            }
            break; 
        case 2: // Down key
            var x = iHalfX;
            var y = canvas.height;
            if ((x > 0) && (y > 0)) {
                vShiftY = SpeedTurn * (x - iHalfX) / iHalfX;
                vShiftX = SpeedTurn * (y - iHalfY) / iHalfY;
                drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2 + 40, 0, 100, 200);
            }
            break; 
    }
};

function showMessage(message) {
    var messageElem = document.createElement('div');
    messageElem.appendChild(document.createTextNode(message));
    document.getElementById('subscribe').appendChild(messageElem);
}

var buyers = document.getElementById('buyers').getContext('2d');
var buyerData = {
   labels : [],
   datasets : [
      {
         fillColor : "rgba(3, 155, 229,0.4)",
         strokeColor : "#0277BD",
         pointColor : "#039BE5",
         pointStrokeColor : "039BE5",
         data : []
      }
   ]
}
new Chart(buyers).Line(buyerData);











// Инициализация сцены
function sceneInit() {
    // Подготовим объекты
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    iHalfX = canvas.width / 2;
    iHalfY = canvas.height / 2;

    // Начальный масштаб и перевод
    scaleObj([1.7, 1.7, 1.7], obj);
    translateObj([-obj.center[0], -obj.center[1], -obj.center[2]],obj);
    translateObj([0, 0, -1000], obj);

    // Присоединить обработчики событий
    document.onkeydown = handleKeydown;
    document.onkeyup = handleKeyup;

    // Основной цикл сцен
    setInterval(drawScene, 25);
}




var canvas_car = document.getElementById('car'),
context_car = canvas_car.getContext('2d'),
img = new Image();
img.src = 'images/car.png';
img.onload = function() {    
    context_car.drawImage(img, (canvas_car.width/2 - 50) , (canvas_car.height/2 - 100), 100, 200);  
}

var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 

    context_car.save(); 
    //context_car.clearRect((canvas_car.width/2 - 50), (canvas_car.height/2 - 100), 100, 200);
    context_car.clearRect(50, 0, canvas_car.width-50, canvas_car.height);
    context_car.translate(x, y);

    context_car.rotate(angle * TO_RADIANS);
 
    context_car.drawImage(image, -(image.width/2), -(image.height/2));
 
    context_car.restore(); 
}

function handleKeyup (e) {
    kCode = ((e.which) || (e.keyCode));
    switch (kCode) {
        default:
            drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2, 0, 100, 200); 
        break;
    }
}



// Обработчик события OnKeyDown
function handleKeydown(e) {
    kCode = ((e.which) || (e.keyCode));
    switch (kCode) {
        case 37: // Left Key
            var x = 0;
            var y = iHalfY;
            if ((x >= 0) && (y >= 0)) {
                vShiftY = SpeedTurn * (x - iHalfX) / iHalfX;
                vShiftX = SpeedTurn * (y - iHalfY) / iHalfY;
                drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2, -30, 100, 200); 
            }
            break; 
        case 38:  // Up key
            var x = iHalfX;
            var y = 0;
            if ((x >= 0) && (y >= 0)) {
                vShiftY = SpeedTurn * (x - iHalfX) / iHalfX;
                vShiftX = SpeedTurn * (y - iHalfY) / iHalfY;
                drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2 - 40, 0, 100, 200);
            }
            break; 
        case 39: // Right Key
            var x = canvas.width;
            var y = iHalfY;
            if ((x >= 0) && (y >= 0)) {
                vShiftY = SpeedTurn * (x - iHalfX) / iHalfX;
                vShiftX = SpeedTurn * (y - iHalfY) / iHalfY;
                drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2, 30, 100, 200); 
            }
            break; 
        case 40: // Down key
            var x = iHalfX;
            var y = canvas.height;
            if ((x > 0) && (y > 0)) {
                vShiftY = SpeedTurn * (x - iHalfX) / iHalfX;
                vShiftX = SpeedTurn * (y - iHalfY) / iHalfY;
                drawRotatedImage(img, canvas_car.width/2, canvas_car.height/2 + 40, 0, 100, 200);
            }
            break; 
    }
}

// Рисуем основную функцию сцену
function drawScene() {
    // Очистка полотна
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Установить цвет заливки, цвет обводки, толщину линии.
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha= vAlpha;

    // Вертикальное и горизонтальное вращение
    var vP1x = getRotationPar([0, 0, -1000], [1, 0, 0], vShiftX);
    var vP2x = getRotationPar([0, 0, 0], [1, 0, 0], vShiftX);
    var vP1y = getRotationPar([0, 0, -1000], [0, 1, 0], vShiftY);
    var vP2y = getRotationPar([0, 0, 0], [0, 1, 0], vShiftY);
    rotateObj(vP1x, vP2x, obj);
    rotateObj(vP1y, vP2y, obj);

    // Пересчитываем расстояния
    for (var i = 0; i < obj.points_number; i++) {
        obj.distances[i] = Math.pow(obj.points[i][0],2) + Math.pow(obj.points[i][1],2) + Math.pow(obj.points[i][2], 2);
    }

    // Подготовить массив с плоскостью треугольников (с расчетом максимальное расстояние для каждой грани)
    var iCnt = 0;
    var aFaceTriangles = new Array();
    for (var i = 0; i < obj.faces_number; i++) {
        var max = obj.distances[obj.faces[i][0]];
        for (var f = 1; f < obj.faces[i].length; f++) {
            if (obj.distances[obj.faces[i][f]] > max)
                max = obj.distances[obj.faces[i][f]]; 
        }
        aFaceTriangles[iCnt++] = {faceVertex:obj.faces[i], faceColor:obj.colors[i], distance:max};
    }
    aFaceTriangles.sort(sortByDistance);

    // Подготовка массива с прогнозируемыми пунктами
    var aPrjPoints = new Array();
    for (var i = 0; i < obj.points.length; i++) {
        aPrjPoints[i] = project(distance, obj.points[i], iHalfX, iHalfY);
    }

    // Нарисовать объект (surfaces)
    for (var i = 0; i < iCnt; i++) {

        ctx.fillStyle = aFaceTriangles[i].faceColor;

        // Начинаем путь
        ctx.beginPath();

        // Плоскость индекса вершины
        var iFaceVertex = aFaceTriangles[i].faceVertex;

        // Переместить в исходное положение
        ctx.moveTo(aPrjPoints[iFaceVertex[0]][0], aPrjPoints[iFaceVertex[0]][1]);

        // И нарисовать три линии (построить треугольник)
        for (var z = 1; z < aFaceTriangles[i].faceVertex.length; z++) {
            ctx.lineTo(aPrjPoints[iFaceVertex[z]][0], aPrjPoints[iFaceVertex[z]][1]);
        }

        // Закрыть путь, обводки и заполнить треугольник
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}

// Функция сортировки
function sortByDistance(x, y) {
    return (y.distance - x.distance);
}

// Инициализация
if (window.attachEvent) {
    window.attachEvent('onload', sceneInit);
} else {
    if (window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            sceneInit();
        };
        window.onload = newonload;
    } else {
        window.onload = sceneInit;
    }
}