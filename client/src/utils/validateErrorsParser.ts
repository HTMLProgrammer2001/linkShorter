type IValidateError = {
	msg: string,
	param: string
};

export type IParsedValidateErrors = {
	[key: string]: string
};

const parse = (errors: IValidateError[]) => {
	const parsedErrors: IParsedValidateErrors = {};

	errors.forEach((err) => {
		parsedErrors[err.param] = err.msg;
	});

	return parsedErrors;
};

export default parse;
