const Contacts = require("../repository/contacts");
const { CustomError } = require("../helpers/castomError");
const { HttpCode } = require("../config/constants");

const getAllContacts = async (req, res, next) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...data } });
};

const getContactById = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

const addNewContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, data: { contact } });
};

const removeContact = async (req, res, next) => {
  const userId = req.user._id;
  const deleted = await Contacts.removeContact(req.params.contactId, userId);
  if (deleted) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "contact deleted",
    });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

const updateContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

const updateStatusContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  console.log(contact);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
