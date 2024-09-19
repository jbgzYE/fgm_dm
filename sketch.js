// Initial values for a and b
var a = 1.0;
var b = 1.0;
var t = [];
var x = [];
var y = [];

// Populate t, x, and y arrays for initial plot
for (var i = 0; i < 1000; i++) {
    var theta = 2 * Math.PI * i / 999;
    t.push(theta);
    x.push(a * Math.sin(theta));
    y.push(b * Math.cos(theta));
}

// Plotly plot configuration
var trace = {
    x: x,
    y: y,
    mode: 'lines',
    type: 'scatter'
};

var data = [trace];

var layout = {
    title: 'Interactive Parametric Plot',
    xaxis: { range: [-5, 5] },
    yaxis: { range: [-5, 5] }
};

// Create initial plot
Plotly.newPlot('plot', data, layout);

// Function to update the plot when sliders change
function updatePlot() {
    var newX = [];
    var newY = [];
    for (var i = 0; i < t.length; i++) {
        newX.push(a * Math.sin(t[i]));
        newY.push(b * Math.cos(t[i]));
    }
    Plotly.restyle('plot', { x: [newX], y: [newY] });
}

// Initialize and configure sliders
var sliderA = document.getElementById('slider-a');
var sliderB = document.getElementById('slider-b');

noUiSlider.create(sliderA, {
    start: [a],
    range: {
        'min': 0.1,
        'max': 5.0
    },
    step: 0.1
});

noUiSlider.create(sliderB, {
    start: [b],
    range: {
        'min': 0.1,
        'max': 5.0
    },
    step: 0.1
});

// Update plot when slider A changes
sliderA.noUiSlider.on('update', function (values, handle) {
    a = parseFloat(values[0]);
    updatePlot();
});

// Update plot when slider B changes
sliderB.noUiSlider.on('update', function (values, handle) {
    b = parseFloat(values[0]);
    updatePlot();
});
