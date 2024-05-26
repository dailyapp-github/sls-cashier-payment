const headers = {
	"Content-Type": "aplication/json",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*",
	"Access-Control-Request-Method": "*",
	"Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Credentials": true,
};

const callbackResponse = (code: number, data: any, message: string, error: string) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			code: code,
			data: data,
			message: message,
			error: error,
		}),
		isBase64Encoded: false,
		headers: headers,
	};
};

export default callbackResponse;
