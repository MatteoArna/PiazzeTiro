const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { email, firstName, lastName, roleId, society, status, password } = req.body;
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            firstName,
            lastName,
            roleId,
            society,
            status,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(`Attempting login for user: ${email}`);

        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.email, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Login successful');
        res.status(200).json({ token });
    } catch (error) {
        console.log('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
