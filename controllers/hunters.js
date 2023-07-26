const Hunter = require('../models/Hunter');

module.exports = {
    getHunters: async (req, res) => {
        try{
            const hunters = await Hunter.find({}).sort({ name: 1 }).lean();

            res.json(hunters)
        }catch (err){
            res.status(400).json({error: err});   
        }
    },
    getHunter: async (req, res) => {
        try {
            const hunterName = req.params.hunter.toLowerCase()
            const hunter = await Hunter.find({name: hunterName})
            res.status(200).json(hunter);
        }catch(err){
            res.status(400).json({error: err});  
        }
    }
}