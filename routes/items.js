const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

router.get("/", function(req,res){
    res.json({items});
  });

router.post("/", function(req,res){
    const newItem = {name : req.body.name, price : req.body.price};
    items.push(newItem);
    res.status(201).json({ added: newItem });
  });

router.get("/:name", function (req, res) {
  const itemGet = items.find(item => item.name === req.params.name);
  if(itemGet === undefined){
    throw new ExpressError("No item found", 404);
  }
  res.json({ item: itemGet });
});

router.patch("/:name", function (req, res) {
    const itemGet = items.find(item => item.name === req.params.name);
    if(itemGet === undefined){
      throw new ExpressError("No item found", 404);
    }
    itemGet.name = req.body.name;
    res.json({ updated: itemGet });
  });


router.delete("/:name", function (req, res) {
    const itemGet = items.findIndex(item => item.name === req.params.name);
    if(itemGet === undefined){
      throw new ExpressError("No item found", 404);
    }
    items.splice(itemGet, 1);
    res.json({ message: "Deleted" })
  });

module.exports = router;