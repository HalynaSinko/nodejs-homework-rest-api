const User = require("../model/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = (email) => {
  return User.findOne({ email });
};

const findUserByVerifyToken = (verifyToken) => {
  return User.findOne({ verifyToken });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateTokenVerify = async (id, isVerified, verifyToken) => {
  return await User.updateOne({ _id: id }, { isVerified, verifyToken });
};

const updateSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { subscription },
    { new: true }
  );
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

module.exports = {
  findById,
  findByEmail,
  findUserByVerifyToken,
  create,
  updateToken,
  updateTokenVerify,
  updateSubscription,
  updateAvatar,
};
