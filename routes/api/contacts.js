const express = require("express");
const router = express.Router();

const ContactsController = require("../../controllers/contacts.controller");
const {
  validateContact,
  validateContactId,
  validateStatusContact,
} = require("./validation");

router.get("/", ContactsController.getAllContacts);

router.get("/:contactId", validateContactId, ContactsController.getContactById);

router.post("/", validateContact, ContactsController.addNewContact);

router.delete("/:contactId", ContactsController.removeContact);

router.put(
  "/:contactId",
  [validateContactId, validateContact],
  ContactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  [validateContactId, validateStatusContact],
  ContactsController.updateStatusContact
);

module.exports = router;
