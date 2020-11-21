const axios = require("axios");
const fare = require("./model/fare");

const getResult = async (req, res) => {
  const { lat1, long1, lat2, long2 } = req.body;

  if (!lat1 || !lat2 || !long1 || !long2) {
    return res.status(400).json({ message: "Invalid inputs" });
  }
  const key = process.env.GOOGLE_KEY;
  const distanceResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${long1}&destinations=${lat2},${long2}&key=${key}`
  );
  const response = distanceResponse.data;
  if (response.status != "OK") {
    return res.status(400).json({
      message: "Something went wrong , please try again later!!",
    });
  }

  let result = [];
  let distance = response.rows[0].elements[0].distance.text.split(" ")[0]; // distnace in km
  let time = response.rows[0].elements[0].duration.text.split(" ")[0]; // time in min

  // get the fare for all the cars type available
  const carfares = await fare.find({});

  //iterate over all the available car type and calc price
  carfares.forEach((i) => {
    let answer = {
      type: i.carType,
      price: time * i.farePerMin + distance * i.farePerKM, // total price total distance * distance rate + total mins * mins rate
      distance,
      time,
    };
    result.push(answer);
  });
  res.json(result);
};

module.exports = getResult;
