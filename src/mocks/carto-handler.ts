import {MockedRequest, ResponseFunction, RestContext} from "msw";
import {StatusAndResponse} from "./StatusAndResponse";
import {errorCodes, getErrorMessage} from "./utils";
import AIR_QUALITY from "../../tests/test-data/AIR_QUALITY.json";
import {AirQuality} from "../models/AirQuality";
import STATISTICAL_MEASUREMENT from "../../tests/test-data/STATISTICAL_MEASUREMENT.json";
import TIME_SERIES from "../../tests/test-data/TIME_SERIES.json";

const getStatusAndResponse = (q: string | null): StatusAndResponse => {
    let status = 404;
    let successResponse;

    if (q) {
        if (
            q ===
            "select * from cartodb-gcp-backend-data-team.code_test.airquality_stations limit 10"
        ) {
            return {
                status: 200,
                successResponse: Object.assign(new AirQuality(), AIR_QUALITY)
            };
        } else if (errorCodes.includes(q)) {
            status = parseInt(q, 10);
        } else if (
            q ===
            "select avg(co) from cartodb-gcp-backend-data-team.code_test.airquality_measurements where timeinstant between '2016-07-01T00:00:00.000Z' and '2016-07-05T00:00:00.000Z'"
        ) {
            return {
                status: 200,
                successResponse: STATISTICAL_MEASUREMENT
            };
        } else if (
            q ===
            "select avg(co), timestamp_trunc(CAST(timeinstant AS TIMESTAMP), WEEK) AS step from cartodb-gcp-backend-data-team.code_test.airquality_measurements where station_id = '123' group by step order by step"
        ) {
            return {
                status: 200,
                successResponse: TIME_SERIES
            };
        }
    }

    return {successResponse, status};
};

export const handleCartoRequests = (
    req: MockedRequest,
    res: ResponseFunction,
    ctx: RestContext
) => {
    const q = req.url.searchParams.get("q");
    const {status, successResponse} = getStatusAndResponse(q);

    if (status === 200) {
        return res(ctx.status(200), ctx.json(successResponse));
    }
    return res(ctx.status(status), ctx.text(getErrorMessage(status)));
};
