import { NextFunction, Request, Response } from "express";
import { newsService } from "../../news/newsService"

export const route = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req as Request;
    const params = { ...req.params, ...req.query };
    console.log("params ", params);
    /** VALIDATORS */
  /** PROCESSING */
    const jsonData = await newsService.getNews();
    res.status(200).json(jsonData);
  } catch (e) {
    next(e);
  }
};

export default route;
