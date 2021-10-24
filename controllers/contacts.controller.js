const Contacts = require("../repository/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contacts = await Contacts.listContacts(userId);
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.getContactById(req.params.contactId, userId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    res.status(201).json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  console.log(req.params);
  try {
    const userId = req.user._id;
    const deleted = await Contacts.removeContact(req.params.contactId, userId);
    if (deleted) {
      return res
        .status(200)
        .json({ status: "success", code: 200, message: "contact deleted" });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId
    );
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  console.log(req.params.contactId);
  try {
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId
    );
    console.log(contact);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
