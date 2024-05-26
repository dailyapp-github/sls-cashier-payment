import { Schema, SchemaTypes, model } from "mongoose";

interface IOtpPaymentRequest {
	code: string;
	coin: number;
	isVerified: boolean;
	outletId: string;
	phoneNumber: string;
}

const otpPaymentRequestSchema = new Schema(
	{
		code: { type: String },
		coin: { type: Number },
		isVerified: { type: Boolean, default: false },
		outletId: { type: SchemaTypes.ObjectId },
		phoneNumber: { type: String },
	},
	{ collection: "otpPaymentRequest", timestamps: true }
);

const otpPaymentRequest = model<IOtpPaymentRequest>("otpPaymentRequest", otpPaymentRequestSchema);
export default otpPaymentRequest;
