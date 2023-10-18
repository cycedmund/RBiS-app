const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const statusSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["MC", "Leave", "Compassionate Leave", "Light Duty", "None"],
      default: "None",
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
    },
  }
);

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = model("User", userSchema);
