/* {[<- Introduction to Machine Learning: coding task ->]} */


// My sample data set. Use this one, your own or change some values if you like, as long as the points are not too easily separated

const sampleXArray = [1, 2, 3, 4, 5, 1.5, 1, 2, 4, 1, 3, 1, 2, 4, 2.5, 3];
const sampleYArray = [1, 1, 1, 1, 1, 1.5, 2, 2, 2, 3, 3, 4, 4, 4, 1.5, 2];

const sampleDataArray = sampleXArray.map((xValue, index) => {
    return [xValue, sampleYArray[index]]
});

const xRange = [0, 5];
const yRange = [0, 5];

const trueClassification = [[1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [1, 0], [1, 0]];


// -------------------------------------------------------------------------------------------------------



function trainNeuralNetwork(sampleDataArray, trueClassification) {
    // PUT YOUR NEURAL NETWORK CODE HERE
    // You may need to make more functions or even another file to train the neural network
    return {weights: [[]], biases: []}
};



// --------------------------------------------------------------------------------------------------------

/* 
These functions help plot.js use the trained network to plot a graph to visualise how your neural network classifies the points
You can read these to understand more, but you shouldn't need to change them much for the task.
Well, unless my amateur coding style annoys you too much!
*/

function ClassifyMesh(rangeX, rangeY, resolution, weights, biases) {
    // This function classifies the points, given a set of weights and biases, which you should a way of training above
    // 

    const divisionX = (rangeX[1]-rangeX[0])/resolution;
    const divisionY = (rangeY[1]-rangeY[0])/resolution;

    let meshGrid = [];
    let decisionLinePoints = [];

    for (let i=0; i<resolution; i++) {
        meshGrid.push([]);

        for (let j=0; j<resolution; j++) {
            const thisPoint = [[rangeX[0] + j*divisionX, rangeY[0] + i*divisionY]];
            const expectedOutput = OutputGroupAssign(BatchClassify(thisPoint, weights, biases));
            meshGrid[i].push(expectedOutput[0]);

            if ((j-1 >= 0 && meshGrid[i][j-1] !== meshGrid[i][j]) || (i-1 >= 0 && meshGrid[i-1][j] !== meshGrid[i][j])) {
                decisionLinePoints.push(thisPoint[0]);
            }
        }
    }

    // Rearrange to make a suitable line when plotted in order - may need to change for unusual boundaries
    decisionLinePoints.sort((a, b) => {return (a[0] - b[0])});
    return decisionLinePoints
}

export function loadTrainedNetwork(xRange, yRange) {
    // Use this function to train and store the neural network on your device
    // If it is already stored on your device, the neural network will be loaded into the program instead

    let trainedData;

    const weightsStorage = localStorage.getItem("ML-task0-data")
    ? JSON.parse(localStorage.getItem("ML-task0-data"))
    : undefined;

    if(!weightsStorage) {
        trainedData = trainNeuralNetwork(sampleDataArray, trueClassification);
        //localStorage.setItem("ML-task0-data", JSON.stringify(trainData));
    } else {
        trainedData = {
            weights: weightsStorage.weights,
            biases: weightsStorage.biases,
        };
    }

    trainedData.decisionBoundary = ClassifyMesh(xRange, yRange, 500, trainedData.weights, trainedData.biases);
    return trainedData
}

export function deleteNetworkData() {
    // Use this function to delete the locally stored learning data

    let weightsStorage = localStorage.getItem("ML-task0-data")
    ? JSON.parse(localStorage.getItem("ML-task0-data"))
    : undefined;
    if (!weightsStorage) {
        console.log('No network data to delete, or it is stored under another name');
    } else {
        localStorage.removeItem("ML-task0-data");
    }
}

// graphData is an object storing the details of your graph for plot.js to use to plot the points and boundary line
const graphData = {
    title: "Demonstration of a multilayer neural network",
    rawXArray: sampleXArray,
    rawYArray: sampleYArray,
    classifySample: trueClassification,
    xLabels: "Sample x data",
    yLabels: "Sample y data",
    xRange: xRange,
    yRange: yRange,
};

export default graphData;