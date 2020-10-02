import { NextFunction, Request, Response } from "express";
import { newsService } from "../../news/newsService";
import _ from "lodash";
import { IDTO } from "./interface";

export const route = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req as Request;
    const params = { ...req.params, ...req.query };
  /** PROCESSING */
    let prepareData: IDTO[] = [];
    const docs = await newsService.find();
    for (const doc of docs) {
      const prepareDoc: IDTO = _.pick(doc, ["author", "title", "content", "id"]);
      prepareData.push(prepareDoc);
    }
    res.status(200).json(prepareData);
  } catch (e) {
    next(e);
  }
};

export default route;
