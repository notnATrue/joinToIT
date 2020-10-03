import { NextFunction, Request, Response } from "express";
import { newsService } from "../../news/newsService";
import _ from "lodash";
import { IDTO } from "./interface";
import { UserService } from "../../user/service";

export const route = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = req.cookies;
    if (cookies?.session) {
      const { session } = cookies;
      const doc = await UserService.find({ session });
      if (doc) {
        const params = { ...req.params, ...req.query, ...req.body };
        console.log("params ", params);
        const { id } = params;
        const newsDoc = await newsService.delete(id);
        console.log("newsDoc ", newsDoc);
        res.status(200).json({ code: 200, message: newsDoc });
      } else {
        res.status(422).json({ code: 422, message: "unathorized" });
      }
    } else {
      res.status(422).json({ code: 422, message: "unathorized" });
    }
  } catch (e) {
    next(e);
  }
};

export default route;
