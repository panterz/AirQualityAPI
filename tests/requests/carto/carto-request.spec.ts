import {HTTP400Error, HTTP404Error} from "../../../src/error/BaseError";
import CartoRequest from "../../../src/requests/carto/carto-request";
import AIR_QUALITY from "../../test-data/AIR_QUALITY.json";
import cartoConfig from "../../../src/requests/carto/config.json";

describe("DraftPlanRequest - getQuery", () => {
    let testee: CartoRequest;
    const q =
        "select * from cartodb-gcp-backend-data-team.code_test.airquality_stations limit 10";
    const token = "12345";

    beforeEach(() => {
        testee = new CartoRequest();
    });

    test("should return a successful response", async () => {
        const airQuality = await testee.getQuery(q, token);

        expect(airQuality).toEqual(AIR_QUALITY);
    });

    ["400"].forEach((status: string) => {
        test(`should return an empty response for request failed due to a ${status} status`, async () => {
            await expect(testee.getQuery(status, token)).rejects.toEqual(
                new HTTP400Error(cartoConfig.messages.requestFailed)
            );
        });
    });

    test("should return an empty response for request failed due to a 404 status", async () => {
        await expect(testee.getQuery("404", token)).rejects.toEqual(
            new HTTP404Error(cartoConfig.messages.notFound)
        );
    });

    test("should return an empty response for request failed due to a 404 status", async () => {
        await expect(testee.getQuery("500", token)).rejects.toEqual(
            new HTTP400Error(cartoConfig.messages.requestFailed)
        );
    });
});
