const Intern = require('../models/Intern');
const Institute = require('../models/Institute');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const BlacklistedToken = require('../models/BlacklistedToken');

const register_intern = async (req, res) => {
    try {
        const { username, email, fullName, nameWithInitials, postalAddress, nic, contactNumber, district, date, preferredLanguage, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newIntern = new Intern({
            username,
            email,
            fullName,
            nameWithInitials,
            postalAddress,
            nic,
            contactNumber,
            district,
            date,
            preferredLanguage,
            password: hashedPassword
        });

        await newIntern.save();
        res.status(201).json({ message: `NEW INTERN REGISTERED`, intern: newIntern });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `ERROR IN REGISTERING INTERN: ${err.message}` });
    }
};

const register_institute = async (req, res) => {
    try {
        const { instituteName, instituteAddress, instituteContact, instituteEmail, username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newInstitute = new Institute({
            instituteName,
            instituteAddress,
            instituteContact,
            instituteEmail,
            username,
            password: hashedPassword,
            email
        });

        await newInstitute.save();
        res.status(201).json({ message: `NEW INSTITUTE REGISTERED`, institute: newInstitute });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `ERROR IN REGISTERING INSTITUTE: ${err.message}` });
    }
};

const resigter_admin = async (req, res) => {
    try{
        const { username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
            role: "admin",
        })
    
        await newAdmin.save();
    }catch (err){
        return res.status(500).json({message: `ERROR IN REGISTERING ADMIN: ${err.message}`});
    }



}


const adminDashboard = (req, res) => {
    res.status(200).json({ message: "Welcome to the admin dashboard!" });
};

const internDashboard = (req, res) => {
    res.status(200).json({ message: "Welcome to the intern dashboard!" });
};

const instituteDashboard = (req, res) => {
    res.status(200).json({ message: "Welcome to the institute dashboard!" });
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        let User = await Admin.findOne({ username });
        let role = 'admin';

        if (!User) {
            User = await Intern.findOne({ username });
            role = 'intern';
        }
        

        if (!User) {
            User = await Institute.findOne({ username });
            role = 'institute';
        }

        if (!User) {
            return res.status(400).json({ message: `${username} USER NOT FOUND` });
        }



        const isMatch = await bcrypt.compare(password, User.password);
        if (isMatch) {
            const token = jwt.sign(
                { UserId: User._id, username: User.username ,password: password, role },
                process.env.JWT_SECRET,
                { expiresIn: '2d' }
            );

            res.status(200).json({ message: `LOGIN SUCCESSFUL AS ${role}`, token });
        } else {
            res.status(400).json({ message: `INVALID CREDENTIALS` });
        }
    } catch (err) {
        console.error(`ERROR IN LOGIN: ${err.message}`);
        return res.status(500).json({ message: `INTERNAL SERVER ERROR` });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(400).json({ message: "LOGOUT FAILED: NO TOKEN PROVIDED" });
        }

        // Save the token in the blacklist
        await BlacklistedToken.create({ token });

        res.status(200).json({ message: "LOGOUT SUCCESSFUL" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
};




module.exports = { register_intern, register_institute, resigter_admin,  adminDashboard, internDashboard, instituteDashboard,login, logout };
