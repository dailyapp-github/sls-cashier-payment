import AspalTransaction from "../schemas/transactions";
import * as moment from "moment";

const createTransactionOrder = async (userId: string, coin: number, lastCoin: number, orderId: string) => {
	try {
		const date = moment(new Date()).format("DDMMYY");
		const code = `${date}-${Math.floor(1000 + Math.random() * 9000)}`;
		const post = await new AspalTransaction({
			operator: "DEBIT",
			trxNumber: `OCB-${code}`,
			reasonId: orderId,
			onReason: "DailyOrderV3",
			userId: userId,
			onUser: "DailyUser",
			type: "POINT-DAILY",
			point: coin,
			lastPoint: lastCoin,
		}).save();

		return post;
	} catch (error) {
		throw new Error(error);
	}
};

export default createTransactionOrder;
