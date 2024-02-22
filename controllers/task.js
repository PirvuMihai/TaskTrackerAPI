const TaskDb = require(`../models`).TaskDb;

const TaskController = {
    addTask: async(req, res) => {
        try{
            const task = {
                nume: req.body.nume,
                dataInceput: req.body.dataInceput,
                dataTerminare: req.body.dataTerminare,
                descriere: req.body.descriere,
                esteTerminat: req.body.esteTerminat,
                id_user: req.body.id_user,
            }
            let errMsg = [];
            let errCounter = 0;
            if(task === undefined  || !task.nume || !task.dataInceput){
                errMsg[errCounter++] = "Va rugam completati toate campurile obligatorii!";
            }
            if(errCounter>0){
                res.status(400).send(errMsg);
                return;
            }
            if(new Date(task.dataInceput) == "Data invalida") {
                errMsg[errCounter++] = "Va rugam sa introduceti o data valida";
            }
            if((new Date(task.dataTerminare) == "Data invalida") && (task.dataTerminare.length>0) ){
                errMsg[errCounter++] = "Va rugam sa introduceti o data valida";
            }
            if(errCounter>0){
                res.status(400).send(errMsg);
                return;
            }
            await TaskDb.create(task);
            res.status(200).send("Task adaugat cu succes!");
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    getAllTasks: async(req, res) => {
        try {
            let tasks = await TaskDb.findAll();
            console.log(tasks);
            if (tasks == []) {
                res.status(404).send("Nu au fost gasite task-uri!");
                return;
            }
            res.status(200).send(tasks);
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    },

    getAllUnfinishedTasks: async(req, res) => {
        try{
            let tasks = await TaskDb.findAll({
                where:{
                    esteTerminat: false
                }
            })
            if (tasks == []) {
                res.status(404).send("Nu au fost gasite task-uri!");
                return;
            }
            res.status(200).send(tasks);
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    },

    getTaskById: async(req, res) => {
        try{
            const id = req.params.id;
            let tasks = await TaskDb.findByPk(id);
            if(!tasks){
                res.status(404).send("Task-ul nu a fost gasit!");
                return;
            } 
            res.status(200).send(tasks);
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    updateTask: async(req, res) => {
        try{
            const id = req.params.updateId;
            let tasks = await TaskDb.findByPk(id);
            if(!tasks){
                res.status(404).send("Task-ul nu a fost gasit!");
                return;
            }
            let task = {
                nume: req.body.nume,
                dataInceput: req.body.dataInceput,
                dataTerminare: req.body.dataTerminare,
                descriere: req.body.descriere,
                esteTerminat: req.body.esteTerminat,
            }
            let errCounter = 0;
            let errMsg = [];
            if(task === undefined  || !task.nume || !task.dataInceput){
                errMsg[errCounter++] = "Va rugam completati toate campurile obligatorii!";
            }
            if(errCounter>0){
                res.status(400).send(errMsg);
                return;
            }
            if(new Date(task.dataInceput) == "Data invalida") {
                errMsg[errCounter++] = "Va rugam sa introduceti o data valida";
            }
            if((new Date(task.dataTerminare) == "Data invalida") && (task.dataTerminare.length>0) ){
                errMsg[errCounter++] = "Va rugam sa introduceti o data valida";
            }
            if(errCounter>0){
                res.status(400).send(errMsg);
                return;
            }
            await tasks.update(task);
            res.status(200).send("Task-ul a fost modificat cu succes!");

        }catch(error){
            res.status(500).send("Server errror!");
            console.log(error);
        }
    },
    taskTerminat: async(req, res) => {
        try{
            const id = req.params.id;
            await TaskDb.update({esteTerminat: true}, {
                where: {
                    id: id,
                }
            })
            res.status(200).send("Task-ul a fost inregistrat ca terminat.");
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    },
    deleteTask: async(req, res) => {
        try{
            const id = req.params.id;
            let tasks = await TaskDb.findByPk(id);
            if(!tasks){
                res.status(404).send("Task-ul nu a fost gasit!");
                return;
            }
            await TaskDb.destroy({
                where:{
                    id:id,
                }
            });
            res.status(200).send("Task-ul a fost sters cu succes!");
        }catch(error){
            res.status(500).send("Server error!");
            console.log(error);
        }
    }
    }

module.exports = TaskController;