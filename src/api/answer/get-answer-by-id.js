// const Joi = require("joi");
// const ObjectId = require("mongodb").ObjectId;

// const enums = require("../../../json/enums.json");
// const messages = require("../../../json/messages.json");

// const logger = require("../../logger");
// const utils = require("../../utils");

// // Add category by admin
// module.exports = exports = {
//   // route validation
//   validation: Joi.object({
//     answer: Joi.string().allow(),
//     displayProfile: Joi.boolean().allow(),
//     allowConnectionRequest: Joi.boolean().allow(),
//     filter: Joi.array().allow(),
//   }),

//   // route handler
//   handler: async (req, res) => {
//     const { answerId } = req.params;
//     res.send(req.params)
//     console.log("++++++++++++++++++++++++",answerId)

//     try {
//       const singleAnswer = await global.models.GLOBAL.ANSWER.findById({id});
//       // ({ _id: objectId }).next();
//       console.log("+++++++++++++++++",singleAnswer);
//       const data4createResponseObject = {
//         req: req,
//         result: 0,
//         message: messages.ITEM_FETCHED,
//         payload: { singleAnswer },
//         logPayload: false,
//       };
//       res.status(enums.HTTP_CODES.OK).json(utils.createResponseObject(data4createResponseObject));

//     } catch (error) {
//       console.log(error)
//       // logger.error(`${req.originalUrl} - Error encountered: ${error.message}\n${error.stack}`);
//       const data4createResponseObject = {
//         // req: req,
//         // result: -1,
//         // message: messages.GENERAL,
//         // payload: {},
//         // logPayload: false,
//       };
//       // console.log("+++++++++++++++++",singleAnswer);
//       // res.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR).json(utils.createResponseObject(data4createResponseObject));
//     }
//   },
// };
const Joi = require("joi");
const enums = require("../../../json/enums.json");
const messages = require("../../../json/messages.json");
const ObjectId = require("mongodb").ObjectId;
const logger = require("../../logger");
const utils = require("../../utils");

// Add category by admin
module.exports = exports = {
	// route validation
	validation: Joi.object({
		answer: Joi.string().allow(),
		displayProfile: Joi.boolean().allow(),
		allowConnectionRequest: Joi.boolean().allow(),
		filter: Joi.array().allow(),
	}),

	// route handler
	handler: async (req, res) => {
		const { user } = req;
		const { answerId } = req.params;
		console.log("+++++++++++++", answerId);
		try {
			const singleAnswer = await global.models.GLOBAL.ANSWER.findById({
				_id: answerId,
			});

			const data4createResponseObject = {
				req: req,
				result: 0,
				message: messages.ITEM_FETCHED,
				payload: { singleAnswer },
				logPayload: false,
			};

			res
				.status(enums.HTTP_CODES.OK)
				.json(utils.createResponseObject(data4createResponseObject));
		} catch (error) {
			logger.error(
				`${req.originalUrl} - Error encountered: ${error.message}\n${error.stack}`
			);
			const data4createResponseObject = {
				req: req,
				result: -1,
				message: messages.GENERAL,
				payload: {},
				logPayload: false,
			};
			res
				.status(enums.HTTP_CODES.INTERNAL_SERVER_ERROR)
				.json(utils.createResponseObject(data4createResponseObject));
		}
	},
};
