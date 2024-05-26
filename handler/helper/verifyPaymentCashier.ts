import payment from "../schemas/payment";
import * as moment from "moment";
import Points from "../schemas/dailycoin";
import AspalTransaction from "../schemas/transactions";

const verifyPayment = async (coin: number, lastCoin: number, userId: string, code: string, outletId: string) => {
	try {
		const paymentPost = await new payment({
			userId: userId,
			posCode: await CreatePaymentCode(),
			idrAmount: coin * 1000,
			pointAmount: coin,
			pointCashback: 0,
			outletId: outletId,
			status: "PAID",
		}).save();

		const paymentTrx = await createTransaction(paymentPost._id.toString(), userId, coin, lastCoin, outletId);
		const postCoin = await createCoin(paymentTrx, coin, lastCoin, userId);

		return { ...paymentPost.toObject(), postCoin };
	} catch (error) {
		throw error;
	}
};

export default verifyPayment;

const CreatePaymentCode = async () => {
	let code: string = "";
	let codePC: any;
	do {
		code = getCode();
		codePC = await payment.find({ posCode: code });
	} while (codePC.length > 0);

	return code;
};

const getCode = () => {
	let result = "";
	const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	for (let index = 0; index < 6; index++) {
		result += charset[Math.floor(Math.random() * charset.length)];
	}
	return result;
};

const createTransaction = async (
	reasonId: string,
	userId: string,
	coin: number,
	lastCoin: number,
	outletId: string
) => {
	try {
		const date = moment(new Date()).format("DDMMYY");
		const code = `${date}-${Math.floor(1000 + Math.random() * 9000)}`;

		const post = await new AspalTransaction({
			operator: "CREDIT",
			trxNumber: `DCP-${code}`,
			reasonId: reasonId,
			onReason: "CoinPayment",
			userId: userId,
			onUser: "DailyUser",
			type: "POINT-PAYMENT",
			point: coin,
			outlet: outletId,
			lastPoint: lastCoin,
		}).save();
		return post;
	} catch (error) {
		throw error;
	}
};

const createCoin = async (transaction: any, coin: number, lastCoin: number, userId: string) => {
	try {
		const post = await new Points({
			presentAmount: lastCoin - coin,
			lastAmount: lastCoin,
			transaction: transaction,
			userId: userId,
			onUser: "DailyUser",
			description: "Use Point to deposit payment",
		}).save();
		return post;
	} catch (error) {
		throw error;
	}
};
