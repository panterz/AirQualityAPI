import {AirQualityVariable} from "../../src/enums/AirQualityVariable";
import {StatisticalMeasurement} from "../../src/enums/StatisticalMeasurement";
import {ApiFilter} from "../../src/models/ApiFilter";
import {StatisticalMeasurementService} from "../../src/services/StatisticalMeasurementService";
import STATITISTICAL_MEASUREMENT from "../../tests/test-data/STATISTICAL_MEASUREMENT.json";

describe("StatisticalMeasurementService", () => {
    let testee: StatisticalMeasurementService;

    beforeEach(() => {
        testee = new StatisticalMeasurementService();
    });

    test("When the query is for AVG(CO) between the dates 2016-07-01 00:00:00 and 2016-07-05 00:00:00 should return results", async () => {
        const filter: ApiFilter = {
            from: new Date("2016-07-01 00:00:00 UTC"),
            to: new Date("2016-07-05 00:00:00 UTC"),
            statisticalMeasurement: StatisticalMeasurement.AVG,
            statisticalVariable: AirQualityVariable.CO
        };
        const result = await testee.getMeasurement(filter);

        expect(result).toEqual(STATITISTICAL_MEASUREMENT);
    });
});
