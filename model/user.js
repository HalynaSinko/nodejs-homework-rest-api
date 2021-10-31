const { Schema, model, SchemaTypes } = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const crypto = require("crypto");

const SALT_FACTOR = 6;
const { StatusSubscription } = require("../config/constants");
const {
  ValidLengthUserName,
  ValidLengthPassword,
} = require("../config/constants");

const userSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      min: ValidLengthUserName.MIN_LENGTH,
      max: ValidLengthUserName.MAX_LENGTH,
      default: "Guest",
    },
    email: {
      type: SchemaTypes.String,
      required: [true, "Set email for user"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: SchemaTypes.String,
      min: ValidLengthPassword.MIN_LENGTH,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: SchemaTypes.String,
      enum: {
        values: [
          StatusSubscription.STARTER,
          StatusSubscription.PRO,
          StatusSubscription.BUSINESS,
        ],
        message: "Status of subscription not allowed",
      },
      default: StatusSubscription.STARTER,
    },
    token: {
      type: SchemaTypes.String,
      default: null,
    },
    avatarURL: {
      type: SchemaTypes.String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    isVerified: { type: SchemaTypes.Boolean, default: false },
    verifyToken: {
      type: SchemaTypes.String,
      required: [true, "Verify token is required"],
      default: crypto.randomUUID(),
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
