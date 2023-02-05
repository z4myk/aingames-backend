const express = require('express');
const {createUser, loginUser, revalidarToken} = require('../controllers/auth')
const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

//URL /api/auth/

//create game post
router.post("/register", createUser);
router.post("/login", loginUser);
router.get('/renew', validateJWT,revalidarToken);

module.exports = router;