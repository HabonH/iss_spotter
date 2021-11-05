const request = require('request');
  const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    console.log("IP converted: ", ip);
    if (ip) callback(null, ip);
    
  });
};

const fetchCoordsByIp = function(ip,callback) {
    request(`http://freegeoip.app/json/${ip}`, function(error, response, body) {
      if (error) {
        callback(error,null);
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const { latitude, longitude } = JSON.parse(body);
  
      callback(null, { latitude, longitude });
    });
  };


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  
  });
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip)=> {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIp(ip, (error, location) => {
      if (error) {
        return callback(error,null);
      }
      fetchISSFlyOverTimes(location,(error, nextPasses)=> {
        if (error) {
          return callback(error, null);
        }
        callback(error, nextPasses);
      });
    });
  });
  
  
};


module.exports = {nextISSTimesForMyLocation};