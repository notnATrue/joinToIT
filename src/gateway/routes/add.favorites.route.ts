import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { UserService } from "../../user/service";
import { UserFavoritesService } from "../../user-favorites/service";

export const route = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = req.cookies;
    if (cookies?.session) {
      const { session } = cookies;
      const doc = await UserService.find({ session });
      if (doc) {
        const params = { ...req.params, ...req.query, ...req.body };
        const userDoc = await UserService.find({ session });
        console.log("userDoc ", userDoc);
        const { id: userId } = userDoc;
        const { id: newsId } = params;
        const userFavoritesDoc = await UserFavoritesService.create({ userId, newsId });
        console.log("userFavoritesDoc ", userFavoritesDoc);
        res.status(200).json({ code: 200, message: userFavoritesDoc });
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
