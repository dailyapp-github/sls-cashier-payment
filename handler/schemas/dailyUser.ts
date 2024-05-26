import { model, Schema, SchemaTypes } from "mongoose";
export interface IDailyUser {
	isDeleted?: boolean;
	fullName: string;
	email: IUserEmail | null;
	phone: IUserPhone | null;
	birthDate: string;
	code: string | null;
	gender: string;
	uid: string;
	level: number;
	leadSource: string;
	employeeId: string | null;
	agreementApproved: boolean;
	lastLogin: string | null;
	isTemporaryBanned: boolean | null;
	isPermanentBanned: boolean | null;
	imageProfile: string | null;
	createdAt: Date;
	updateAt: Date;
	personalData?: null;
}

interface IUserPhone {
	number: string;
	verified: boolean;
}

interface IUserEmail {
	address: string;
	verified: boolean;
}
const dailyUserSchema = new Schema(
	{
		isDeleted: { type: Boolean, required: false, default: false },
		fullName: { type: String, required: true },
		email: { type: SchemaTypes.Mixed, required: false, default: null },
		phone: { type: SchemaTypes.Mixed, required: false, default: null },
		birthDate: { type: Date, required: false, default: null },
		code: { type: String, required: false, default: null },
		gender: { type: String, required: false, default: null },
		level: { type: Number, required: false, default: 0 },
		leadSource: { type: String, required: false, default: "dailyapps" },
		uid: { type: String, required: false, default: null },
		employeeId: { type: String, required: false, default: null },
		agreementApproved: { type: Boolean, required: false, default: false },
		lastLogin: { type: Date, required: false, default: null },
		isTemporaryBanned: { type: Boolean, required: false, default: false },
		isPermanentBanned: { type: Boolean, required: false, default: false },
		imageProfile: { type: String, required: false, default: null },
	},
	{ collection: "dailyUsers", timestamps: true }
);
const DailyUser = model<IDailyUser>("DailyUser", dailyUserSchema);
export default DailyUser;
