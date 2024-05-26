import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { connect } from "../handler/mongooseConnection";
import callbackResponse from "../handler/callback";
import Validator from "fastest-validator";
import getUserByPhone from "../handler/helper/getUserByPhone";
import getLastCoin from "../handler/helper/getLastCoin";
import { phone } from "phone";
import createOtpPaymentRequest from "../handler/helper/createOtpPaymentRequest";
import sendWa from "../handler/helper/waNotificationPayment";
import getOutletById from "../handler/helper/getOutletById";

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
	context.callbackWaitsForEmptyEventLoop === false;
	await connect(process.env.DB_NAME || "test");
	try {
		console.log("YEAY");
		const body = event.body ? JSON.parse(event.body) : null;
		if (!body || !body.phoneNumber || !body.outletId || !body.coin) {
			return callbackResponse(2000, {}, "body request is required", "body request is required");
		}

		const phoneFormat: any = phone(`+${body.phoneNumber}`, { country: "ID" });
		console.log("phoneFormat", phoneFormat);
		if (phoneFormat.isValid === false) {
			return callbackResponse(2001, {}, "phone format incorrect", "phone format incorrect");
		}

		const user = await getUserByPhone(body.phoneNumber);
		if (!user) {
			return callbackResponse(2002, {}, "phone number not registered", "phone number not registered");
		}

		const outlet = await getOutletById(body.outletId);
		if (!outlet) {
			return callbackResponse(2003, {}, "outlet not found", "outlet not found");
		}

		const userCoin = await getLastCoin(user.user._id);
		if (userCoin < body.coin) {
			return callbackResponse(
				2004,
				{},
				"coin balance is less than of payment",
				"coin balance is less than of payment"
			);
		}

		const createRequest = await createOtpPaymentRequest(body);
		await sendWa(
			createRequest?.phoneNumber || "",
			`${createRequest?.coin} coin akan anda gunakan untuk pembayaran transaksi pada outlet ${outlet.name}, untuk melanjutkan transaksi ini silahkan berikan code ${createRequest?.code} ini kepada Kasir kami, Terima kasih`
		);
		return callbackResponse(1000, createRequest, "SUCCESS", "SUCCESS");
	} catch (error) {
		console.log("ERR", error);
		return callbackResponse(2100, {}, "error by system", "error by system");
	}
};

const validate = async (body: any) => {
	const v = new Validator();
	const schema = {
		coin: { type: "number" },
		outletId: { type: "string" },
		phoneNumber: { type: "string" },
	};
	const check = v.compile(schema);
	return await check(body);
};
