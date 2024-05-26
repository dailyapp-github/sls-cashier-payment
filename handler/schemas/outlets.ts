import { Schema, model } from "mongoose";

export interface IOutlet {
	name: string;
	code: string;
}

const outletSchema = new Schema(
	{
		name: { type: String },
		code: { type: String },
	},
	{ collection: "outlets", timestamps: true }
);

const outlet = model<IOutlet>("outlets", outletSchema);
export default outlet;
