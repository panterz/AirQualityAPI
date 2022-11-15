import request from "supertest";
import app from "../src/app";
import generic from "../tests/test-data/generic.json";
import {HttpStatusCode} from "../src/enums/HttpStatusCode";

const agent = request(app);
const sendRequestAndTest = (param:string, status:number, errorMsg:string, responseBody:string, done:CallableFunction) => {
    agent.get("/hello/?param=" + param)
        .set("Accept", "application/json")
        .send()
        .expect(status)
        .end((err, res) => {
            if(!res.ok) {
                expect(res.text).toEqual(errorMsg);
            } else {
                expect(res.text).toEqual(responseBody);
            }
            if(err) {
                throw(err);
            }
            done();
        });
};

describe("get example ", () => {
    test("Get successful request", (done) => {
        sendRequestAndTest("success", HttpStatusCode.OK, "", JSON.stringify(generic), done);
    });
});
