const { registerUser, loginUser, revalidateToken , forgotPassword, resetPassword} = require('../controllers/auth')
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

//URL /api/auth/

//create game post
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/renew', validateJWT, revalidateToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;