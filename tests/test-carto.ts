import request from "supertest";
import app from "../src/app";

const agent = request(app);

const checkBody = (body: any) => {
    expect(body.rows).not.toBeUndefined();
};

export const sendSearchRequestAndTest = (
    status: number,
    errorMsg: string,
    done: CallableFunction,
    from: string,
    to: string,
    variable: string,
    statisticalMeasurement: string
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
                checkBody(res.body);
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
    step: string
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
                checkBody(res.body);
            }
            if (err) {
                throw err;
            }
            done();
        });
};
