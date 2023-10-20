require("dotenv").config();
const debug = require("debug")("RBiS:server:seedDb");
const mongoose = require("mongoose");
const User = require("./src/models/userModel");
const Course = require("./src/models/courseModel");
// const Equipment = require("./src/models/equipmentModel");

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

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Course.deleteMany({});

    const seededUsers = await User.create(users);

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
