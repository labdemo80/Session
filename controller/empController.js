const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const registerForm = async (req,resp) => {
    resp.render("register")
}

const register = async (req,resp) => {
    try {
        const {uname,email,password} = req.body
        const hashPassword = await bcrypt.hash(password,10)
        await userModel.create({uname,email,password:hashPassword})
        resp.redirect("/login")
    } catch (error) {
        console.log(error);
    }
}

const loginForm = async(req,resp)=>{
    resp.render("login")
}

const login = async (req,resp) => {
    try {
        const {uname,password} = req.body
        // find whether user exists or not
        const user = await userModel.findOne({uname})
        if (user && await bcrypt.compare(password,user.password)) {
            req.session.uname = req.body.uname
            resp.redirect("/dashboard")
        } else {
            resp.redirect("/login")
        }
    } catch (error) {
        console.log(error);
    }
}

const dashboard = async (req,resp) =>{
    try {
        if (!req.session.uname) {
            resp.redirect("/login")
        }
        else{
            resp.render("dashboard",{uname:req.session.uname})
        }
    } catch (error) {
        console.log(error);
    }
}

const logout = async(req,resp)=>{
    req.session.destroy(()=>{
        resp.redirect("/login")
    })
}

module.exports = {register,registerForm, loginForm, login, dashboard, logout}