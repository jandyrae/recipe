const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");

const {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/kitchens");

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.put("/:id", validation.saveContact, updateContact);
router.delete("/:id", deleteContact);
router.post("/", validation.saveContact, createContact);

module.exports = router;
