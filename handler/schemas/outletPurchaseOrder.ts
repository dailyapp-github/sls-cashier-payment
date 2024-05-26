import { model, Schema, SchemaTypes } from "mongoose";

export interface IOutletPurchase {
	purchaseId: string;
	outletId: string;
	userId: string;
}

const outletPurchaseSchema = new Schema(
	{
		purchaseId: { type: SchemaTypes.ObjectId, required: true },
		outletId: { type: SchemaTypes.ObjectId, required: true },
		userId: { type: SchemaTypes.ObjectId, required: true },
	},
	{ collection: "outletPurchases", timestamps: true }
);

const OutletPurchase = model<IOutletPurchase>("OutletPurchase", outletPurchaseSchema);
export default OutletPurchase;
