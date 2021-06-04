import User from "../models/User"
import bcrypt from "bcrypt"

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join"});
export const postJoin = async (req, res) => {
    const {name, email, username, password, password2, location } = req.body;
    const pageTitle = "Join";
    if(password !== password2){
        return res.status(400).render('join', { pageTitle, errorMessage: "Password does not match." })
    }
    const exists = await User.exists({$or: [{username}, {email}]});
    if(exists){
        return res.status(400).render('join', { pageTitle, errorMessage: "This username/email is already taken." })
    }
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        })
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render(
            "join", {
                pageTitle,
                errorMessage: error._message,
            })
    }
}

export const getLogin = (req, res) => res.render("login", { pageTitle: "Login"});

export const postLogin = async (req, res) => {
    const { username, password } = res.body;
    // check if account exists
    const pageTitle = "Login"
    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "This username does not exist."})
    }

    // check if password correct
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return res.status(400).render("login", { pageTitle , errorMessage: "Wrong password"})
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}


export const logout = (req, res) => res.render("logout", { pageTitle: "Logout"});
export const userDetail = (req, res) => res.render('userDetail', { pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: "Change Password"});