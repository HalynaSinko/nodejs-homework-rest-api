const express = require("express");
const router = express.Router();

const ContactsController = require("../../controllers/contacts.controller");
const {
  validateContact,
  validateContactId,
  validateStatusContact,
} = require("./validation");
const guard = require("../../helpers/guard");

router.get("/", guard, ContactsController.getAllContacts);

router.get(
  "/:contactId",
  guard,
  validateContactId,
  ContactsController.getContactById
);

router.post("/", guard, validateContact, ContactsController.addNewContact);

router.delete("/:contactId", guard, ContactsController.removeContact);

router.put(
  "/:contactId",
  guard,
  [(validateContactId, validateContact)],
  ContactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  [(validateContactId, validateStatusContact)],
  ContactsController.updateStatusContact
);

module.exports = router;
