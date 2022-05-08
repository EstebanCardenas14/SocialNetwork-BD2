const { Router } = require('express');
const router = Router();
const { create, buy, recommend, top5, suggestion, findAll, findById, update, deleteById } = require('../models/product');

router.post('/create/:id_seller', async (req, res) => {
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
    }
    const result = await create(product, req.params.id_seller);
    console.log(result);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else if (result === 'Product already exists') {
        res.status(500).json({
            message: result
        });
    } else {
        res.status(200).json({
            message: 'Product created successfully',
            product: result
        });
    }
}
);
router.post('/buy/:id_product', async (req, res) => {
    const result = await buy(req.params.id_product, req.body.id_buyer);
    console.log(result);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else if (result === 'Product not found') {
        res.status(500).json({
            message: result
        });
    } else if (result === 'Buyer not found') {
        res.status(500).json({
            message: result
        });
    } else {
        res.status(200).json({
            message: 'Product bought successfully',
            product: result
        });
    }
}
);
router.post('/recommend/:id_product', async (req, res) => {
    try {
        const result = await recommend(req.params.id_product, req.body.id_buyer, req.body.qualification);
        console.log(result);
        if (result === 'Product not found') {
            res.status(500).json({
                message: result
            });
        } else if (result === 'Buyer not found') {
            res.status(500).json({
                message: result
            });
        } else {
            res.status(200).json({
                message: 'Product recommended successfully',
                product: result
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}
);
router.get('/top5', async (req, res) => {
    const result = await top5();
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else {
        res.status(200).json({
            message: 'Top 5 products found successfully',
            products: result
        });
    }
}
);
router.get('/suggestion', async (req, res) => {
   try{
    const result = await suggestion(req.body.buyer_name, req.body.product_name);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else {
        res.status(200).json({
            message: 'Suggestion found successfully',
            products: result
        });
    }
   } catch (error) {
         res.status(500).json({
              message: error
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
            message: 'Products found successfully',
            products: result
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
            message: 'Product found successfully',
            product: result
        });
    }
}
);
router.put('/findByIdAndUpdate/:id', async (req, res) => {
    const result = await update(req.params.id, req.body);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else {
        res.status(200).json({
            message: 'Product updated successfully',
            product: result
        });
    }
}
);
router.delete('/findByIdAndDelete/:id', async (req, res) => {
    const result = await deleteById(req.params.id);
    if (result.error) {
        res.status(500).json({
            message: result.error
        });
    } else {
        res.status(200).json({
            message: 'Product deleted successfully',
            product: result
        });
    }
}
);
module.exports = router;