const { Schema, model } = require("mongoose");
const joi = require("joi");

const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");

const validationUserEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const allowedSubscription = ["starter", "pro", "business"];

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
      enum: allowedSubscription,
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      require: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const registerSchema = joi.object({
  email: joi.string().pattern(validationUserEmail).required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
  email: joi.string().pattern(validationUserEmail).required(),
  password: joi.string().min(6).required(),
});

const subscriptionSchema = joi.object({
  subscription: Joi.string()
    .valid(...allowedSubscription)
    .required(),
});

const verifyEmailSchema = joi.object({
  email: joi.string().pattern(validationUserEmail).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
  verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
