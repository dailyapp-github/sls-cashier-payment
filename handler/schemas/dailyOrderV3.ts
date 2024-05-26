import { Schema, Document, model, SchemaTypes } from "mongoose";

interface IDailyOrderV3 extends Document {
	code: string;
	userId: string | null;
	totalAmount: number;
	orderNumber: string;
	outletName: string;
	purchaseOrderId: string | null;
	feedbackId: string | null;
	complainId: string | null;
}

const DailyOrderV3Schema = new Schema<IDailyOrderV3>(
	{
		code: { type: String, required: true },
		userId: { type: SchemaTypes.ObjectId, required: true },
		totalAmount: { type: Number, required: true },
		orderNumber: { type: String, required: true },
		outletName: { type: String, required: true },
		purchaseOrderId: { type: SchemaTypes.ObjectId, required: true },
		feedbackId: { type: SchemaTypes.ObjectId, required: false, default: null },
		complainId: { type: SchemaTypes.ObjectId, required: false, default: null },
	},
	{ collection: "dailyOrderV3", timestamps: true }
);

const DailyOrderV3 = model<IDailyOrderV3>("DailyOrderV3", DailyOrderV3Schema);

export default DailyOrderV3;
