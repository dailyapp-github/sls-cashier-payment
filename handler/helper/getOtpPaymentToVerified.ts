import otpPaymentRequest from "../schemas/otpPaymentRequest";

const getOtpPaymentToVerified = async (code: string) => {
	try {
		const get = await otpPaymentRequest.findOne({ code: code.replace(/\s/g, ""), isVerified: false });
		return get;
	} catch (error) {
		throw error;
	}
};

export default getOtpPaymentToVerified;
