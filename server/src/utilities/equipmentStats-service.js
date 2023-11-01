const debug = require("debug")("RBiS:server:utilities:equipmentStats-service");

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

function getCounts(category, equipment) {
  return category.map((category) => {
    const count = equipment.reduce((acc, item) => {
      if (item.category === category) {
        return acc + item.units.length;
      }
      return acc;
    }, 0);

    const inStoreCount = equipment.reduce((acc, item) => {
      if (item.category === category) {
        return (
          acc + item.units.filter((unit) => unit.status === "In Store").length
        );
      }
      return acc;
    }, 0);

    const outsideStoreCount = equipment.reduce((acc, item) => {
      if (item.category === category) {
        return (
          acc +
          item.units.filter((unit) => unit.status === "Outside Store").length
        );
      }
      return acc;
    }, 0);

    return {
      category,
      count,
      inStoreCount,
      outsideStoreCount,
    };
  });
}

//! ==========to fix=============
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
//! ==========to fix=============

module.exports = {
  filterPresent,
  getCommonLocation,
  getThisCommonLocation,
  getCounts,
};
