import mongoose, { ConnectOptions } from "mongoose";
// import * as Promise from "bluebird";
// // import { ConnectOptions } from "mongoose";

// mongoose.Promise = Promise;

let cacheDb: any;
export const connect = async (dbName: string) => {
	// const dataBaseName = type === "prod" ? "sgi" : "development";
	if (cacheDb && mongoose.connection.readyState === 1) {
		return cacheDb;
	} else {
		// Mongoose config and setting global Promise
		await mongoose
			.connect(
				"mongodb+srv://dailybox:Dailybox12345!@dailybox-m3uld.mongodb.net/test?retryWrites=true&w=majority",
				{
					// useUnifiedTopology: true,
					dbName: dbName,
					//  useFindAndModify: false,
					// useNewUrlParser: true,
					//  useCreateIndex: true,
				} as ConnectOptions
			)
			.then(() => {
				cacheDb = mongoose.connection;
				return cacheDb;
			})
			.catch((err) => {
				console.log(err);
			});

		mongoose.connection.once("open", function () {
			console.log("Mongoose connection in lambda opened");
		});

		mongoose.connection.on("error", function (e) {
			console.error("Error creating mongoose connection in lambda, exiting!");
		});
	}
};

exports.disconnect = () => {
	mongoose.disconnect();
};
