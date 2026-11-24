const express = require('express');
const { registerForm, register, login, loginForm, dashboard , logout} = require('../controller/empController');

const router = express.Router()

router.get("/",registerForm)

router.post("/register",register)

router.get("/login", loginForm)

router.post("/login",login)

router.get("/dashboard",dashboard)

router.get("/logout", logout)
module.exports = router
