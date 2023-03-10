const { Schema, model } = require("mongoose");
const joi = require("joi");
const mongoosePaginate = require("mongoose-paginate-v2");
const { handleSaveErrors } = require("../helpers");

const validationEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validationPhone = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
      match: validationEmail,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      match: validationPhone,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

contactSchema.plugin(mongoosePaginate);

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(validationEmail).required(),
  phone: joi.string().pattern(validationPhone).required(),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
