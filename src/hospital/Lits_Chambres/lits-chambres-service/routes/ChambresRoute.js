const ChambresController = require("../controllers/ChambresController");
const router = require("express").Router();

router.get("", ChambresController.getAll);
router.post("", ChambresController.insert);
router.get("/:num", ChambresController.getOne);
router.put("", ChambresController.update);
router.delete("/:num", ChambresController.remove);

module.exports = router;
