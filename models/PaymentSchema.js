const { default: mongoose, model, Schema } = require('mongoose');

const PaymentModel = new mongoose.Schema(
    {
        razerPayOrderId: { type: Schema.Types.ObjectId, ref: 'products', default: null },
        razerPayUserId: { type: Schema.Types.ObjectId, ref: 'Users', default: null },
        razerPayPaymentId: { type: String, required: true },
        razerPaySignature: { type: String, required: true, unique: true },
        dateOfPayment: { type: Number, required: true, unique: true },
    },
    { timestamps: true }
);



module.exports = model('payment', PaymentModel);
