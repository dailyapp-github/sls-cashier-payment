import mongoose, { Schema, Document, SchemaTypes } from "mongoose";

export interface PurchaseOrder extends Document {
	orderId: string;
	billId: string;
	menus: any[];
	buyerData: object | null;
	customerId: string | null;
	driverId: string | null;
	tableType: string;
	paymentType: any[];
	totalPayment: number;
	orderDate: string;
}

const PurchaseOrderSchema: Schema = new Schema(
	{
		orderId: { type: String, required: true },
		billId: { type: String, required: true },
		menus: { type: [Schema.Types.Mixed], required: true },
		buyerData: { type: Schema.Types.Mixed, default: null },
		customerId: { type: String, default: null },
		driverId: { type: String, default: null },
		tableType: { type: String, required: true },
		paymentType: { type: [Schema.Types.Mixed], required: true },
		totalPayment: { type: Number, required: true },
		orderDate: { type: String, required: true },
	},
	{ timestamps: true }
);

const PurchaseOrderModel = mongoose.model<PurchaseOrder>("PurchaseOrder", PurchaseOrderSchema, "dailyPurchaseOrders");

export default PurchaseOrderModel;
