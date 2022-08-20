process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");

const items = require("../fakeDb");

let testItem = {name: "milk", price: "4.50"};

beforeEach(() => {
    items.push(testItem);
});

afterEach(() => {
    testItem.length = 0;
});

describe("GET /items", () => {
    test("Get item list", async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [testItem]});
      });
});

describe("POST /items", ()=> {
    test("Add item to list", async function() {
        const resp = await request(app).post('/items').send({name:"cheese", price:"2.00"});
       
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({added: {name: "cheese", price:"2.00"}});
      });
});

describe("GET /items/:name", () => {
    test("Get item by name", async function() {
        const resp = await request(app).get(`/items/${testItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: testItem});
      });
});

describe("PATCH /items/:name", () => {
    test("Patch item that matches name", async function() {
        const resp = await request(app).patch(`/items/${testItem.name}`).send({name: "cheese"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated: testItem});
        expect(resp.body.updated.name).toContain("cheese");
      });
});

describe("DELETE /items/:name", () => {
    test("DELETE item that matches name", async function() {
        const resp = await request(app).delete(`/items/${testItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: "Deleted"});
      });
});