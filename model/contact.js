const { Schema, model, SchemaTypes } = require("mongoose");

const { ValidLengthContactName } = require("../config/constants");

const contactSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      min: ValidLengthContactName.MIN_LENGTH,
      max: ValidLengthContactName.MAX_LENGTH,
      required: [true, "Set name for contact"],
    },
    email: {
      type: SchemaTypes.String,
    },
    phone: {
      type: SchemaTypes.String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJson: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
