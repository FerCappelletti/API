"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsEnabledFunction = void 0;
const corsEnabledFunction = (req, res) => {
    // Set CORS headers for preflight requests
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.set("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
    res.set("Access-Control-Max-Age", "3600");
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
};
exports.corsEnabledFunction = corsEnabledFunction;
