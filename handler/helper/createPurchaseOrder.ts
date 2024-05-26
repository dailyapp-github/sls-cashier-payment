import PurchaseOrderModel from "../schemas/purchaseOrders";

const createPurchaseOrder = async (esbSalesNumber: string, userId: string, esbSalesNumberAvailable: any) => {
	try {
		const post = await new PurchaseOrderModel({
			orderId: esbSalesNumber,
			billId: esbSalesNumberAvailable[0].billNum,
			menus: esbSalesNumberAvailable[0].salesMenus,
			buyerData:
				esbSalesNumberAvailable[0].salesInfo["Full Name"] &&
				esbSalesNumberAvailable[0].salesInfo["Delivery Address"]
					? {
							name: esbSalesNumberAvailable[0].salesInfo["Full Name"],
							address: esbSalesNumberAvailable[0].salesInfo["Delivery Address"],
					  }
					: null,
			customerId: userId,
			driverId: null,
			tableType: esbSalesNumberAvailable[0].visitPurposeName || null,
			paymentType: esbSalesNumberAvailable[0].salesPayments || null,
			totalPayment: esbSalesNumberAvailable[0].grandTotal,
			orderDate: esbSalesNumberAvailable[0].salesDateIn,
		}).save();
		return post;
	} catch (error) {
		throw new Error(error);
	}
};
export default createPurchaseOrder;
