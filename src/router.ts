import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', getProducts)

router.get('/:id', 
    // Validación
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductsById
)

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .isNumeric().custom((value) => value > 0).withMessage('El valor no es válido')
        .notEmpty().withMessage('El precio del producto es obligatorio'),
    handleInputErrors,
    createProduct
)

// PUT - Actualiza todo el objeto de producto
router.put('/:id', 
    // Validación
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .isNumeric().custom((value) => value > 0).withMessage('El valor no es válido')
        .notEmpty().withMessage('El precio del producto es obligatorio'),
    body('availability')
        .isBoolean().withMessage('La disponibilidad no es válida'),
    handleInputErrors,
    updateProduct
)

// PATCH - solo cambia el dato que se le esta enviando
router.patch('/:id', 
    // Validación
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    // Validación
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router