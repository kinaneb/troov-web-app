import SignaledObject from '../models/SignaledObject.js';

const allSignaledObjects = async (req, res) => {
    try {
        const signaledObjects = await SignaledObject.find();
        res.json(signaledObjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSignaledObject = async (req, res) => {
    const signaledObjectId = req.params.id;
    try {
        const signaledObject = await SignaledObject.findById(signaledObjectId);
        if (signaledObject) {
            res.json(signaledObject.toObject());
        } else {
            res.status(404).json({ message: 'Signaled Object not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createSignaledObject = async (req, res) => {
    const  signaledObject  = req.body;
    try {
        const newSignaledObject = new SignaledObject(signaledObject);
        await newSignaledObject.save();
        res.status(201).json(newSignaledObject.toObject());
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateSignaledObject = async (req, res) => {
    const signaledObjectId = req.params.id;
    try {
        const signaledObject = await SignaledObject.findById(signaledObjectId);
        if (signaledObject) {
            Object.assign(signaledObject, req.body); 
            const updatedSignaledObject = await signaledObject.save();
            res.json(updatedSignaledObject.toObject());
        } else {
            res.status(404).json({ message: 'Signaled Object not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteSignaledObject = async (req, res) => {
    const signaledObjectId = req.params.id;
    try {
        const signaledObject = await SignaledObject.findById(signaledObjectId);
        if (signaledObject) {
            await signaledObject.deleteOne();
            res.json({ message: 'Signaled Object deleted' });
        } else {
            res.status(404).json({ message: 'Signaled Object not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export { allSignaledObjects, getSignaledObject, createSignaledObject, updateSignaledObject, deleteSignaledObject};