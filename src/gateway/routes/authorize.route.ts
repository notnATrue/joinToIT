import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { UserService } from "../../user/service";
import { v4 as uuidv4 } from 'uuid';

export const route = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = req.cookies;
    console.log(cookies);
    if (cookies?.session) {
      const { session } = cookies;
      const doc = await UserService.findOrCreate({ session });
      res.status(200).json({ code: 200, message: "already authorized"});
    } else {
      const sessionId = JSON.stringify(await uuidv4());
      const doc = await UserService.findOrCreate({ session: sessionId });
      res.status(200).cookie('session', sessionId, { maxAge: 900000, httpOnly: true }).json({ code: 200, authorized: true });
    }
  } catch (e) {
    next(e);
  }
};

export default route;
