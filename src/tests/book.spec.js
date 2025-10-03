const chai = require("chai");
const expect = chai.expect;

const sinon = require("sinon");

const rewire = require("rewire");

const mongoose = require("mongoose");
const { body } = require("express-validator");
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
                console.log("boooks", books);
                expect(books).to.equal([sampleBook]);
             })
            .catch((err) => {
                throw new Error("Unexpected failure!");
            });
        });
    });

    // describe("GET /", () => {
    //     it("should get all books",  async () => {
    //         const req = {};
    //         const res = {
    //             status: sinon.stub().returnsThis(),
    //             send: sinon.stub()
    //         };
    //         try {
    //             const books = await bookController.getAllBooks(req, res);
    //             const sentBooks = res.send.getCall(0).args[0];
    //             console.log("boooookkkkksss", books, sentBooks);

    //             expect(sentBooks).to.deep.equal([sampleBook]);
    //             // expect(books).to.equal([sampleBook]);
    //         }
    //         catch (error) {
    //             throw new Error( error || "Unexpected failure!");
    //         }
    //     })
    // });

    // describe("Create a book", () => {
    //     const mockReq = (options) => {
    //         options.body  =  {
    //             title : "New Learning 2",
    //             author : "Jhon kennedy",
    //             description : "New way to success",
    //             publishedDate : "10/10/2019",
    //             genre : "Comedy",
    //             createdBy : "758437874583843987483"
    //         }
    //     };

    //     const mockRes = () => {
    //         const res = {};
    //         res.status = sinon.stub().returns(res);
    //         res.json = sinon.stub().returns(res);
    //         return res;
    //     };

    //     it("create a book successfully", async () => {
    //         try {
    //             const req = mockReq;
    //             const res = mockRes();
    //             const book = await bookController.createBook(req, res)
    //             console.log("create boooooookkkkk", book);
    //         // expect(actualResult).to.equal()
    //         } catch (error) {
    //             console.error(error.message || "Unexpected Failure")
    //         }

    //     })
    // })
})