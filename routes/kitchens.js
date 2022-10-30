const {Router} = require("express");
const router = Router();
const validation = require("../middleware/validate");
const opencors = require('../middleware/opencors');

const {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../controllers/kitchens");


router.use([opencors]);
router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.put("/:id", validation.saveContact, updateContact);
router.delete("/:id", deleteContact);
router.post("/", validation.saveContact, createContact);

module.exports = router;
