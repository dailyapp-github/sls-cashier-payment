import Points from "../schemas/dailycoin";

const createCoin = async (coin: number, lastCoin: number, transaction: any, userId: string) => {
	try {
		const post = await new Points({
			presentAmount: lastCoin + coin,
			lastAmount: lastCoin,
			transaction: transaction,
			userId: userId,
			onUser: "DailyUser",
			description: "Get Point from cahsback order ",
		}).save();

		return post;
	} catch (error) {
		throw new Error(error);
	}
};

export default createCoin;
