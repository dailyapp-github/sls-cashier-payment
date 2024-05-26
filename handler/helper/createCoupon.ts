import moment = require("moment");
import RaffleCoupon from "../schemas/raffleCoupon";

const createCoupon = async (userId: string) => {
	try {
		console.log("UDAH DISISNI");

		const post = await new RaffleCoupon({
			code: await createCodeCoupon(),
			userId: userId,
			leadResource: "undian-nasi-tempong",
			isWinner: false,
			gift: "",
			raffleAt: moment.utc("2024-04-13").valueOf(),
		}).save();

		console.log("POST", post);

		return post;
	} catch (error) {
		console.log("err coupon", error);

		throw error;
	}
};

export default createCoupon;

const createCodeCoupon = async () => {
	try {
		console.log("CODE GEN");

		let dataCoupon;
		let code: string = "";

		do {
			code = codeGenerator();
			dataCoupon = await RaffleCoupon.findOne({ code: code });
			console.log("cou", dataCoupon);
		} while ((dataCoupon = null));
		return code;
	} catch (error) {}
};

const codeGenerator = () => {
	const character = "1234567890";
	let result = "";
	for (let index = 0; index < 6; index++) {
		result += character[Math.floor(Math.random() * character.length)];
	}
	console.log("RESCODE", result);

	return `KNT-${result}`;
};
