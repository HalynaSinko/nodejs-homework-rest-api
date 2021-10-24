const User = require("../model/user");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = (email) => {
  // console.log(email);
  return User.findOne({ email });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { subscription },
    { new: true }
  );
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateSubscription,
};
