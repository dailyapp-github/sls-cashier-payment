import DailyUser from "../schemas/dailyUser";
import uidProvider from "./uidProvider";

const createUser = async (phone: string, name: string) => {
	try {
		const post = await new DailyUser({
			imageProfile: null,
			isDeleted: false,
			fullName: name || `user-${phone.slice(-4)}`,
			phone: { number: phone, verified: false },
			email: null,
			birthDate: null,
			code: null,
			uid: await uidProvider(),
			level: 0,
			leadSource: "cashier-registration",
			employeeId: null,
			agreementApproved: true,
			lastLogin: new Date(),
			isTemporaryBanned: false,
			isPermanentBanned: false,
		}).save();
		return post;
	} catch (error) {
		throw error;
	}
};

export default createUser;
