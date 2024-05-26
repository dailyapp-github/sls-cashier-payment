import outlet from "../schemas/outlets";

const getOutletById = async (id: string) => {
	try {
		const get = await outlet.findOne({ _id: id });
		return get;
	} catch (error) {
		throw error;
	}
};

export default getOutletById;
