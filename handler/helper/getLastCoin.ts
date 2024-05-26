import Points from "../schemas/dailycoin";

const getLastCoin = async (userId: string) => {
	try {
		const get = await Points.findOne({ userId: userId }).sort({ createdAt: -1 });

		const amount: number = get?.presentAmount || 0;
		return amount;
	} catch (error) {
		throw new Error(error);
	}
};
export default getLastCoin;
