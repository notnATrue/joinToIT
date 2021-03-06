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
        const { id: userId } = userDoc;
        const { id } = params;
        const doc = await UserFavoritesService.delete({ userId, id });
        res.status(204).json({ code: 204 });
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
