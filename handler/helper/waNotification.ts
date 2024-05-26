import axios, { AxiosRequestConfig } from "axios";

const sendWa = async (
	phone: string,
	gift: number | string,
	totalPayment: number,
	outlet: string,
	isCoupon: boolean
) => {
	try {
		const message = !isCoupon
			? `Selamat! Anda baru saja mendapatkan cashback ${gift} dailycoin dari total transaksi Rp. ${totalPayment} di ${outlet}!✨ Untuk melihat total dailycoin Anda dan penawaran eksklusif lainnya, download segera "dailybox" melalui appstore & playstore!`
			: `Selamat!Anda baru saja mendapatkan kupon undian dengan nomor ${gift} dari total transaksi Rp. ${totalPayment} di ${outlet}!✨ simpan/catat nomor kupon ini! kupon akan di-undi secara live di instagram buruan follow instagram "dailybox.id"`;
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
