require("dotenv").config();
const debug = require("debug")("RBiS:server:seedDb");
const mongoose = require("mongoose");
const User = require("./src/models/userModel");
const Course = require("./src/models/courseModel");
const Equipment = require("./src/models/equipmentModel");
const EquipmentUnit = require("./src/models/equipmentUnitModel");

mongoose.set("debug", true);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", () => {
  debug(`Connected to ${db.name} for seedDb at ${db.host}:${db.port}`);
});

const users = [
  {
    rank: "OCT",
    fullName: "Tristan Up",
    username: "tristan",
    password: "password123!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Transit down",
    username: "transit",
    password: "password123!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Koh En Nua",
    username: "ennua",
    password: "password123!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Luc Wah",
    username: "lucwah",
    password: "password123!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Goh Pang Kang",
    username: "pangkang",
    password: "password123!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Boh Pian Lah",
    username: "pianlah",
    password: "password456!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Lim Peh Say",
    username: "pehsay",
    password: "password456!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Pear Goh",
    username: "peargoh",
    password: "password456!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Cheong So Kan",
    username: "sokan",
    password: "password456!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Siah Suay Leh",
    username: "suayleh",
    password: "password456!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Ai Seh Leh",
    username: "aiseh",
    password: "password456!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "OCT",
    fullName: "Apple Lim",
    username: "appleee",
    password: "password456!",
    role: "trainee",
    status: [
      {
        status: "Present",
        location: "Bunk",
      },
    ],
  },
  {
    rank: "CPT",
    fullName: "Lau Hee Ro",
    username: "hero",
    password: "password789!",
    role: "instructor",
    status: [
      {
        status: "Present",
        location: "Hangar",
      },
    ],
  },
  {
    rank: "CPT",
    fullName: "Kah Lee Zui",
    username: "leezui",
    password: "password789!",
    role: "instructor",
    status: [
      {
        status: "Present",
        location: "Hangar",
      },
    ],
  },
  {
    rank: "CPT",
    fullName: "For Admund",
    username: "admin",
    password: "password1!",
    role: "admin",
    status: [],
  },
];

const equipmentData = [
  {
    category: "RBS 70",
    equipment: "Sight",
    status: "In Store",
    loanStartDate: new Date(2023, 0, 1),
    loanEndDate: new Date(2023, 11, 31),
    units: ["947", "977", "5536"],
    description: [
      "Description for Sight 1",
      "Description for Sight 2",
      "Description for Sight 3",
    ],
  },
  {
    category: "RBS 70",
    equipment: "Stand",
    status: "In Store",
    loanStartDate: new Date(2023, 0, 1),
    loanEndDate: new Date(2023, 11, 31),
    units: ["212", "1691", "1739"],
    description: [
      "Description for Stand 1",
      "Description for Stand 2",
      "Description for Stand 3",
    ],
  },
  {
    category: "RBS 70",
    equipment: "Missile",
    status: "In Store",
    loanStartDate: new Date(2023, 0, 1),
    loanEndDate: new Date(2023, 11, 31),
    units: [
      "2278",
      "2279",
      "2280",
      "2281",
      "2282",
      "2284",
      "2285",
      "2286",
      "2288",
      "2289",
      "2290",
      "2291",
      "2292",
    ],
    description: [
      "Description for Missile 1",
      "Description for Missile 2",
      "Description for Missile 3",
      "Description for Missile 4",
      "Description for Missile 5",
      "Description for Missile 6",
      "Description for Missile 7",
      "Description for Missile 8",
      "Description for Missile 9",
      "Description for Missile 10",
      "Description for Missile 11",
      "Description for Missile 12",
      "Description for Missile 13",
    ],
  },
  {
    category: "RBS 70",
    equipment: "IFF",
    status: "In Store",
    loanStartDate: new Date(2023, 0, 1),
    loanEndDate: new Date(2023, 11, 31),
    units: ["034", "075", "082", "060"],
    description: [
      "Description for IFF 1",
      "Description for IFF 2",
      "Description for IFF 3",
      "Description for IFF 4",
    ],
  },
  {
    category: "RBS 70",
    equipment: "RWD",
    status: "In Store",
    loanStartDate: new Date(2023, 0, 1),
    loanEndDate: new Date(2023, 11, 31),
    units: ["0043", "0050", "0072"],
    description: [
      "Description for RWD 1",
      "Description for RWD 2",
      "Description for RWD 3",
    ],
  },
  {
    category: "RBS 70",
    equipment: "RWD Battery",
    status: "In Store",
    loanStartDate: new Date(2023, 0, 1),
    loanEndDate: new Date(2023, 11, 31),
    units: ["1", "2", "3", "4", "5", "6"],
    description: [
      "Description for RWD Battery 1",
      "Description for RWD Battery 2",
      "Description for RWD Battery 3",
      "Description for RWD Battery 4",
      "Description for RWD Battery 5",
      "Description for RWD Battery 6",
    ],
  },
  {
    category: "RBS 70",
    equipment: "WIA Cable",
    status: "In Store",
    loanStartDate: new Date(2023, 0, 1),
    loanEndDate: new Date(2023, 11, 31),
    units: ["1", "2", "3"],
    description: [
      "Description for WIA Cable 1",
      "Description for WIA Cable 2",
      "Description for WIA Cable 3",
    ],
  },
];
const seedData = async () => {
  try {
    await User.deleteMany({});
    await Course.deleteMany({});
    await Equipment.deleteMany({});
    await EquipmentUnit.deleteMany({});

    const seededUsers = await User.create(users);

    for (const item of equipmentData) {
      const { category, equipment, units, description, ...unitInfo } = item;
      const newEquipment = await Equipment.create({
        category,
        equipment,
        units: [],
      });

      for (let i = 0; i < units.length; i++) {
        const unit = await EquipmentUnit.create({
          serialNumber: units[i],
          description: description[i],
          ...unitInfo,
        });
        newEquipment.units.push(unit._id);
        await newEquipment.save();
      }
    }

    const courses = [
      {
        course: "21st ADW",
        trainees: seededUsers.slice(0, 6).map((user) => user._id),
        instructors: [seededUsers[12]._id],
        courseIC: [seededUsers[0]._id],
        weaponStoreIC: [seededUsers[0]._id],
      },
      {
        course: "22nd ADW",
        trainees: seededUsers.slice(6, 11).map((user) => user._id),
        instructors: [seededUsers[13]._id],
        courseIC: [seededUsers[7]._id],
        weaponStoreIC: [seededUsers[8]._id],
      },
    ];

    await Course.create(courses);

    debug("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    debug("mongoose closing");
    mongoose.disconnect();
  }
};

seedData();
