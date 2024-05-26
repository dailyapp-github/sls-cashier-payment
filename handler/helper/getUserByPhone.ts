import DailyUser from "../schemas/dailyUser";

const getUserByPhone = async (phone: string) => {
	try {
		const get = await DailyUser.find({
			"phone.number": phone,
			isDeleted: false,
		});

		const data: any = get.length > 0 ? get[0] : null;
		const res = { isRegister: true, isBanned: false, user: data };
		res.isBanned =
			(data && data.isPermanentBanned === true) || (data && data.isTemporaryBanned === true) ? true : false;
		res.isRegister = data ? true : false;
		return res;
	} catch (error) {
		console.log("detail user :: ", error);
		throw error;
	}
};

export default getUserByPhone;
