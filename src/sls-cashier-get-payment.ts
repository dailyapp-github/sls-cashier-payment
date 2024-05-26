import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { connect } from "../handler/mongooseConnection";
import callbackResponse from "../handler/callback";
import * as moment from "moment";
import getOutletPayment from "../handler/helper/getOutletPayment";

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
	context.callbackWaitsForEmptyEventLoop === false;
	await connect(process.env.DB_NAME || "test");
	try {
		const outletId = event?.queryStringParameters?.outletId ? event.queryStringParameters.outletId : null;
		const startdate = event?.queryStringParameters?.startdate
			? moment(event.queryStringParameters.startdate, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ss.SSS")
			: moment().startOf("month");
		const enddate = event?.queryStringParameters?.enddate
			? moment(event.queryStringParameters.enddate, "YYYY-MM-DD").format("YYYY-MM-DDTHH:mm:ss.SSS")
			: moment().endOf("month");

		if (outletId === null) {
			return callbackResponse(2000, {}, "params outletId is required", "params outletId is required");
		}

		const payments = await getOutletPayment(outletId, startdate, enddate);
		return callbackResponse(1000, payments, "SUCCESS", "SUCCESS");
	} catch (error) {
		console.log("ERR", error);
		return callbackResponse(2100, {}, "error by system", "error by system");
	}
};
