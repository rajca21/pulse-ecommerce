import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '10d',
    }
  );

  // Set JWT as HTTP-Only Cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_DEV !== 'development',
    sameSite: 'strict',
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days in ms
  });
};

export default generateToken;
