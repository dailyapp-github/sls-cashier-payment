import DailyUser from "../schemas/dailyUser";

const getCode = (type: string) => {
	const number = "0123456789";
	const character = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	const char = type === "number" ? number : character;
	let result = "";
	for (let index = 0; index < 6; index++) {
		result += char[Math.floor(Math.random() * char.length)];
	}
	return result;
};

const uidProvider = async () => {
	let uids;
	let data;
	do {
		uids = getCode("character");
		data = await DailyUser.findOne({ uid: uids });
	} while ((data = null));

	return uids;
};

export default uidProvider;
