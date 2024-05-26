import axios, { AxiosRequestConfig } from "axios";

const sendWa = async (phone: string, message: string) => {
	try {
		const REQUEST_CONFIG: AxiosRequestConfig = {
			method: "post",
			url: "https://api.nusasms.com/nusasms_api/1.0/whatsapp/message", //prod
			headers: {
				Accept: "application/json",
				APIKey: "1D6EDF650FAB8A30FBFFCB58DD6F0937",
				// APIKey: "1D6EDF650FAB8A30FBFFCB58DD6F0937",
			},
			data: {
				destination: phone,
				message: message,
			},
		};
		const send = await axios(REQUEST_CONFIG);
		return send;
	} catch (error) {
		throw error;
	}
};

export default sendWa;
