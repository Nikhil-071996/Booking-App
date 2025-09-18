import express from 'express';
import { createReservation, getAllReservations, deleteReservation } from '../controllers/reservationFormController.js';


const router = express.Router();


router.post('/create', createReservation);
router.get('/all', getAllReservations);
router.delete('/delete/:id', deleteReservation);

export default router;