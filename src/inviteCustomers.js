import customers from './customers.json';
import {Point, calculateDistanceOnEarth} from './location.js';

// Office location
const office = new Point(53.339428, -6.257664);

// Max customer distance to invite
const MAX_DISTANCE = 100; // KM

const nearbyCustomers = customers.filter(({latitude, longitude}) => {
  const location = new Point(latitude, longitude);
  return calculateDistanceOnEarth(office, location) <= MAX_DISTANCE;
});

// Overkill as it's only used once but hey
const pick = fields => obj => {
  return fields.reduce((result, field) => {
    if (Object.hasOwnProperty.call(obj, field)) {
      result[field] = obj[field];
    }
    return result;
  }, {});
};

const sortedCustomers = nearbyCustomers
  .sort((a, b) => a.user_id > b.user_id)
  .map(pick(['user_id', 'name']));
