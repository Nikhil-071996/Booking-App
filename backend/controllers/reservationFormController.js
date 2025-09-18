import Reservation from "../model/reservation.js";

const createReservation = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests } = req.body;
        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const reservation = new Reservation({
            name,
            email,
            phone,
            date,
            time,
            guests
        });

        await reservation.save();
        return res.status(201).json({ message: "Reservation created successfully" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

const getAllReservations = async (req, res) => {

    try {
        const reservations = await Reservation.find();
        return res.status(200).json(reservations);
    } catch (error) {
        res.json({ message: error.message });
    }

}

const deleteReservation = async (req, res) => {
    try{
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Please provide an id" });
        }

        const reservation = await Reservation.findByIdAndDelete(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        return res.status(200).json({ message: "Reservation deleted successfully" });
    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { createReservation, getAllReservations, deleteReservation };