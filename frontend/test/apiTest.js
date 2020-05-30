const chai = require("chai");
const {expect} = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);


describe("API", () => {
    it ("API should respond with status 200 on '172.29.1.1'", (done) => {
        chai.request("http://172.29.1.1:5000").get("/api/adventure").end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    it ("API should contain header Access-Control-Allow-Origin", (done) => {
        chai.request("http://172.29.1.1:5000").get("/api/adventure").end((err, res) => {
            expect(res).to.have.header("Access-Control-Allow-Origin")
            done();
        });
    });
});