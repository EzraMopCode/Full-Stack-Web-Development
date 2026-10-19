'use strict';

// --- PART 1: Function Basics ---

const sumDistances = (...distances) => {
  return distances.reduce((total, distance) => total + distance, 0);
};

const calculateBaseFare = (totalDistance, ratePerKm = 15) => {
  return totalDistance * ratePerKm;
};

const formatCurrency = (amount) => {
  return `${amount.toFixed(2)} ETB`;
};


// --- PART 2: Higher-Order Functions ---

function makeSurgeMultiplier(surgeRate) {
  return (baseFare) => {
    return baseFare * surgeRate;
  };
}


// --- PART 3: Closures ---

function makeDriverTracker() {
  let tripsCompleted = 0;

  return {
    recordTrip() {
      tripsCompleted++;
    },

    getTrips() {
      return tripsCompleted;
    }
  };
}


// --- PART 4: Composition & Callbacks ---

function generateReceipt(distances, surgeFn, tracker, callback) {
  tracker.recordTrip();

  const tripNumber = tracker.getTrips();
  const totalDistance = sumDistances(...distances);
  const baseFare = calculateBaseFare(totalDistance);
  const actualFare = surgeFn(baseFare);
  const formattedFare = formatCurrency(actualFare);

  const receipt = `Trip #${tripNumber}: Total Fare is ${formattedFare}.`;

  callback(receipt);
}


// --- TESTING YOUR CODE ---

const tayesTracker = makeDriverTracker();

const standardPricing = makeSurgeMultiplier(1.0);
const rushHourPricing = makeSurgeMultiplier(1.5);

const printToConsole = (message) => console.log(message);


// Ride 1
generateReceipt(
  [2, 3],
  standardPricing,
  tayesTracker,
  printToConsole
);


// Ride 2
generateReceipt(
  [10],
  rushHourPricing,
  tayesTracker,
  printToConsole
);
