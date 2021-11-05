const { nextISSTimesForMyLocation } = require('./iss');


// // fetchMyIP((error, ip) => {
// //   if (error) {
// //     console.log("It didn't work!" , error);
// //     return;
// //   }
// //   console.log('It worked! Returned IP:' , ip);
  
// // });
// // fetchCoordsByIP('173.34.145.80', (error, coordinates) => {
// //   if (error) {
// //     console.log("Sorry, it didn't work!" , error);
// //     return;
// //   }
// //   console.log('Yes! It worked! Returned coordinates:' , coordinates);
  
// // });

// // const coords = { latitude: 43.6509, longitude: -79.5527 }
// // fetchISSFlyOverTimes(coords, (error, passTimes) => {
// //   if (error) {
// //     console.log("Sorry, it didn't work!" , error);
// //     return;
// //   }
// //   console.log('Yes! It worked! Fly over times:' , passTimes);
// // });



const getPassTime = (passTimes) =>{
  for (let pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!

  getPassTime(passTimes);
});