const fetch = require('node-fetch')
const { User } = require('../models');
const { where } = require('sequelize');
const { UNAUTHORIZATION_ERROR } = require('../core/errorResponse');
const base = "https://api-m.sandbox.paypal.com";
async function handleResponse(response) {
    try {
        // console.log('-------------------------- ::::: ', response.user.dataValues)
        const jsonResponse = await response.json();
        console.log('check user response  ------------ 222222222 :::: ', jsonResponse)

        return {
            jsonResponse,
            httpStatusCode: response.status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
class PaymentService {

    static generateAccessToken = async () => {
        try {
            if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
                throw new Error("MISSING_API_CREDENTIALS");
            }
            const auth = Buffer.from(
                PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
            ).toString("base64");
            const response = await fetch(`${base}/v1/oauth2/token`, {
                method: "POST",
                body: "grant_type=client_credentials",
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            });
            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error("Failed to generate Access Token:", error);
        }
    };

    static createOrder = async (data) => {
        // use the cart information passed from the front-end to calculate the purchase unit details
        console.log(
            "shopping cart information passed from the frontend createOrder() callback:",
            data,
        );
        const usdValue = +data.price * 1 / 23858
        const accessToken = await this.generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: usdValue.toFixed(1),
                    },
                },
            ],
        };

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        return handleResponse(response);
    };

    static captureOrder = async (orderID, data, userId) => {
        const accessToken = await this.generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            },
        });

        // check user 
        const user = await User.findOne({ where: { id: userId } })
        if (!user) throw new UNAUTHORIZATION_ERROR('user not found!')
        user.postStar = +data.postStar
        user.save()
        const { password, ...rest } = user
        response.user = rest;

        return handleResponse(response);
    };


}
module.exports = PaymentService