import {AirQualityVariable} from "../src/enums/AirQualityVariable";
import {HttpStatusCode} from "../src/enums/HttpStatusCode";
import {StatisticalMeasurement} from "../src/enums/StatisticalMeasurement";
import {sendSearchRequestAndTest} from "./test-carto";

describe("Statistical measurement scenarios", () => {
    test("When no from date is passed an error should be thrown", (done) => {
        const errorMessage =
            "The parameter from  (timestamp) should be present";

        sendSearchRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "",
            "2016-07-01 00:00:00",
            AirQualityVariable.CO.toString(),
            StatisticalMeasurement.AVG.toString()
        );
    });

    test("When no to date is passed an error should be thrown", (done) => {
        const errorMessage = "The parameter to  (timestamp) should be present";

        sendSearchRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "2016-07-01 00:00:00",
            "",
            AirQualityVariable.CO.toString(),
            StatisticalMeasurement.AVG.toString()
        );
    });

    test("When the air quality variable is invalid, then it should throw an error", (done) => {
        const errorMessage =
            "The parameter variable should be present. Allowed values: (so2,no2,co,o3,pm10,pm2_5)";

        sendSearchRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "2016-07-01 00:00:00",
            "2016-07-05 00:00:00",
            "booo",
            StatisticalMeasurement.AVG.toString()
        );
    });

    test("When the air quality variable is invalid, then it should throw an error", (done) => {
        const errorMessage =
            "The parameter statisticalMeasurement should be present. Allowed values: (avg,min,max,sum,count)";

        sendSearchRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "2016-07-01 00:00:00",
            "2016-07-05 00:00:00",
            AirQualityVariable.CO.toString(),
            "boo"
        );
    });

    test("When all the parameters are valid then it should return a result", (done) => {
        sendSearchRequestAndTest(
            HttpStatusCode.OK,
            "",
            done,
            "2016-07-01 00:00:00",
            "2016-07-05 00:00:00",
            AirQualityVariable.CO.toString(),
            StatisticalMeasurement.AVG.toString(),
            10
        );
    });
});
