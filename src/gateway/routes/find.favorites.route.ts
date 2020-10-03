import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { UserService } from "../../user/service";
import { UserFavoritesService } from "../../user-favorites/service";
import { newsService } from "../../news/service";

export const route = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = req.cookies;
    if (cookies?.session) {
      const { session } = cookies;
      const doc = await UserService.find({ session });
      if (doc) {
        // const params = { ...req.params, ...req.query, ...req.body };
        const userDoc = await UserService.find({ session });
        const { id } = userDoc;
        const userFavoritesDocs = await UserFavoritesService.findAll({ id });
        const favoriteNewsIds = [];
        for (const userFavoritesDoc of userFavoritesDocs) {
          const { newsId: id } = userFavoritesDoc;
          favoriteNewsIds.push(id);
        }
        const favoriteNews = await newsService.findByIds(favoriteNewsIds);
        const jsonData = [];
        for (const favoriteNew of favoriteNews) {
          const prepareData = _.pick(favoriteNew, ["title", "content", "author", "createdAt", "updatedAt", "id"]);
          jsonData.push(prepareData);
        }
        res.status(200).json({ code: 200, message: jsonData });
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
