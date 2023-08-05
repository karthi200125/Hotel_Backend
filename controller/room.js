import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import {createError } from '../utils/erorr.js';

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedroom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedroom._id } });
    } catch (error) {
      next(err);
    }
    res.status(200).json(savedroom);
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    await Room.updateOne({"roomNumbers._id":req.params.id},{
      $push:{
        "roomNumbers.$.unavailableDates":
        req.body.dates
}
    })
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
// Update availabilty
export const updateRoomavailabilty = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    try {
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
      } catch (error) {
        next(err);
      }
    res.status(200).json("Room has been Deleted");
  } catch (error) {
    next(error);
  }
};

// GET
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
