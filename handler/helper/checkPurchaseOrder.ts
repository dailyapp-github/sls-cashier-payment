import PurchaseOrderModel from "../schemas/purchaseOrders";

const checkPurchaseOrder = async (esbSalesNumber: string) => {
	try {
		const get = await PurchaseOrderModel.count({ orderId: esbSalesNumber });
		console.log("PURCHASE GET", get);

		return get;
	} catch (error) {
		throw new Error(error);
	}
};
export default checkPurchaseOrder;
