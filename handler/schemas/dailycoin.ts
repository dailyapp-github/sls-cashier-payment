import { Schema, Document, model, Types } from "mongoose";

interface IPoints extends Document {
	presentAmount: number;
	lastAmount: number;
	transaction: any;
	userId: Types.ObjectId;
	onUser: string;
	description: string | null;
}

const PointsSchema = new Schema<IPoints>(
	{
		presentAmount: { type: Number, required: true },
		lastAmount: { type: Number, required: true },
		transaction: { type: Schema.Types.Mixed, required: false, default: null },
		userId: { type: Schema.Types.ObjectId, required: true },
		onUser: { type: String, required: true },
		description: { type: String, default: null },
	},
	{ collection: "points", timestamps: true }
);

const Points = model<IPoints>("Points", PointsSchema);

export default Points;
