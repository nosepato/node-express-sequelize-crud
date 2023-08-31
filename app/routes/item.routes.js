module.exports = app => {
    const items = require("../controllers/item.controller");

    var router = require("express").Router();

    router.post("/", items.create);

    router.get("/", items.findAll);

    router.get("/flammables", items.findAllFlammables);

    router.get("/:id", items.findOne);

    router.put("/:id", items.update);

    router.delete("/:id", items.delete);

    router.delete("/", items.deleteAll);

    app.use('/api/items', router);
};