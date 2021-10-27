const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  addNewContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");
const {
  validateContact,
  validateContactId,
  validateStatusContact,
} = require("./validation");
const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorHandler");

router.get("/", guard, wrapError(getAllContacts));

router.get("/:contactId", guard, validateContactId, wrapError(getContactById));

router.post("/", guard, validateContact, wrapError(addNewContact));

router.delete("/:contactId", guard, wrapError(removeContact));

router.put(
  "/:contactId",
  guard,
  [(validateContactId, validateContact)],
  wrapError(updateContact)
);

router.patch(
  "/:contactId/favorite",
  guard,
  [(validateContactId, validateStatusContact)],
  wrapError(updateStatusContact)
);

module.exports = router;
