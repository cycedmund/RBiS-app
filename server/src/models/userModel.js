const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const statusSchema = new Schema(
  {
    status: {
      type: String,
      enum: [
        "MC",
        "Annual Leave",
        "Bereavement",
        "Light Duty",
        "Present",
        "Interview",
        "Medical",
      ],
      default: "Present",
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    rank: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 10,
      trim: true,
    },
    role: {
      type: String,
      enum: ["trainee", "instructor", "admin"],
      required: true,
    },
    status: [statusSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_, ret) {
        delete ret.password;
        return ret;
      },
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

// userSchema.pre("save", async function (next) {
//   const words = this.fullName.split(" ");
//   const formattedWords = words.map(
//     (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//   );
//   this.fullName = formattedWords.join(" ");
//   return next();
// });

userSchema.virtual("formattedFullName").get(function () {
  const words = this.fullName.split(" ");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return formattedWords.join(" ");
});

module.exports = model("User", userSchema);
