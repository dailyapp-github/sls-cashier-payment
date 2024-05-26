import UserOutlet from "../schemas/userOutlet";

const createUserOutlet = async (payload: any) => {
	try {
		const post = await new UserOutlet(payload).save();
		return post;
	} catch (error) {
		throw error;
	}
};

export default createUserOutlet;
