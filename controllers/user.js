const UserDb = require(`../models`).UserDb;
const bcrypt = require(`bcryptjs`);
const TaskDb = require(`../models`).TaskDb;

const UserController = {
    addUser: async (req, res) => {
        try {
            const user = {
                username: req.body.username,
                email: req.body.email,
                parola: req.body.parola,
                dataNastere: req.body.dataNastere,
                contPremium: req.body.contPremium,
            };
            let errMsg = [];
            let errCounter = 0;
            if (user === undefined) {
                errMsg[errCounter++] = "Toate campurile trebuie sa fie completate!";
            }
            if (!user.username || !user.email || !user.parola || !user.dataNastere || !user.contPremium) {
                errMsg[errCounter++] = "Unul sau mai multe campuri sunt goale";
            }
            if (errMsg > 0) {
                res.status(400).send(errMsg);
                return;
            }
            if (user.username.length <= 2) {
                errMsg[errCounter++] = "Numele trebuie sa contina minim 2 litere.";
            }
            if (!user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                errMsg[errCounter++] = "Email-ul nu are formatul bun.";
            }
            if (user.parola.length < 8) {
                errMsg[errCounter++] = "Parola trebuie sa contina minim 8 caractere.";
            }
            if (new Date(user.dataNastere) == "Invalid Date") {
                errMsg[errCounter++] = "Data invalida";
            }
            if (errCounter > 0) {
                res.status(400).send(errMsg);
                return;
            }
            user.parola = await bcrypt.hash(user.parola, 10);
            await UserDb.create(user);
            res.status(200).send("User-ul a fost creat cu succes");
        } catch (error) {
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            let users = await UserDb.findAll();
            if (users == {}) {
                res.status(404).send("Nu au fost gasiti utilizatori!");
                return;
            }
            res.status(200).send(users);
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    getUserById: async(req, res) => {
        try{
            const id = req.params.id;
            let users = await UserDb.findByPk(id);
            if(!users){
                res.status(404).send("User-ul nu a fost gasit!");
                return;
            }
            res.status(200).send(users);
        }catch(error){ 
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    deleteUser: async(req, res) => {
        try{
            const id = req.params.id;
            let users = await UserDb.findByPk(id);
            if(!users){
                res.status(404).send("User-ul nu a fost gasit!");
                return;
            }
            await TaskDb.destroy({
                where:{
                    id_user: id,
            }
            });
            await UserDb.destroy({
                where:{
                    id: id,
                }
            })
            // let tasks = await TaskDb.findAll({
            //     where:{
            //         id_user: id,
            //     }
            // })
            // if(tasks!=[]){
            //     await TaskDb.destroy({
            //         where:{
            //             id_user: id,
            //         }
            //     });
            // }
            // await UserDb.destroy({
            //     where:{
            //         id:id,
            //     }
            // });
            res.status(200).send("User-ul a fost sters din baza de date");
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    }
}

module.exports = UserController;