import {Router} from "express";
import userRouter from "./user.router.js";

const api = new Router()
  .use("/users", userRouter);


export default Router().use('/api', api);
