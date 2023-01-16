"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineJwt = void 0;
const env_1 = require("../../middleware/env");
const private_key_1 = require("./../../constants/private.key");
let jose = require('node-jose');
const LineJwt = async () => {
    let header = {
        alg: "RS256",
        typ: "JWT",
        kid: env_1.LINE_KID
    };
    let payload = {
        iss: "1657747186",
        sub: "1657747186",
        aud: "https://api.line.me/",
        exp: Math.floor(new Date().getTime() / 1000) + 60 * 30,
        token_exp: 60 * 60 * 24 * 30
    };
    let lineJwt = await jose.JWS.createSign({ format: 'compact', fields: header }, private_key_1.privateKey)
        .update(JSON.stringify(payload))
        .final();
    return lineJwt;
};
exports.LineJwt = LineJwt;
