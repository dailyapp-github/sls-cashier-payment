import DailyOrderV3 from "../schemas/dailyOrderV3";

const deleteOrder = async (code: string) => {
	try {
		const del = await DailyOrderV3.findOneAndDelete({ code: code });
		return del;
	} catch (error) {
		throw error;
	}
};

export default deleteOrder;
