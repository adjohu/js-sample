export class Point {
  constructor(latitude, longitude) {
    if (!typeof latitude === 'number' || !typeof longitude === 'number') {
      throw new Error('arguments must be numeric');
    }

    this.latitude = latitude;
    this.longitude = longitude;
  }
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

// returns a centralAngle in radians
function calculateCentralAngle(pointA, pointB) {
  if (!pointA instanceof Point || !pointB instanceof Point) {
    throw new Error('calculateCentralAngle must be passed 2 Points');
  }

  const degrees = Math.acos(
    Math.sin(pointA.latitude) * Math.sin(pointB.latitude) +
      Math.cos(pointA.latitude) *
        Math.cos(pointB.latitude) *
        Math.cos(Math.abs(pointA.longitude - pointB.longitude))
  );

  return degreesToRadians(degrees);
}

function calculateDistanceFromCentralAngle(centralAngle, radius) {
  if (!typeof centralAngle === 'number' || !typeof radius === 'number') {
    throw new Error('arguments must be numeric');
  }
  return radius * centralAngle;
}

function calculateDistance(pointA, pointB, radius) {
  const centralAngle = calculateCentralAngle(pointA, pointB);
  return calculateDistanceFromCentralAngle(centralAngle, radius);
}

export function calculateDistanceOnEarth(pointA, pointB) {
  const EARTH_RADIUS = 6371;
  return calculateDistance(pointA, pointB, EARTH_RADIUS);
}
