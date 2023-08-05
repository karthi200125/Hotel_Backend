import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

// CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error); 
  }
};

// UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error); 
  }
};

// DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been Deleted");
  } catch (error) {
    next(error); 
  }
};

// GET
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error); 
  }
};

// GET ALL
export const getAllHotels = async (req, res, next) => {
  try {
    const { min, max } = req.query;
    const query = min && max ? { featured: true, cheapestPrice: { $gte: parseInt(min), $lte: parseInt(max) } } : { featured: true };
    const hotels = await Hotel.find(query).limit(parseInt(req.query.limit));
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// Count hotels by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(cities.map(city => {
      return Hotel.countDocuments({ city: city });
    }));
    res.status(200).json(list);
  } catch (error) {
    next(error); 
  }
};

// Get hotels by city name
export const getHotelsByCity = async (req, res, next) => {
  const cityName = req.params.city;
  try {
    const hotels = await Hotel.find({ city: cityName });
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

// Count hotels by type
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

// Get rooms for a hotel
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(hotel.roomNumbers.map(roomId => {
      return Room.findById(roomId);
    }));
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
