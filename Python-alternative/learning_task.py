import matplotlib as mpl
import numpy as np
import matplotlib.pyplot as plt

sampleXArray = np.array([1, 2, 3, 4, 5, 1.5, 1, 2, 4, 1, 3, 1, 2, 4, 2.5, 3])
sampleYArray = np.array([1, 1, 1, 1, 1, 1.5, 2, 2, 2, 3, 3, 4, 4, 4, 1.5, 2])

def combineSample(x, y):
  return [x, y]

sampleDataArray = sampleXArray.map(combineSample, sampleXArray, sampleXArray)

xRange = np.array([0, 5])
yRange = np.array([0, 5])

trueClassification = np.array([[1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [1, 0], [1, 0], [1, 0], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [1, 0], [1, 0]])

####################################################################



def trainNeuralNetwork(sampleDataArray, trueClassification):
  # WRITE YOUR NEURAL NETWORK CODE HERE
  # You may need to make more functions or even another file to train the neural network
  return np.array([[]]), np.array([])



######################################################################


'''
These functions help plot.js use the trained network to plot a graph to visualise how your neural network classifies the points
You can read these to understand more, but you shouldn't need to change them much for the task.
Well, unless my amateur coding style annoys you too much!
'''

def ClassifyMesh(rangeX, rangeY, resolution, weights, biases):
  #This function classifies the points, given a set of weights and biases, which you should a way of training above 

  divisionX = (rangeX[1]-rangeX[0])/resolution
  divisionY = (rangeY[1]-rangeY[0])/resolution

  meshGrid = []
  decisionLinePoints = []

  for i in range(resolution):
    meshGrid.append([])

    for j in range(resolution):
        thisPoint = [[rangeX[0] + j*divisionX, rangeY[0] + i*divisionY]]
        expectedOutput = OutputGroupAssign(BatchClassify(thisPoint, weights, biases))
        meshGrid[i].push(expectedOutput[0])

        if ((j-1 >= 0 and meshGrid[i][j-1] != meshGrid[i][j]) or (i-1 >= 0 & meshGrid[i-1][j] != meshGrid[i][j])):
            decisionLinePoints.push(thisPoint[0])

  # Rearrange to make a suitable line when plotted in order - may need to change for unusual boundaries
  decisionLinePoints.sort(lambda a, b: a[0] - b[0])
  return decisionLinePoints


def loadTrainedNetwork(xRange, yRange):
  # Use this function to train and store the neural network on your device
  # If it is already stored on your device, the neural network will be loaded into the program instead

  trainedData

  weightsStorage = localStorage.getItem("ML-task0-data")
    ? JSON.parse(localStorage.getItem("ML-task0-data"))
    : undefined

  if not weightsStorage:
    trainedData = trainNeuralNetwork(sampleDataArray, trueClassification)
    #localStorage.setItem("ML-task0-data", JSON.stringify(trainData));
  else:
    trainedData = (weightsStorage.weights, weightsStorage.biases)
  
  trainedData.decisionBoundary = ClassifyMesh(xRange, yRange, 500, trainedData.weights, trainedData.biases)
  return trainedData


def deleteNetworkData():
  # Use this function to delete the locally stored learning data

  weightsStorage = localStorage.getItem("ML-task0-data")
  ? JSON.parse(localStorage.getItem("ML-task0-data"))
  : undefined
  if not weightsStorage:
    print('No network data to delete, or it is stored under another name')
  else:
    localStorage.removeItem("ML-task0-data")

# graphData is an object storing the details of your graph for plot.js to use to plot the points and boundary line
graphData = {
  title: "Demonstration of a multilayer neural network",
  rawXArray: sampleXArray,
  rawYArray: sampleYArray,
  classifySample: trueClassification,
  xLabels: "Sample x data",
  yLabels: "Sample y data",
  xRange: xRange,
  yRange: yRange,
}

fig, ax = plt.subplots()  # Create a figure containing a single axes.
ax.plot([1, 2, 3, 4], [1, 4, 2, 3])  # Plot some data on the axes.