import exampleConfig from "../requests/example-config";

export const errorCodes = ["400", "401", "403", "404", "409", "500"];
export const getErrorMessage = (status) => `custom ${status} from service`;
export const confgureResponses = (req, res, ctx, requestOptions) => {
    if(requestOptions[0].response === "404") {
        return res(
            ctx.status(404),
            ctx.text(exampleConfig.messages.notFound)
        );
    }
    for(let i = 0; i < requestOptions.length; i ++) {
        const options = requestOptions[i];

        if(req.url.href.includes(options.status)) {
            return res(
                ctx.status(options.status),
                ctx.text(options.response)
            );
        }
    }
    const option200 = requestOptions.find(o => o.status === 200);

    return res(
        ctx.status(200),
        ctx.json(option200.response)
    );

};
