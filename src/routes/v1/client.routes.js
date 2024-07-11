const router = require("express").Router();

const ClientsController = require("../../controllers/ClientsController");

router.get("/", ClientsController.index);
router.get("/:id", ClientsController.index);
router.post("/", ClientsController.store);
router.put("/:id", ClientsController.update);
router.delete("/:id", ClientsController.destroy);

module.exports = router;
