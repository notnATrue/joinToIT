import Joi from "@hapi/joi";

export class Validator {
  public static async createParams(params): Promise<any> {
    const schema = Joi.object().keys({
      status: Joi.number().required(),
      totalResults: Joi.number().required(),
      articles: Joi.array().items(
        
      )
    });
    const { error, value } = schema.validate(params) as Joi.ValidationResult;
    if (error) {
      throw new Error;
    }
    return value;
  }
}
