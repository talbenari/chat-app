const user = require('../models/user');
// const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
    const {  email, fullName, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new user({ password, fullName, email });
    newUser.save((error, user) => {
        if (error) {
            console.log(error);
            res.send(error);
            res.status(500).send();
        }
        res.status(200).json({ message: 'user created succesfully' });
    })
}



exports.login = (req, res) => {
    user.findOne({ email: req.body.email }, async (err, user) => {

        // const isMatch = await bcrypt.compare(req.body.password,
        //     user?.password);

        if (err) {
            res.send(err);
            res.status(500).json({
                message: {
                    response: 'invalid user details'
                }
            });
        }
        else if (!user) {
            res.send("user's email not found");
            res.status(400).send();
        }
        else if (user.password !== req.body.password) {
            res.send('password does not match the email');
            res.status(400).send();
        }
        else {
            console.log("Result : ", user);
            res.status(200).json({ message:{ 
                response: `logged-in succesfully`,
                details: user
        }});
        }
    });
}