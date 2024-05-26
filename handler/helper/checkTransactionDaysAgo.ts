import * as moment from "moment";

const transactionDaysAgo = async (date: string) => {
	try {
		const salesDate = moment(date, "YYYY-MM-DD").startOf("day");
		const currentDate = moment().startOf("day");
		const totalDayBetween = moment.duration(currentDate.diff(salesDate)).asDays();

		console.log("DAY AGO", totalDayBetween);

		return totalDayBetween;
	} catch (error) {
		throw new Error(error);
	}
};

export default transactionDaysAgo;
