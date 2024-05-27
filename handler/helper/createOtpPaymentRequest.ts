import otpPaymentRequest from "../schemas/otpPaymentRequest";

const createOtpPaymentRequest = async (body: any) => {
	try {
		// check by phone $ status
		const checkRequest = await otpPaymentRequest.findOne({ phoneNumber: body.phoneNumber });

		// if not available or unavailable
		if (!checkRequest) {
			body.code = getCode();
			const post = await new otpPaymentRequest(body).save();
			return post;
		} else {
			if (checkRequest.coin !== body.coin) {
				const updateRequest = await otpPaymentRequest.findOneAndUpdate(
					{ _id: checkRequest._id },
					{ coin: body.coin, outletId: body.outletId, code: getCode(), isVerified: false },
					{ new: true, runValidators: true }
				);
				return updateRequest;
			}
			return checkRequest;
		}
	} catch (error) {
		throw error;
	}
};

export default createOtpPaymentRequest;

const getCode = () => {
	let result = "";
	const charset = "0123456789";
	for (let index = 0; index < 6; index++) {
		result += charset[Math.floor(Math.random() * charset.length)];
	}
	return result;
};
