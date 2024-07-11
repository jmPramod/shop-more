const express = require('express');
const { getAllPayment } = require('../../controller/REST_Controller/paymentController');

const paymentRouteRest = express.Router();
paymentRouteRest.get("/all-payment", getAllPayment)
module.exports = { paymentRouteRest };