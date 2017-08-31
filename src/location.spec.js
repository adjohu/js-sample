import test from 'tape';
import {Point, calculateDistanceOnEarth} from './location';

test('calculateDistanceOnEarth returns correct distance for known places', t => {
  const sf = new Point(37.774929, -122.419418);
  const ny = new Point(40.71278, -74.00594);
  t.same(Math.round(calculateDistanceOnEarth(sf, ny)), 4129);
  t.end();
});
