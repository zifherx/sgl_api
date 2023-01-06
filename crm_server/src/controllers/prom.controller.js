import * as client from "prom-client";

//Prometheus
const prom_register = new client.Registry();

prom_register.setDefaultLabels({
    app: "crm_server",
});

client.collectDefaultMetrics({ register: prom_register });

const httpRequestDurationMicroseconds = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // 0.1 to 10 seconds
});

prom_register.registerMetric(httpRequestDurationMicroseconds);

const controller = {};

controller.getLoggerPrometheus = async (req, res) => {
    try {
        res.setHeader("Content-Type", prom_register.contentType);
        res.end(await prom_register.metrics());
    } catch (err) {
        console.log(err);
    }
};

export default controller;
