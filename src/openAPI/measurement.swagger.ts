export const getMeasurement = {
    tags: ["Get Statistical Measurement for stations"],
    description: "Returns a statistical measurement for stations",
    summary: "Returns a statistical measurement for stations",
    produces: ["application/json"],
    operationId: "getMeasurement",
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
        }
    ],
    responses: {
        "200": {
            description: "Returns a statistical measurement",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            rows: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/MeasurementResult"
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
