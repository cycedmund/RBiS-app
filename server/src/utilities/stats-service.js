const debug = require("debug")("RBiS:server:utilities:stats-service");

function filterPresent() {
  if (this.trainees.length > 0) {
    const trainees = this.trainees;
    return trainees.filter((trainee) => trainee.status[0].status === "Present");
  } else {
    return null;
  }
}

function getCommonLocation() {
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

module.exports = { filterPresent, getCommonLocation };

// const debug = require("debug")("RBiS:server:utilities:stats-service");

// function filterPresent(trainees) {
//   return trainees.filter((trainee) => trainee.status[0].status === "Present");
// }

// function getCommonLocation(trainees) {
//   const counter = {};
//   trainees.forEach((trainee) => {
//     const location = trainee.status[0].location;
//     if (location) {
//       counter[location] = (counter[location] || 0) + 1;
//     }
//   });
//   debug("counter:", counter);
//   const common = Object.keys(counter).reduce((a, b) =>
//     counter[a] > counter[b] ? a : b
//   );
//   debug("common location:", common);
//   return common;
// }

// module.exports = { filterPresent, getCommonLocation };
