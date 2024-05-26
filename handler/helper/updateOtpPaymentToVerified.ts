import otpPaymentRequest from "../schemas/otpPaymentRequest";

const otpPaymentRequestVerified = async (id: string) => {
	try {
		const update = await otpPaymentRequest.findOneAndUpdate(
			{ _id: id },
			{ isVerified: true },
			{ new: true, runValidators: true }
		);

		return update;
	} catch (error) {
		throw error;
	}
};

export default otpPaymentRequestVerified;
