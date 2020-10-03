import { NextFunction, Request, Response } from "express";
import { newsService } from "../../news/service";
import _ from "lodash";
import { UserService } from "../../user/service";
import { IAddFeed } from "./interface";

export const route = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = req.cookies;
    if (cookies?.session) {
      const { session } = cookies;
      const doc = await UserService.find({ session });
      if (doc) {
        const { content, title } = req.body;
        const { id: author} = doc;
        const newsDoc = await newsService.create({ title, content, author });
        const jsonData: IAddFeed = _.pick(newsDoc, ["title", "content", "author", "id", "createdAt", "updatedAt"])
        res.status(201).json({ code: 201, message: jsonData });
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
