const location = {
  General: {
    Bunk: "Bunk",
    "Bball Court": "Bball Court",
    Cookhouse: "Cookhouse",
    "Medical Centre": "Medical Centre",
    Gym: "Gym",
  },
  AFTC: {
    Matra: "Matra",
    Ericsson: "Ericsson",
    Raphael: "Raphael",
    "AWO Office": "AWO Office",
    Audi: "Audi",
    LT1: "LT1",
    LT2: "LT2",
    Hub: "Hub",
  },
  "3 DA Bn": {
    "Hangar 3": "Hangar 3",
    "Hangar 4": "Hangar 4",
    "Hangar 5": "Hangar 5",
    "Weapon Store": "Weapon Store",
    "Ops Room": "Ops Room",
    "AR Room": "AR Room",
    "Bn Lec Room": "Bn Lec Room",
  },
  "18 DA Bn": {
    "Hangar 1": "Hangar 1",
    "Hangar 2": "Hangar 2",
    "Ops Room": "Ops Room",
    "'A' LT1": "'A' LT1",
    "AR Room": "AR Room",
    Audi: "Audi",
  },
};

function extractIntoOptions(obj) {
  let values = [];
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      values = values.concat(extractIntoOptions(obj[key]));
    } else {
      values.push(obj[key]);
    }
  }
  return values;
}

const locationOptions = extractIntoOptions(location);

const equipmentOptions = [
  "Sight",
  "Stand",
  "Missile",
  "RWD",
  "IFF",
  "RWD Battery",
  "WIA Cables",
  "Antenna",
  "R/T",
  "IFF",
  "Pedestal Assembly",
  "Cable Reel",
  "Generator",
  "RT",
  "Amplifier",
  "Headset",
  "AB 288",
  "Short Whip",
  "Long whip",
  "Gooseneck",
  "Battery",
  "Battery Cover",
  "Harness",
  "Accessory Bag",
  "Speakers",
  "CX1289",
  "CX1286",
  "Telejay",
  "D10 Reel",
  "D-Sized Batteries",
];

module.exports = { locationOptions, equipmentOptions };