const coinCashback = async (totalAmount: number, esbData: any) => {
	try {
		const brand = await checkBrand(esbData[0].salesMenus);
		// esbData[0].salesMenus
		const PERCENTAGE: number =
			brand === "antarasa"
				? 20
				: brand === "drinks"
				? 0
				: brand === "dailybox"
				? 10
				: brand === "shirato"
				? 10
				: brand === "breadlife"
				? 10
				: brand === "lumiere"
				? 15
				: brand === "ayam amanah"
				? 5
				: 0;

		const coin = (PERCENTAGE * totalAmount) / 100;

		if (brand === "nasi tempong") {
			return { isVoucher: true, coin: 0 };
		}

		return { isVoucher: false, coin: Math.ceil(coin / 1000) };
	} catch (error) {
		throw error;
	}
};

const checkBrand = async (datas: any[]) => {
	console.log("datas to barnd", datas);
	const BRANDS = [
		"dailybox",
		"ayam amanah",
		"antarasa",
		"shirato",
		"breadlife",
		"lumiere",
		"tiantea",
		"nasi tempong",
	];

	const intersection = datas.filter((element) => BRANDS.includes(element.menuCategoryName.toLowerCase()));

	console.log("intersection", intersection);

	return intersection.length > 0 ? intersection[0].menuCategoryName.replace(/\s/g, "").toLowerCase() : "drinks";
};

export default coinCashback;
