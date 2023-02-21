const express = require('express');
const { createUser, loginUser, revalidateToken} = require('../controllers/auth')
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

//URL /api/auth/

//create game post
router.post("/register", createUser);
router.post("/login", loginUser);
router.get('/renew', validateJWT, revalidateToken);


module.exports = router;