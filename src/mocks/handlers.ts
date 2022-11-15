// src/mocks/handlers.js
import {rest} from "msw";
import {BASE_URL} from "../properties";

import {handleCartoRequests} from "./carto-handler";

export const handlers = [
    rest.post("/login", (req, res, ctx) => {
        // Persist user's authentication in the session
        //sessionStorage.setItem("is-authenticated", true);

        return res(
            // Respond with a 200 status code
            ctx.status(200)
        );
    }),

    rest.get(`${BASE_URL}/v3/sql/carto_dw/query`, (req, res, ctx) =>
        handleCartoRequests(req, res, ctx)
    )
];
