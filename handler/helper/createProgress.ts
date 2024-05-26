import Progress from "../schemas/feedbackProgress";

const createProgress = async (userId: string) => {
	try {
		const post = await new Progress({ userId: userId, progresStatus: "on-progress", progressValue: 0 }).save();
		return post;
	} catch (error) {
		throw error;
	}
};

export default createProgress;
