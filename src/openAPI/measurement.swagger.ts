export const getMeasurement = {
    tags: ["Get Statistical Measurement for stations"],
    description:
        "It returns the requested statistical measurement for a given variable for each station. It also includes how much population the value affect. Statistical measurements such as average, min, max, sum, count can be calculated",
    summary: "Returns a statistical measurement for stations",
    produces: ["application/json"],
    operationId: "getMeasurement",
    parameters: [
        {
            name: "from",
            in: "query",
            required: true,
            schema: {
                type: "string"
            }
        },
        {
            name: "to",
            in: "query",
            required: true,
            schema: {
                type: "string"
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
