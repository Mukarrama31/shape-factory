'use strict';

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("createButton").addEventListener("click", createShape);
});

let shapeCount = 0; // Counter to track the number of shapes created

const colorNames = {
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#FF0000': 'Red',
    '#00FF00': 'Lime',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#00FFFF': 'Cyan',
    '#FF00FF': 'Magenta',
    '#C0C0C0': 'Silver',
    '#808080': 'Gray',
    '#800000': 'Maroon',
    '#808000': 'Olive',
    '#008000': 'Green',
    '#800080': 'Purple',
    '#008080': 'Teal',
    '#000080': 'Navy',
    '#EAE31A': 'Lemon',
    // Add more predefined colors as needed
};

function createShape() {
    const shapeType = document.getElementById("shapeSelect").value;
    const color = document.getElementById("colorPicker").value.toUpperCase(); // Ensure uppercase for consistent matching
    shapeCount++;

    let shape = generateShape(shapeType, color); // Utilize the generateShape function

    shape.className = shapeType;
    shape.setAttribute('data-unit', shapeCount.toString());
    shape.addEventListener('click', function() {
        showShapeInfo(shapeType, color, this.getAttribute('data-unit'));
    });

    document.getElementById("shapesContainer").appendChild(shape);
}

function generateShape(shapeType, color) {
    let shape;
    switch (shapeType) {
        case 'star':
            shape = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            shape.setAttribute('viewBox', '0 0 100 100');
            let star = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            star.setAttribute('points', '50,15 20,95 80,35 20,35 80,95');
            star.setAttribute('fill', color);
            shape.appendChild(star);
            break;
        default:
            shape = document.createElement('div');
            shape.style.backgroundColor = color;
            shape.style.display = 'inline-block';
            shape.style.margin = '10px';
            shape.style.width = '100px';
            shape.style.height = '100px';
            applySpecificStyles(shape, shapeType);
            break;
    }
    return shape;
}

function applySpecificStyles(shape, shapeType) {
    if (shapeType === 'circle') shape.style.borderRadius = '50%';
    if (shapeType === 'rectangle') shape.style.width = '150px';
    if (shapeType === 'rhombus' || shapeType === 'parallelogram') {
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.borderLeft = '50px solid transparent';
        shape.style.borderRight = '50px solid transparent';
        shape.style.borderBottom = '100px solid ' + shape.style.backgroundColor;
        shape.style.transform = shapeType === 'rhombus' ? 'rotate(45deg)' : 'skew(20deg)';
    }
    if (shapeType === 'octagon') {
        shape.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
    }
}

function fetchColorName(hex, callback) {
    // Placeholder URL - replace with a real API endpoint
    fetch(`https://colornames.example.com/api?hex=${hex.substring(1)}`)
        .then(response => response.json())
        .then(data => callback(data.name || `Custom Color: ${hex}`))
        .catch(() => callback(`Custom Color: ${hex}`));
}

function showShapeInfo(shapeType, hexColor, unit) {
    // Use the statically defined color names or fetch dynamically for undefined colors
    const colorName = colorNames[hexColor] || fetchColorName(hexColor, (name) => {
        updateShapeInfo(unit, name, shapeType);
    });
    if (colorNames[hexColor]) { // Color name is found in the static map
        updateShapeInfo(unit, colorName, shapeType);
    }
}

function updateShapeInfo(unit, colorName, shapeType) {
    const info = `Unit: ${unit}, Color: ${colorName}, Shape: ${capitalize(shapeType)}`;
    document.getElementById("shapeInfo").innerText = info;
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}