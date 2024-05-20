const Joi = require('joi');

const BaseSchema = Joi.object({
    updatedAt: Joi.date().required(),
    createdAt: Joi.date().required(),
})

const CompleteSchema = BaseSchema.keys({
    id: Joi.string().required(),
    token: Joi.string(),
})

module.exports = {
    base: BaseSchema,
    complete: CompleteSchema
}
