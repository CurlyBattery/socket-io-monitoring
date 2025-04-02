import {Router} from 'express';
import {create, getUsers, getUser, update, deleteUser} from '../controllers/user.controller.js';

const userRouter = new Router();

userRouter.post('/', create);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.patch('/:id', update);
userRouter.delete('/:id', deleteUser);

export default userRouter;