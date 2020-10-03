import Joi from "@hapi/joi";

export class Validator {
  public static async createParams(params): Promise<any> {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      content: Joi.string().required()
    });
    const { error, value } = schema.validate(params) as Joi.ValidationResult;
    if (error) {
      throw new Error;
    }
    return value;
  }
}
