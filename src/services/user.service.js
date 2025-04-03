import prisma from '../prisma/prisma.client.js';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:9090');

socket.on('connect', () => {
  console.log('Сервис пользователей подключился к web socket');
});

// socket.on('receive-message', (message) => {
//   console.log('Userservice ' + message);
// })

class UserService {
  constructor() {}

  async create(req, res) {

    const existsUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      }
    });
    if(existsUser) return res.status(409).send({ msg: 'User already exists' });
    const newUser = await prisma.user.create({
      data: {
        ...req.body,
      }
    });
    const msg = {
      method: 'POST',
    };
    const serializedData = JSON.stringify(msg);
    socket.emit("send-message", serializedData);
    res.json(newUser);
  }

  async getUsers(req, res) {
    const users = await prisma.user.findMany();
    const msg = {
      method: 'GET_ALL',
    };
    const serializedData = JSON.stringify(msg);
    socket.emit("send-message", serializedData);
    res.json(users);
  }

  async getUser(req, res) {
    const user = await prisma.user.findUnique({
      where: {id: +req.params.id}
    });
    if(!user) return res.status(404).send({ msg: 'User not found' });
    const msg = {
      method: 'GET_ONE',
    };
    const serializedData = JSON.stringify(msg);
    socket.emit("send-message", serializedData);
    res.json(user);
  }

  async update(req, res) {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if(!foundUser) return res.status(404).send({ msg: 'User not found' });

    const updateUser = await prisma.user.update({
      where: {id: +req.params.id},
      data: {
        ...req.body,
      }
    });
    const msg = {
      method: 'PATCH',
    };
    const serializedData = JSON.stringify(msg);
    socket.emit("send-message", serializedData);
    res.json(updateUser);
  }

  async delete(req, res) {
    const foundUser = await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if(!foundUser) return res.status(404).send({ msg: 'User not found' });

    const deleteUser = await prisma.user.delete({
      where: {id: +req.params.id}
    });
    const msg = {
      method: 'DELETE',
    };
    const serializedData = JSON.stringify(msg);
    socket.emit("send-message", serializedData);
    res.json({id: deleteUser.id});
  }

}


export default new UserService();