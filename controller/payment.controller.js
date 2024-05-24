const { CREATE, SuccessResponse } = require("../core/successResponse");
const PaymentService = require("../service/payment.service");

class PaymentController {
    static async configPayment(req, res) {
        return new SuccessResponse({
            message: 'config payment successfully!',
            metadata: process.env.CLIENT_ID
        }).send(res)
    }
    static async createOrder(req, res) {
        try {
            // use the cart information passed from the front-end to calculate the order amount detals
            const { data } = req.body;
            console.log('check ddata', data)
            const { jsonResponse, httpStatusCode } = await PaymentService.createOrder(data);
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to create order." });
        }
    }
    static async captureOrder(req, res) {
        try {
            const user = req.user
            const { orderID, data } = req.body;
            const { jsonResponse, httpStatusCode } = await PaymentService.captureOrder(orderID, data, user.id);
            res.status(httpStatusCode).json(jsonResponse);
        } catch (error) {
            console.error("Failed to create order:", error);
            res.status(500).json({ error: "Failed to capture order." });
        }
    }

}
module.exports = PaymentController