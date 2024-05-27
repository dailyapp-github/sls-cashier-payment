import otpPaymentRequest from "../schemas/otpPaymentRequest";

const getOtpPaymentToVerified = async (code: string, phoneNumber: string) => {
	try {
		const get = await otpPaymentRequest.findOne({ code: code.trim(), isVerified: false, phoneNumber: phoneNumber });
		console.log("REQ", get);
		return get;
	} catch (error) {
		throw error;
	}
};

export default getOtpPaymentToVerified;
