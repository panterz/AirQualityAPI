import {getTimeSeries} from "./openAPI/time-series.swagger";
import {getMeasurement} from "./openAPI/measurement.swagger";

export default {
    openapi: "3.0.1",
    info: {
        version: "1.0.0",
        title: "Air Quality API",
        description: "Air Quality API",
        license: {
            name: "ISC",
            url: "https://opensource.org/licenses/ISC"
        }
    },
    basePath: "/",
    tags: [
        {
            name: "Air Quality API",
            description: "Air Quality API"
        }
    ],
    paths: {
        "/carto/measurement": {
            get: getMeasurement
        },
        "/carto/time-series": {
            get: getTimeSeries
        }
    },
    components: {
        schemas: {
            TimeSeries: {
                type: "object",
                properties: {
                    f0_: {
                        type: "number",
                        example: 15.979461088352439
                    },
                    step: {
                        type: "string",
                        example: "2016-10-09T00:00:00.000Z"
                    }
                }
            },
            MeasurementResult: {
                type: "object",
                properties: {
                    f0_: {
                        type: "number",
                        example: 15.979461088352439
                    },
                    population_: {
                        type: "number",
                        example: 15.979461088352439
                    },
                    station_id: {
                        type: "string",
                        example: "aq_uam"
                    }
                }
            }
        }
    },
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"]
};
