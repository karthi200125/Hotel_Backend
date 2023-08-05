import express from 'express'
import {verifyAdmin} from '../utils/veridyToken.js'
import {createRoom,deleteRoom,getAllRooms,getRoom,updateRoom,updateRoomavailabilty} from '../controller/room.js'

const router=express.Router()

router.post("/:id", verifyAdmin,createRoom);
router.put("/:id",verifyAdmin, updateRoom);
router.put("availability/:id", updateRoomavailabilty);
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom);
router.get("/:id", getRoom);
router.get("/", getAllRooms);


export default router