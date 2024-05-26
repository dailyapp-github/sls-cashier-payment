import mongoose from "mongoose";
import OutletPurchase from "../schemas/outletPurchaseOrder";
import * as moment from "moment";

const getOutletPurchase = async (outletId: string) => {
	try {
		// console.log("ids", outletId);
		// console.log("time", moment(new Date()).startOf("month").format("YYYY-MM-DDTHH:mm:ss.SSS"));
		// console.log("id", new mongoose.Types.ObjectId(outletId));

		const gets = await OutletPurchase.aggregate([
			{
				$match: {
					$and: [
						{ outletId: new mongoose.Types.ObjectId(outletId) },
						{
							createdAt: {
								$gte: new Date(moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss.SSS")),
								$lte: new Date(moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss.SSS")),
							},
						},
					],
				},
			},
			{ $lookup: { from: "dailyPurchaseOrders", localField: "purchaseId", foreignField: "_id", as: "purchase" } },
			{ $unwind: "$purchase" },
			{ $lookup: { from: "outlets", localField: "outletId", foreignField: "_id", as: "outlet" } },
			{ $unwind: "$outlet" },
			{ $lookup: { from: "dailyUsers", localField: "userId", foreignField: "_id", as: "user" } },
			{ $unwind: "$user" },
			{ $lookup: { from: "dailyOrderV3", localField: "purchase.orderId", foreignField: "code", as: "order" } },
			{ $unwind: "$order" },
			{
				$project: {
					_id: null,
					date: "$purchase.orderDate",
					outletName: "$outlet.name",
					posOutletName: "$order.outletName",
					userPhone: "$user.phone.number",
					orderNumber: "$purchase.orderId",
					totalPayment: "$purchase.totalPayment",
					menus: "$purchase.menus",
					scanDate: "$createdAt",
				},
			},
			{ $sort: { scanDate: -1 } },
		]);
		console.log(gets);

		return gets;
	} catch (error) {
		throw error;
	}
};

export default getOutletPurchase;
