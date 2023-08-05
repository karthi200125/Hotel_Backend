import express from 'express';
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel ,countByCity,countByType, getHotelRooms,getHotelsByCity} from '../controller/hotel.js';
import {verifyAdmin} from '../utils/veridyToken.js'

const router = express.Router();

router.post("/", verifyAdmin,createHotel);
router.put("/:id",verifyAdmin, updateHotel);
router.delete("/:id",verifyAdmin, deleteHotel);
router.get("/find/:id", getHotel);
router.get("/", getAllHotels);

router.get("/countBycity", countByCity);
router.get("/countByType", countByType);
router.get("/room:id",getHotelRooms);
router.get("/byCity/:city", getHotelsByCity);


export default router;
