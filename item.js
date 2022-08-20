const items = require("./fakeDb");

class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;

        items.push(this)
    }

    static getAllItems(){
        return items
    }

    static findItem(name){
        const itemGet = items.find(item => item.name === name);
        if(itemGet === undefined){
            throw { message: "No Item Found", status: 404 }
        }
        return itemGet
    }

    static updateItem(name, reqBody){
        const itemGet = Item.findItem(name);
        if(itemGet === undefined){
            throw { message: "No Item Found", status: 404 }
        }
        itemGet.name = reqBody.name;
        return itemGet
    }

    static deleteItem(name){
        const itemGet = Item.findItem(name);

        if(itemGet === undefined){
          throw { message: "No Item Found", status: 404 }
        }
        items.splice(itemGet, 1);
    }
}

module.exports = Item;