const { Schema, model } = require("mongoose");
const joi = require("joi");

const { handleSaveErrors } = require("../helpers");

const validationUserEmail =
  /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: validationUserEmail,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = joi.object({
  email: joi.string().pattern(validationUserEmail).required(),
  password: joi.string().min(6).required(),
});

const loginSchemas = joi.object({
  email: joi.string().pattern(validationUserEmail).required(),
  password: joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchemas,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
