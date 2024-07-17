// const { SHOWTABLES } = require('sequelize/lib/query-types');
const { models: { User } } = require('../model/index');

module.exports = {
    create: async (req, res) => {
        try {
            if (req.body.name && req.body.EmpId) {
                const { name, EmpId } = req.body;

                const newUser = await User.create({
                    name,
                    EmpId
                })
                return newUser;

            }
        }
        catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        try {
            if (req.body.name && req.body.EmpId) {
                const { name, EmpId } = req.body;

                const user = await User.findOne({
                    where: {
                        EmpId: req.body.EmpId
                    }
                })

                try {
                    user.name = req.body.name;
                    await user.save();
                } 
                catch {
                    console.log("There was no such user found.")
                } 
                finally {
                    return user;
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    },
    delete: async (req, res) => {
        try {
            const delUser = await User.destroy({
                where: {
                    apiKey: req.params.apiKey
                }
            })
            return delUser;
        }
        catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await User.findAll();
            return users;
        }
        catch (error) {
            console.log(error)
        }
    },
    getOne: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    apiKey: req.params.apiKey
                }
            })
            return user;
        } catch (error) {
            console.log(error);
        }

    }
}