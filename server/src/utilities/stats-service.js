const debug = require("debug")("RBiS:server:utilities:stats-service");

function filterPresent() {
  if (this.trainees.length > 0) {
    const trainees = this.trainees;
    return trainees.filter(
      (trainee) =>
        trainee.status[0].status === "Present" ||
        trainee.status[0].status === "Light Duty"
    );
  } else {
    return null;
  }
}

function getThisCommonLocation() {
  if (this.trainees.length > 0) {
    const trainees = this.trainees;
    const counter = {};
    trainees.forEach((trainee) => {
      const location = trainee.status[0].location;
      if (location) {
        counter[location] = (counter[location] || 0) + 1;
      }
    });
    debug("counter:", counter);
    const common = Object.keys(counter).reduce((a, b) =>
      counter[a] > counter[b] ? a : b
    );
    debug("common location:", common);
    return common;
  } else {
    return null;
  }
}

function getCommonLocation(trainees) {
  const counter = {};
  trainees.forEach((trainee) => {
    const location = trainee.status[0].location;
    if (location) {
      counter[location] = (counter[location] || 0) + 1;
    }
  });
  debug("counter:", counter);
  const common = Object.keys(counter).reduce((a, b) =>
    counter[a] > counter[b] ? a : b
  );
  debug("common location:", common);
  return common;
}

//edit this ^ see if virtuals or calculate in controller

module.exports = { filterPresent, getCommonLocation, getThisCommonLocation };
