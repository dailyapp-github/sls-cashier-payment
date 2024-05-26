import { Schema, Document, model, SchemaTypes } from "mongoose";

interface IAspalTransaction extends Document {
	operator: string;
	reasonId: string | null;
	trxNumber: string;
	onReason: string;
	userId: string | null;
	onUser: string;
	type: string;
	point: number;
	lastPoint: number;
	outlet: string | null;
	product: string | null;
}

const AspalTransactionSchema = new Schema<IAspalTransaction>(
	{
		operator: { type: String, required: true },
		reasonId: { type: SchemaTypes.ObjectId, required: true },
		trxNumber: { type: String, required: true },
		onReason: { type: String, required: true },
		userId: { type: SchemaTypes.ObjectId, required: true },
		onUser: { type: String, required: true },
		type: { type: String, required: true },
		point: { type: Number, required: true },
		lastPoint: { type: Number, required: true },
		outlet: { type: SchemaTypes.ObjectId, default: null },
		product: { type: String, default: null },
	},
	{ collection: "aspalTransactions", timestamps: true }
);

const AspalTransaction = model<IAspalTransaction>("AspalTransaction", AspalTransactionSchema);

export default AspalTransaction;
