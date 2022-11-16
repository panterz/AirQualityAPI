import {AirQualityVariable} from "../src/enums/AirQualityVariable";
import {HttpStatusCode} from "../src/enums/HttpStatusCode";
import {StatisticalMeasurement} from "../src/enums/StatisticalMeasurement";
import {sendTimeSeriesRequestAndTest} from "../tests/test-carto";

describe("Time series scenarios", () => {
    test("When no from date is passed an error should be thrown", (done) => {
        const errorMessage =
            "The parameter from  (timestamp) should be present";

        sendTimeSeriesRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "",
            "2016-07-05 00:00:00",
            AirQualityVariable.CO.toString(),
            StatisticalMeasurement.AVG.toString(),
            "123",
            ""
        );
    });

    test("When no to date is passed an error should be thrown", (done) => {
        const errorMessage = "The parameter to  (timestamp) should be present";

        sendTimeSeriesRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "2016-07-01 00:00:00",
            "",
            AirQualityVariable.CO.toString(),
            StatisticalMeasurement.AVG.toString(),
            "123",
            ""
        );
    });

    test("When no step is provide", (done) => {
        const errorMessage =
            "The parameter step should be present. Allowed values: (WEEK,DAY,HOUR)";

        sendTimeSeriesRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "2016-07-01 00:00:00",
            "2016-07-05 00:00:00",
            AirQualityVariable.CO.toString(),
            StatisticalMeasurement.AVG.toString(),
            "123",
            ""
        );
    });

    test("When the stationId is not passed then an error should be thrown", (done) => {
        const errorMessage = "The stationId should be passed";

        sendTimeSeriesRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "2016-07-01 00:00:00",
            "2016-07-05 00:00:00",
            AirQualityVariable.CO.toString(),
            StatisticalMeasurement.AVG.toString(),
            "",
            "week"
        );
    });

    test("When the air quality variable is invalid, then it should throw an error", (done) => {
        const errorMessage =
            "The parameter variable should be present. Allowed values: (so2,no2,co,o3,pm10,pm2_5)";

        sendTimeSeriesRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "2016-07-01 00:00:00",
            "2016-07-05 00:00:00",
            "boo",
            StatisticalMeasurement.AVG.toString(),
            "123",
            "week"
        );
    });

    test("When the air quality variable is invalid, then it should throw an error", (done) => {
        const errorMessage =
            "The parameter statisticalMeasurement should be present. Allowed values: (avg,min,max,sum,count)";

        sendTimeSeriesRequestAndTest(
            HttpStatusCode.BAD_REQUEST,
            errorMessage,
            done,
            "2016-07-01 00:00:00",
            "2016-07-05 00:00:00",
            AirQualityVariable.CO.toString(),
            "",
            "123",
            "week"
        );
    });

    test("When all the parameters are valid then it should return a result", (done) => {
        sendTimeSeriesRequestAndTest(
            HttpStatusCode.OK,
            "",
            done,
            "2016-07-01 00:00:00",
            "2016-07-05 00:00:00",
            AirQualityVariable.CO.toString(),
            StatisticalMeasurement.AVG.toString(),
            "123",
            "week"
        );
    });
});
