// Получить случайный цвет
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

// Подготовим объект
function prepareObject(o) {
    o.colors = new Array();

    // Находим нормали
    o.normals = new Array();
    for (var i = 0; i < o.faces.length; i++) {
        o.normals[i] = [0, 0, 0];

        //o.colors[i] = getRandomColor();
        o.colors[i] = "#0277BD";
    }

    // Рассчитываем максимальную позицию
    o.center = [0, 0, 0];
    for (var i = 0; i < o.points.length; i++) {
        o.center[0] += o.points[i][0];
        o.center[1] += o.points[i][1];
        o.center[2] += o.points[i][2];
    }

    // Подготовим расстояния
    o.distances = new Array();
    for (var i = 1; i < o.points.length; i++) {
        o.distances[i] = 0;
    }

    // Вычисляем среднее положение центра
    o.points_number = o.points.length;
    o.center[0] = o.center[0] / (o.points_number - 1);
    o.center[1] = o.center[1] / (o.points_number - 1);
    o.center[2] = o.center[2] / (o.points_number - 1);

    o.faces_number = o.faces.length;
    o.axis_x = [1, 0, 0];
    o.axis_y = [0, 1, 0];
    o.axis_z = [0, 0, 1];
}

// Создание сферы
function sphere(n) {
    var delta_angle = 2 * Math.PI / n;

    // Подготовим вершины (точеки) сферы
    var vertices = [];
    for (var j = 0; j < n / 2 - 1; j++) {
        for (var i = 0; i < n; i++) {
            vertices[j * n + i] = [];
            vertices[j * n + i][0] = 100 * Math.sin((j + 1) * delta_angle) * Math.cos(i * delta_angle);
            vertices[j * n + i][1] = 100 * Math.cos((j + 1) * delta_angle);
            vertices[j * n + i][2] = 100 * Math.sin((j + 1) * delta_angle) * Math.sin(i * delta_angle);
        }
    }
    vertices[(n / 2 - 1) * n] = [];
    vertices[(n / 2 - 1) * n + 1] = [];

    vertices[(n / 2 - 1) * n][0] = 0;
    vertices[(n / 2 - 1) * n][1] =  100;
    vertices[(n / 2 - 1) * n][2] =  0;

    vertices[(n / 2 - 1) * n + 1][0] = 0;
    vertices[(n / 2 - 1) * n + 1][1] = -100;
    vertices[(n / 2 - 1) * n + 1][2] = 0;

    this.points = vertices;

    // Подготовим плоскости
    var faces = [];
    for (var j = 0; j < n / 2 - 2; j++) {
        for (var i = 0; i < n - 1; i++) {
            faces[j * 2 * n + i] = [];
            faces[j * 2 * n + i + n] = [];

            faces[j * 2 * n + i][0] = j * n + i;
            faces[j * 2 * n + i][1] = j * n + i + 1;
            faces[j * 2 * n + i][2] = (j + 1) * n + i + 1;
            faces[j * 2 * n + i + n][0] = j * n + i;
            faces[j * 2 * n + i + n][1] = (j + 1) * n + i + 1;
            faces[j * 2 * n + i + n][2] = (j + 1) * n + i;
        }

        faces[j * 2 * n + n - 1] = [];
        faces[2 * n * (j + 1) - 1] = [];

        faces[j * 2 * n + n - 1  ][0] = (j + 1) * n - 1;
        faces[j * 2 * n + n - 1  ][1] = (j + 1) * n;
        faces[j * 2 * n + n - 1  ][2] = j * n;
        faces[2 * n * (j + 1) - 1][0] = (j + 1) * n - 1;
        faces[2 * n * (j + 1) - 1][1] = j * n + n;
        faces[2 * n * (j + 1) - 1][2] = (j + 2) * n - 1;
    }
    for (var i = 0; i < n - 1; i++) {
        faces[n * (n - 4) + i] = [];
        faces[n * (n - 3) + i] = [];

        faces[n * (n - 4) + i][0] = (n / 2 - 1) * n;
        faces[n * (n - 4) + i][1] = i;
        faces[n * (n - 4) + i][2] = i + 1;
        faces[n * (n - 3) + i][0] = (n / 2 - 1) * n + 1;
        faces[n * (n - 3) + i][1] = (n / 2 - 2) * n + i + 1;
        faces[n * (n - 3) + i][2] = (n / 2 - 2) * n + i;
    }

    faces[n * (n - 3) - 1] = [];
    faces[n * (n - 2) - 1] = [];

    faces[n * (n - 3) - 1][0] = (n / 2 - 1) * n;
    faces[n * (n - 3) - 1][1] = n - 1;
    faces[n * (n - 3) - 1][2] = 0;
    faces[n * (n - 2) - 1][0] = (n / 2 - 1) * n + 1;
    faces[n * (n - 2) - 1][1] = (n / 2 - 2) * n;
    faces[n * (n - 2) - 1][2] = (n / 2 - 2) * n + n - 1;

    this.faces=faces;

    prepareObject(this);
}