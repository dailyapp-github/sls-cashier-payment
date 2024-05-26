import PurchaseOrderModel from "../schemas/purchaseOrders";

const deletePurchase = async (code: string) => {
	try {
		const del = await PurchaseOrderModel.findOneAndDelete({ orderId: code });
		return del;
	} catch (error) {
		throw error;
	}
};

export default deletePurchase;
