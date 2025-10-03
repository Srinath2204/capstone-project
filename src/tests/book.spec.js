const chai = require("chai");
const expect = chai.expect;

const sinon = require("sinon");

const rewire = require("rewire");

const mongoose = require("mongoose");
const sandbox = sinon.createSandbox();


let bookController = rewire("../controllers/book.controller");

describe("test/book", () => {
    let sampleBook;
    let findStub;
    let findOneStub;
    let findOneAndUpdateStub;

    beforeEach(() => {
       sampleBook = {
        title : "New Book",
        author: "Jhon",
        description: "The path to success",
        publishedDate: "10/10/2018",
        createdBy: "48974853784043",
        genre: "Action"
       },
       findStub = sandbox.stub(mongoose.Model, "find").resolves([sampleBook]);
       findOneStub = sandbox.stub(mongoose.Model, "findOne").resolves(sampleBook);
       findOneAndUpdateStub = sandbox.stub(mongoose.Model, "findOneAndUpdate").resolves(sampleBook);
    });

    afterEach(() => {
        bookController = rewire("../controllers/book.controller");
        sandbox.restore();
    });

    describe("GET /", () => {
        it("should get all books", async () => {
            bookController.getAllBooks()
            .then((books) => {
            expect(books).to.equal([sampleBook]);
        })
        .catch((err) => {
          throw new Error("Unexpected failure!");
        });
    });

    // describe("Create a book", () => {
    //     it("create a book successfully", () => {
    //         const actualResult = createBook();
    //         expect(actualResult).to.equal()
    //     })
    // })
  });

})