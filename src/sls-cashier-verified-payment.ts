import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { connect } from "../handler/mongooseConnection";
import callbackResponse from "../handler/callback";
import getLastCoin from "../handler/helper/getLastCoin";
import getOutletById from "../handler/helper/getOutletById";
import getOtpPaymentToVerified from "../handler/helper/getOtpPaymentToVerified";
import getUserByPhone from "../handler/helper/getUserByPhone";
import verifyPayment from "../handler/helper/verifyPaymentCashier";
import otpPaymentRequestVerified from "../handler/helper/updateOtpPaymentToVerified";
import DailyUser from "../handler/schemas/dailyUser";

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
	context.callbackWaitsForEmptyEventLoop === false;
	await connect(process.env.DB_NAME || "test");
	try {
		console.log("YEAY");
		const body = event.body ? JSON.parse(event.body) : null;
		console.log("BODY", body);
		
		if (!body || !body.code || !body.outletId) {
			return callbackResponse(2000, {}, "body request is required", "body request is required");
		}

		const request = await getOtpPaymentToVerified(body.code, body.phoneNumber);
		if (!request) {
			return callbackResponse(2001, {}, "code not found", "code not found");
		}

		const user = await getUserByPhone(request.phoneNumber);
		if (!user) {
			return callbackResponse(2002, {}, "phone number not registered", "phone number not registered");
		}

		if(user.user.phone.verified === false){
			await DailyUser.findByIdAndUpdate({_id: user.user._id}, {"phone.verified": true}, {new: true, runValidators: true})
		}

		const outlet = await getOutletById(body.outletId);
		if (!outlet) {
			return callbackResponse(2003, {}, "outlet not found", "outlet not found");
		}

		const userCoin = await getLastCoin(user.user._id);
		if (userCoin < request.coin) {
			return callbackResponse(
				2004,
				{},
				"coin balance is less than of payment",
				"coin balance is less than of payment"
			);
		}

		const verify = await verifyPayment(request.coin, userCoin, user.user._id.toString(), body.code, body.outletId);
		await otpPaymentRequestVerified(request._id.toString());
		return callbackResponse(1000, verify, "SUCCESS", "SUCCESS");
	} catch (error) {
		console.log("ERR", error);
		return callbackResponse(2100, {}, "error by system", "error by system");
	}
};
