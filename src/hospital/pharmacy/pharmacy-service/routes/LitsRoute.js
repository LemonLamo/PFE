const LitsController = require("../controllers/LitsController");
const router = require("express").Router();

router.get("", LitsController.getAll);
router.post("", LitsController.insert);
router.put("", LitsController.update);
router.delete("", LitsController.remove);

module.exports = router;
