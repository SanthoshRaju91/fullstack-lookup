import logger from '../../utils/logger';
import Workshop from './model';

export async function createWS(req, res) {
    try {
        let newWS = new Workshop({
            name: req.body.name,
            description: req.body.description,
            choreographer: req.body.choreographer,
            fees: req.body.fees,
            schedule: Date(req.body.schedule),
            venue: req.body.venue
        });

        let savedWS = await newWS.save();

        res.json({
            success: true,
            message: 'New workshop created',
            workshop: savedWS
        });
    } catch(err) {
        throw err;
    }
}

export async function getAllWS(req, res) {
    try {
        let workshops = await Workshop.find({});

        res.json({
            success: true,
            workshops
        });
    } catch(err) {
        throw err;
    }
}

export async function getWS(req, res) {
    try {
        let { id } = req.params;

        let workshop = await Workshop.findById({_id: id});
        
        res.json({
            success: true,
            workshop
        });
    } catch(err) {
        throw err;
    }
}

export async function updateWS(req, res) {
    try {
        let { id, name, description, choreographer, fees, schedule, venue } = req.body;

        let workshop = await Workshop.findById({ _id: id});

        let updatedWS = await Workshop.findOneAndUpdate({ _id: id}, {
            name: name || workshop.name,
            description: description || workshop.description,
            choreographer: choreographer || workshop.choreographer,
            fees: fees || workshop.fees,
            schedule: schedule || workshop.schedule,
            venue: venue || workshop.venue
        });

        res.json({
            success: true,
            message: 'Workshop updated',
            workshop: updatedWS
        })
    } catch(err) {
        throw err;
    }
}

export async function deleteWS(req, res) {
    try {
        let { id } = req.body;

        let deleted = await Workshop.findByIdAndRemove({ _id: id});

        if(Object.keys(deleted).length > 0) {
            res.json({
                success: true,
                message: 'Deleted'
            });
        } else {
            res.json({
                success: false,
                message: `Could not delete workshop - ${id}`,
                workshop: deleted
            });
        }
    } catch(err) {
        throw err;
    }
}