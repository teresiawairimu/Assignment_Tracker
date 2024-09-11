const { admin } = require('../firebaseAdmin');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  console.log("token is:", token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log("decodedToken is:", decodedToken);
    console.log("userid:", decodedToken.uid);
    console.log("userid2:", req.user.uid);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
