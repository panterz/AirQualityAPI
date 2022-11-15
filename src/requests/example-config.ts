export default {
    baseUrl: "/plans/creator/api",
    classification: {
        version: "v1",
        serviceApi: "/classifications"
    },
    draftplan: {
        version: "v2",
        serviceApi: "/draftplan"
    },
    tempdraftplan: {
        version: "v2",
        serviceApi: "/tempdraftplan"
    },
    style: {
        version: "v1",
        serviceApi: "/styles"
    },
    messages: {
        requestFailed:
            "There's a problem. The Draft Plan Service is currently unavailable",
        notFound: "Draft plan could not be found"
    }
};
