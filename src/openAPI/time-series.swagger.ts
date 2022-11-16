export const getTimeSeries = {
    tags: ["Get time series for station for a given station"],
    description:
        "Timeseries time! Consider that somebody want to know how the air quality is evolving over the time. We need to create a new endpoint to return a timeserie per each station.",
    summary: "Returns a time series for a given station",
    parameters: [
        {
            name: "from",
            in: "query",
            required: true,
            schema: {
                type: "string",
                pattern:
                    "/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/g"
            }
        },
        {
            name: "to",
            in: "query",
            required: true,
            schema: {
                type: "string",
                pattern:
                    "/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/g"
            }
        },
        {
            name: "statisticalMeasurement",
            in: "query",
            required: true,
            schema: {
                type: "string",
                enum: ["avg", "min", "max", "count", "sum"]
            }
        },
        {
            name: "variable",
            in: "query",
            required: true,
            schema: {
                type: "string",
                enum: ["so2", "o2", "co", "o3", "pm10", "pm2_5"]
            }
        },
        {
            name: "step",
            in: "query",
            required: true,
            schema: {
                type: "string",
                enum: ["WEEK", "DAY", "HOUR"]
            }
        },
        {
            name: "station_id",
            in: "query",
            required: true,
            schema: {
                type: "string"
            }
        }
    ],
    responses: {
        "200": {
            description: "Returns a time series for stations",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            rows: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/TimeSeries"
                                }
                            }
                        }
                    }
                }
            }
        },
        "404": {
            description: "Not Found"
        },
        "400": {
            description: "Bad Request"
        }
    }
};
