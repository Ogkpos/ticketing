import express from "express";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  /*
   if (!req.session || !req.session.jwt) {
   return res.send({ currentUser: null });
   }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    res.status(200).send({ currentUser: payload });
  } catch (error) {
    res.status(404).send({ currentUser: null });
  }
    */
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
