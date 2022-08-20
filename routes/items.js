const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const Item = require("../item");

router.get("/", function(req, res, next){
    // get item list //
    try{
        return res.json({ items: Item.getAllItems() });
    } catch(err){
        return next(err)
    }
  });

router.post("/", function(req, res, next){
    // add item to item list //
    try {
        const newItem = new Item(req.body.name, req.body.price);
        return res.status(201).json({ added: newItem });
    } catch(err){
        return next(err)
    }
    
  });

router.get("/:name", function (req, res, next) {
    // get item that matches given name //
    try {
        const foundItem = Item.findItem(req.params.name);
        return res.json({item: foundItem});
    } catch (err){
        return next(err)
    }
  
});

router.patch("/:name", function (req, res, next) {
    // update item that matches given name //
    try {
        const foundItem = Item.updateItem(req.params.name, req.body);
        return res.json({updated: foundItem})
    } catch(err){
        return next(err)
    }
  });


router.delete("/:name", function (req, res, next) {
    // delete item that matches given name //
   try {
    Item.deleteItem(req.params.name);
    return res.json({message: 'Deleted'})
   } catch(err){
        return next(err)
   }
  });

module.exports = router;