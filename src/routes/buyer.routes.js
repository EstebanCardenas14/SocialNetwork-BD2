const { Router } = require('express');
const router = Router();
const {  findAll, findById, create, findByIdAndUpdate, findByIdAndDelete } = require('../models/buyer');

router.post('/create', async (req, res) => {
    const result = await create(req.body);
    console.log(result);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else if (result === 'Buyer already exists') {
        res.status(500).json({
            message: result
        });
    } else {
        res.status(200).json({
            message: 'Buyer created successfully',
            buyer : result
        });
    }
}
);

router.get('/findAll', async (req, res) => {
    const result = await findAll();
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else {
        res.status(200).json({
            message: 'Buyers found successfully',
            buyers : result
        });
    }
}
);

router.get('/findById/:id', async (req, res) => {
    const result = await findById(req.params.id);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else {
        res.status(200).json({
            message: 'Buyer found successfully',
            buyer : result
        });
    }
}
);

router.put('/findByIdAndUpdate/:id', async (req, res) => {
    const result = await findByIdAndUpdate(req.params.id, req.body);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else {
        res.status(200).json({
            message: 'Buyer updated successfully',
            buyer : result
        });
    }
}
);

router.delete('/findByIdAndDelete/:id', async (req, res) => {
    const result = await findByIdAndDelete(req.params.id);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else {
        res.status(200).json({
            message: 'Buyer deleted successfully',
            buyer : result
        });
    }
}
);

module.exports = router;