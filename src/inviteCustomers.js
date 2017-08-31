import {Point, calculateDistanceOnEarth} from './location';

// Office location
const OFFICE = new Point(53.339428, -6.257664);

// Max customer distance to invite
const MAX_DISTANCE = 100; // KM

export default function inviteCustomers(
  customers,
  maxDistance = MAX_DISTANCE,
  location = OFFICE
) {
  const nearbyCustomers = customers.filter(({latitude, longitude}) => {
    const customerLocation = new Point(latitude, longitude);
    return calculateDistanceOnEarth(location, customerLocation) <= maxDistance;
  });

  return nearbyCustomers
    .sort((a, b) => a.user_id > b.user_id)
    .map(({user_id, name}) => ({user_id, name}));
}
