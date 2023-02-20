const express = require('express');
const { registerUser, loginUser, revalidateToken} = require('../controllers/auth')
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

//URL /api/auth/

//create game post
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/renew', validateJWT, revalidateToken);


module.exports = router;