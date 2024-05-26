import { model, Schema, SchemaTypes } from "mongoose";

export interface IProgress {
	userId: string;
	progressValue: number;
	progresStatus: string;
}

const progressSchema = new Schema(
	{
		userId: { type: SchemaTypes.ObjectId, required: true },
		progressValue: { type: Number, required: false, default: 0 },
		progresStatus: { type: String, required: true },
	},
	{ collection: "dailyFeedbackProgress", timestamps: true }
);

const Progress = model<IProgress>("Progress", progressSchema);
export default Progress;
