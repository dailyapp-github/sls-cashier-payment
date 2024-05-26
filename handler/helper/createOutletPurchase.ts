import OutletPurchase from "../schemas/outletPurchaseOrder";

const outletPurchase = async (payload: any) => {
	try {
		const post = new OutletPurchase(payload).save();
		return post;
	} catch (error) {
		throw error;
	}
};

export default outletPurchase;
