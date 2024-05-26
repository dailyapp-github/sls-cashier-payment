import axios, { AxiosRequestConfig } from "axios";
const checkEsbSales = async (esbSalesNumber: string) => {
	const codeEsbAccount = esbSalesNumber.slice(0, 2);
	try {
		const esbAccountCreds =
			codeEsbAccount === "SD"
				? { username: "SGIITApps", password: "Daily12345" }
				: codeEsbAccount === "SA"
				? { username: "PPNITApps", password: "Daily12345" }
				: codeEsbAccount === "SL"
				? { username: "KUEITAPPS", password: "Daily12345" }
				: codeEsbAccount === "SC"
				? { username: "AYMDBITDEV", password: "Daily123" }
				: { username: "", password: "" };

		const axiosConfig: AxiosRequestConfig = {
			method: "post",
			url: "https://erp.esb.co.id/external/general/get-sales",
			auth: {
				username: esbAccountCreds.username,
				password: esbAccountCreds.password,
			},
			data: {
				salesNum: esbSalesNumber,
			},
		};
		const res = await axios(axiosConfig);
		console.log("ESB GET", res);

		if (res.data.errors) {
			return [];
		} else {
			return res.data;
		}
	} catch (error) {
		throw new Error(error);
	}
};

export default checkEsbSales;
