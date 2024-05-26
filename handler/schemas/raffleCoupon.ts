import { Schema, SchemaTypes, model } from "mongoose";

export interface IRaffleCoupon {
	code: string;
	userId: string;
	leadResource: string;
	isWinner: boolean;
	gift: string;
	raffleAt: string;
}

const raffleCouponSchema = new Schema(
	{
		code: { type: String, required: true },
		userId: { type: SchemaTypes.ObjectId, required: true },
		leadResource: { type: String, required: false, default: "" },
		isWinner: { type: Boolean, required: false, default: false },
		gift: { type: String, required: false, default: "" },
		raffleAt: { type: Date, required: false, default: null },
	},
	{ collection: "raffleCoupons", timestamps: true }
);

const RaffleCoupon = model<IRaffleCoupon>("RaffleCoupon", raffleCouponSchema);
export default RaffleCoupon;
