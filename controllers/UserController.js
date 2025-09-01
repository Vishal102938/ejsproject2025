const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');

async function addUser(req,res) {
    try {
        let user = new User(req.body);
        user.userType = 'student';
        let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        user.password = encryptedPassword;
        await user.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
}

async function doLogin(req , res) {
    try {
        let user = await User.findOne({ email : req.body.email});
        if(user){
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if(validPassword){
                if(user.userType === 'Admin'){
                    let students = await Student.find({});
                    res.render('welcomeadmin', {
                    students:students
                    });
                } else{
                    res.render('welcomestudent')
                }
            } else {
                res.end("<h1> Invalid login email or password...");
            }

        } else {
            res.end("<h1> User does not exists...");
        }
    } catch (err) {
        console.log(err);
    }
}


module.exports={
    addUser,
    doLogin
}