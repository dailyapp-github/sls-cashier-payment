import DailyOrderV3 from "../schemas/dailyOrderV3";

const createOrder = async (
	orderId: string,
	userId: string,
	branchName: string,
	totalPayment: number,
	purchaseId: string
) => {
	try {
		const post = await new DailyOrderV3({
			code: orderId,
			userId: userId,
			outletName: branchName, //esbSalesNumberAvailable[0].branchName,
			totalAmount: totalPayment,
			orderNumber: await generateCode(),
			purchaseOrderId: purchaseId,
			feedbackId: null,
			complainId: null,
		}).save();
		return post;
	} catch (error) {
		throw new Error(error);
	}
};

const generateCode = async () => {
	// await connect("dev");
	let orderCode = "";
	let length = 0;
	do {
		orderCode = `ODR-${getCode()}`;
		const orderCodeChecked = await DailyOrderV3.find({
			orderNumber: orderCode,
		});
		length = orderCodeChecked.length;
	} while (length > 0);
	return orderCode;
};

const getCode = () => {
	const character = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let result = "";
	for (let index = 0; index < 6; index++) {
		result += character[Math.floor(Math.random() * character.length)];
	}
	return result;
};

export default createOrder;
