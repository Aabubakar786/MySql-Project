const db = require('../models');
const User = db.user;

const addUser = async (req, res) => {
    try {
        const jane = await User.create({
            firstName: "Robin4",
            lastName: "",
            email: "aha223=@ha.com"
        });

        // jane.update({ firstName: 'robin45', lastName: '' })

        res.status(200).json(jane.toJSON());
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUser = async (req, res) => {
    const data = await User.findAll({});
    res.status(200).json({ data: data })
}

const getSingleUser = async (req, res) => {
    try {
        const data = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ data: data });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const createUser = async (req, res) => {
    try {
        let userData = req.body;

        // Check if req.body is an array
        if (Array.isArray(userData)) {
            // Bulk insertion for an array of users
            const newUsers = await User.bulkCreate(userData);
            res.status(200).json({ data: newUsers });
        } else {
            // Single insertion for a single user
            const { firstName, lastName, email } = userData;
            const newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            res.status(200).json({ data: newUser });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            res.status(400).json({ error: 'Validation Error', details: error.errors });
        } else {
            console.error('Error creating user(s):', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Find the user by ID and delete it
        const deletedUser = await User.destroy({
            where: {
                id: userId
            }
        });

        // Check if a user was deleted
        if (deletedUser === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const patchUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        // Check if the ID is valid
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Find the user by ID and update only the specified fields
        const [rowsUpdated] = await User.update(updateData, {
            where: {
                id: userId
            }
        });
      console.log('rowsUpdated',rowsUpdated)
        // Check if a user was updated
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to handle PUT request for updating or creating a user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;

        // Check if the ID is valid
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Use upsert (update or insert) to handle both updating and creating
        const [user, created] = await User.upsert({
            id: userId,
            ...userData
        });

        if (created) {
            res.status(201).json({ message: 'User created successfully', data: user });
        } else {
            res.status(200).json({ message: 'User updated successfully', data: user });
        }
    } catch (error) {
        console.error('Error updating/creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    addUser,
    getUser,
    getSingleUser,
    createUser,
    deleteUser,
    patchUser,
    updateUser
};
