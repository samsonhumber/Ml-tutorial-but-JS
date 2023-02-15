import graphData, { loadTrainedNetwork, deleteNetworkData} from './ML-scripts/learning-task.js';

// Load up or train weight, bias and decision boundary data
let trainedData = loadTrainedNetwork(graphData.xRange, graphData.yRange);

// Set the two buttons - note that one must refresh in order to update after deleting
const saveButton = document.getElementById("save-weights");
const deleteButton = document.getElementById("delete-weights");

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("ML-task0-data", JSON.stringify(trainedData));
  alert('Weights and biases saved');
});

deleteButton.addEventListener("click", (e) => {
  e.preventDefault();
  deleteNetworkData();
  alert('Weights and biases deleted');
});

console.log(trainedData);

let boundaryLineX = [];
let boundaryLineY = [];
for (let i=0; i<trainedData.decisionBoundary.length; i++) {
  boundaryLineX.push(trainedData.decisionBoundary[i][0]);
  boundaryLineY.push(trainedData.decisionBoundary[i][1]);
}

console.log(graphData);
// For more than 2 classes, I would advise using a loop to define the graph points and lines

// Define plotted graphs
const data = [{
  x: graphData.rawXArray.filter((value, index) => {return graphData.classifySample[index][0] === 0}),
  y: graphData.rawYArray.filter((value, index) => {return graphData.classifySample[index][0] === 0}),
  type: 'scatter',
  mode:"markers",
  marker: {
    size: 8,
    symbol: "cross-thin-open"
  }
}, {
  x: graphData.rawXArray.filter((value, index) => {return graphData.classifySample[index][0] === 1}),
  y: graphData.rawYArray.filter((value, index) => {return graphData.classifySample[index][0] === 1}),
  mode:"markers",
  marker: {
    size: 8,
    symbol: "cross-thin-open"
  } 
}, 
/*{
    x: boundaryLineX,
    y: boundaryLineY,
    mode: "lines"
}, */
{
  x: boundaryLineX,
  y: boundaryLineY,
  mode: "markers",
  marker: {
    size: 1
  }
}
];

console.log(data);

// Define axis layout
const layout = {
  xaxis: {range: graphData.xRange, title: graphData.xLabels},
  yaxis: {range: graphData.yRange, title: graphData.yLabels},  
  title: graphData.title
};

// Display using Plotly
Plotly.newPlot("myPlot", data, layout);