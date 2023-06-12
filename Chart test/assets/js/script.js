const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const wheel2 = document.getElementById("wheel2");
const spinBtn2 = document.getElementById("spin-btn2");
const finalValue = document.getElementById("final-value");
//object stores mins and max angles for a vlaue
const rotationValues = [
    {minDegree: 0, maxDegree: 36, value: 1},
    {minDegree: 37, maxDegree: 72, value: 2},
    {minDegree: 73, maxDegree: 108,  value: 3},
    {minDegree: 109, maxDegree: 144, value: 4},
    {minDegree: 145, maxDegree: 180, value: 5},
    {minDegree: 181, maxDegree: 216, value: 6},
    {minDegree: 217, maxDegree: 252, value: 7},
    {minDegree: 253, maxDegree: 288, value: 8},
    {minDegree: 289, maxDegree: 324, value: 9},
    {minDegree: 325, maxDegree: 360, value: 10}
];
const data = [16,16,16,16,16,16,16,16,16,16];

var wheelColors = [
    "pink",
    "lightgrey",
    "lightgreen",
    "yellow",
    "lightsalmon",
    "pink",
    "lightblue",
    "lightgreen",
    "yellow",
    "lightsalmon"
];

var wheelColors2 = [
    "rgb(180, 116, 126)",
    "rgb(129, 129, 129)",
    "rgb(99, 179, 99)",
    "rgb(173, 173, 0)",
    "rgb(177, 107, 80)",
    "rgb(180, 116, 126)",
    "rgb(129, 129, 129)",
    "rgb(99, 179, 99)",
    "rgb(173, 173, 0)",
    "rgb(177, 107, 80)"
];
//create chart
let myChart = new Chart(wheel, {
    //plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        //labels for chart
        labels: [1,2,3,4,5,6,7,8,9,10],
        //settings for dataset/pie
        datasets: [
            {
                backgroundColor: wheelColors,
                data: data, 
            },
        ],
    },
    options: {
        //responsive chart
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            //hide tooltip and legend
            tooltip: false,
            legend: {
            display: false,
            },
            //display labels inside chart
            dataLabels: {
                color: "white",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});

let myChart2 = new Chart(wheel2, {
    //plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        //labels for chart
        labels: [1,2,3,4,5,6,7,8,9,10],
        //settings for dataset/pie
        datasets: [
            {
                backgroundColor: wheelColors2,
                data: data, 
            },
        ],
    },
    options: {
        //responsive chart
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            //hide tooltip and legend
            tooltip: false,
            legend: {
            display: false,
            },
            //display labels inside chart
            dataLabels: {
                color: "white",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});

//display val on angle
const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
// ----------- place i.value into a variable to be used after wheel stops spinning
            // finalValue.innerHTML = i.value;
            spinBtn.disabled = false;
            spinBtn2.disabled = false;
            break;
        }
    }
};
//spinner count
let count = 0;
// 100 rotations for animation and last rotation for result
let resultValue = 101;
//start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    //empty final value
    // finalValue.innerHTML = '<p>Good Luck!</p>';
    //genereate random degrees to stop
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //set rotation for wheel
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if (myChart.options.rotation >= 360) {
            count++;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count >15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});

// spinBtn2.addEventListener("click", () => {
//     spinBtn2.disabled = true;
//     //empty final value
//     // finalValue.innerHTML = '<p>Good Luck!</p>';
//     //genereate random degrees to stop
//     let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
//     //set rotation for wheel
//     let rotationInterval = window.setInterval(() => {
//         myChart2.options.rotation = myChart2.options.rotation + resultValue;
//         myChart2.update();
//         if (myChart2.options.rotation >= 360) {
//             count++;
//             resultValue -= 5;
//             myChart2.options.rotation = 0;
//         } else if (count >15 && myChart2.options.rotation == randomDegree) {
//             valueGenerator(randomDegree);
//             clearInterval(rotationInterval);
//             count = 0;
//             resultValue = 101;
//         }
//     }, 10);
// });