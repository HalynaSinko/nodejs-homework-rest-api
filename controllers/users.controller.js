const jwt = require("jsonwebtoken");
const path = require("path");
const mkdirp = require("mkdirp");
const Users = require("../repository/users");
const UploadFileAvatar = require("../services/file-upload");
const { HttpCode } = require("../config/constants");
const EmailService = require("../services/email/service");
const { CreateSenderSendGrid } = require("../services/email/sender");
const User = require("../model/user");
const { CustomError } = require("../helpers/castomError");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signup = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    throw new CustomError(HttpCode.CONFLICT, "Email in use");
  }
  //TODO: Send email for verify user

  const newUser = await Users.create({
    email,
    password,
    name,
    subscription,
  });

  const emailService = new EmailService(
    process.env.NODE_ENV,
    new CreateSenderSendGrid()
  );
  const statusEmail = await emailService.sendVerifyEmail(
    newUser.email,
    newUser.name,
    newUser.verifyToken
  );

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
      successEmail: statusEmail,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findByEmail(email);
  const isValidPassword = await user?.isValidPassword(password);
  if (!user || !isValidPassword || !user?.isVerified) {
    throw new CustomError(HttpCode.UNAUTHORIZED, "Invalid credentials");
  }
  const id = user._id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.updateToken(id, token);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const getCurrentUser = (req, res, next) => {
  const user = req.user;
  console.log(user);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const updateUserSubscription = async (req, res, next) => {
  const id = req.user._id;
  const subscription = req.body.subscription;
  const user = await Users.updateSubscription(id, subscription);
  console.log(user);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const uploadAvatar = async (req, res, next) => {
  const id = String(req.user._id);
  const file = req.file;
  const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;
  const destination = path.join(AVATAR_OF_USERS, id);
  await mkdirp(destination);
  const uploadService = new UploadFileAvatar(destination);
  const avatarURL = await uploadService.save(file, id);
  await Users.updateAvatar(id, avatarURL);

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      avatar: avatarURL,
    },
  });
};

const verifyUser = async (req, res, next) => {
  const user = await Users.findUserByVerifyToken(req.params.verifyToken);

  if (user) {
    await Users.updateTokenVerify(user._id, true, null);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "Verification successful",
    });
  }

  throw new CustomError(HttpCode.NOT_FOUND, "User not found");
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);

  if (user?.isVerified) {
    throw new CustomError(
      HttpCode.BAD_REQUESR,
      "Verification has already been passed"
    );
  }

  if (user && !user.isVerified) {
    const { email, name, verifyToken } = user;

    const emailService = new EmailService(
      process.env.NODE_ENV,
      new CreateSenderSendGrid()
    );
    const statusEmail = await emailService.sendVerifyEmail(
      user.email,
      user.name,
      user.verifyToken
    );
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        message: "Verification email sent",
      },
    });
  }

  throw new CustomError(HttpCode.BAD_REQUESR, "Not found");
};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateUserSubscription,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
};
