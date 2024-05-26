import { Schema, SchemaTypes, model } from "mongoose";

export interface IPayment {
	userId: string;
	posCode: string;
	idrAmount: number;
	pointAmount: number;
	pointCashback: number;
	outletId: string;
	status: string;
}

const paymentSchema = new Schema(
	{
		userId: { type: SchemaTypes.ObjectId },
		posCode: { type: String },
		idrAmount: { type: Number },
		pointAmount: { type: Number },
		pointCashback: { type: Number },
		outletId: { type: SchemaTypes.ObjectId },
		status: { type: String },
	},
	{ collection: "cointPayments", timestamps: true }
);

const payment = model<IPayment>("payment", paymentSchema);
export default payment;
