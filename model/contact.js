const { Schema, model } = require("mongoose");

const { ValidLengthContactName } = require("../config/constant");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: ValidLengthContactName.MIN_LENGTH,
      max: ValidLengthContactName.MAX_LENGTH,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJson: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toObject: { virtuals: true },
  }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
