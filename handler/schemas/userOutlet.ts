import { model, Schema, SchemaTypes } from "mongoose";

export interface IUserOutlet {
	userId: string;
	outletId: string;
}

const userOutletSchema = new Schema(
	{
		userId: { type: SchemaTypes.ObjectId, required: true },
		outletId: { type: SchemaTypes.ObjectId, required: true },
	},
	{ collection: "userOutlets", timestamps: true }
);

const UserOutlet = model<IUserOutlet>("UserOutlet", userOutletSchema);
export default UserOutlet;
