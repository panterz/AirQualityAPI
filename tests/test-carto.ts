import request from "supertest";
import app from "../src/app";

const agent = request(app);

const checkBody = (body: any, noOfRows: number) => {
    expect(body.rows).not.toBeUndefined();
    expect(body.rows).toHaveLength(noOfRows);
    body.rows.forEach((row: any) => {
        expect(row.f0_).toBeDefined();
        expect(row.population).toBeDefined();
        expect(row.station_id).toBeDefined();
    });
};

const checkTimeSeriesBody = (body: any, noOfRows: number) => {
    expect(body.rows).not.toBeUndefined();
    expect(body.rows).toHaveLength(noOfRows);
    body.rows.forEach((row: any) => {
        expect(row.f0_).toBeDefined();
        expect(row.step).toBeDefined();
    });
};

export const sendSearchRequestAndTest = (
    status: number,
    errorMsg: string,
    done: CallableFunction,
    from: string,
    to: string,
    variable: string,
    statisticalMeasurement: string,
    noOfRows = 0
) => {
    const path = `/carto/measurement/?from=${from}&to=${to}&variable=${variable}&statisticalMeasurement=${statisticalMeasurement}`;

    agent
        .get(`${path}`)
        .set("Accept", "application/json")
        .expect(status)
        .end((err, res) => {
            if (!res.ok) {
                expect(res.text).toEqual(errorMsg);
            } else {
                checkBody(res.body, noOfRows);
            }
            if (err) {
                throw err;
            }
            done();
        });
};

export const sendTimeSeriesRequestAndTest = (
    status: number,
    errorMsg: string,
    done: CallableFunction,
    from: string,
    to: string,
    variable: string,
    statisticalMeasurement: string,
    stationId: string,
    step: string,
    noOfRows = 0
) => {
    const path = `/carto/time-series/?from=${from}&to=${to}&station_id=${stationId}&step=${step}&variable=${variable}&statisticalMeasurement=${statisticalMeasurement}`;

    agent
        .get(`${path}`)
        .set("Accept", "application/json")
        .expect(status)
        .end((err, res) => {
            if (!res.ok) {
                expect(res.text).toEqual(errorMsg);
            } else {
                checkTimeSeriesBody(res.body, noOfRows);
            }
            if (err) {
                throw err;
            }
            done();
        });
};
