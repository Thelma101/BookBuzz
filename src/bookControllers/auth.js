const express = require('express');
const app = express();



app.use(express.json());
// register login

const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const newUser = await user.create({ email, password, name });
        res.status(201).json(newUser);

    } catch (error) {
        console.error(error);
    }
// joi validation error
    

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await user.findOne({ email });

        if (!user ||!(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

    } catch (error) {
        console.error(error);
    }
}