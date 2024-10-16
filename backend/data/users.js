import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true,
  },
  {
    name: 'Filip',
    email: 'filip@mail.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: false,
  },
  {
    name: 'Marko',
    email: 'marko@mail.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: false,
  },
];

export default users;
