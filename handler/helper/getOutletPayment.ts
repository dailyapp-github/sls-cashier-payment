import mongoose from "mongoose";
import AspalTransaction from "../schemas/transactions";
import * as moment from "moment";

const getOutletPayment = async (outletId: string, startdate: any, enddate: any) => {
	try {
		const gets = await AspalTransaction.aggregate([
			{
				$match: {
					$and: [
						{ type: "POINT-PAYMENT" },
						{ outlet: new mongoose.Types.ObjectId(outletId) },
						{
							createdAt: {
								$gt: new Date(moment(startdate).startOf("day").format("YYYY-MM-DD[T00:00:00.000Z]")),
								$lt: new Date(moment(enddate).endOf("day").format("YYYY-MM-DD[T00:00:00.000Z]")),
							},
						},
					],
				},
			},
			{ $lookup: { from: "cointPayments", localField: "reasonId", foreignField: "_id", as: "reasonId" } },
			{ $unwind: "$reasonId" },
			{ $lookup: { from: "dailyUsers", localField: "userId", foreignField: "_id", as: "userId" } },
			{ $unwind: "$userId" },
			{
				$project: {
					_id: "$_id",
					date: "$createdAt",
					codePayment: "$reasonId.posCode",
					idr: "$reasonId.idrAmount",
					coin: "$reasonId.pointAmount",
					userName: "$userId.fullName",
					userPhone: "$userId.phone.number",
				},
			},
			{ $sort: { date: -1 } },
		]);
		console.log("YES", gets);

		return {
			totalCoin: gets.reduce((a, b) => +a + +b.coin, 0) || 0,
			totalIdr: gets.reduce((a, b) => +a + +b.idr, 0) || 0,
			totalTrx: gets.length || 0,
			data: gets || [],
		};
	} catch (error) {
		throw error;
	}
};

export default getOutletPayment;
