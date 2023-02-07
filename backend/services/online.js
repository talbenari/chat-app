const user = require('../models/user');

exports.setOnline = async (req, res) => {
    user.findOneAndUpdate({ email: req.body.email }, { online: true }, (error, userOnline) => {
        if (error) {
            console.log(error);
            res.status(500);
        }
        res.status(200).json({ message: `user has been set Online` });
    })
}

exports.setOffline = async (req, res) => {
    user.findOneAndUpdate({ email: req.body.email }, { online: false }, (error, userOnline) => {
        if (error) {
            console.log(error);
            res.status(500);
        }
        res.status(200).json({ message: `user has been set Offline` });
    })
}

exports.whoIsOnline = async (req, res) => {
    console.log(req.body.email);
    user.find({ online: true, }, (err, onlineUsers) => {
        if (err) {
            console.log(err);
            res.status(500);
        }
        res.status(200).json({message: onlineUsers})
    })
}


