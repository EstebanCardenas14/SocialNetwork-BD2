const { Router } = require('express');
const router = Router();
const { findAll, findById, create, findByIdAndUpdate, findByIdAndDelete } = require('../models/seller');

router.post('/create', async (req, res) => {
    const result = await create(req.body);
    console.log(result);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else if (result === 'Seller already exists') {
        res.status(500).json({
            message: result
        });
    } else {
        res.status(200).json({
            message: 'Seller created successfully',
            seller : result
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
            message: 'Sellers found successfully',
            sellers : result
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
            message: 'Seller found successfully',
            seller : result
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
            message: 'Seller updated successfully',
            seller : result
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
            message: 'Seller deleted successfully',
            seller : result
        });
    }
}
);
module.exports = router;