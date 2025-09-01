const User = require('./models/User');
const bcrypt = require('bcrypt');

async function makeAdmin(){
    try {
        let user = await User.findOne({ email : 'wishmastervishal@gmail.com'});
        if(user){
            console.log("User Updated...");
        } else{
            let user = new User();
            user.firstName = 'Vishal';
            user.lastName = 'Boss';
            user.email = 'wishmastervishal@gmail.com';
            let encryptedPassword = bcrypt.hashSync('12345' , 10);
            user.password = encryptedPassword;
            user.userType = 'Admin';

            await user.save();
            console.log("user saved successfully...");
        }
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = makeAdmin
