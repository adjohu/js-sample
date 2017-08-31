import test from 'tape';
import {Point, calculateDistanceOnEarth} from './location';

test('calculateDistanceOnEarth returns correct distance for known places', t => {
  const sf = new Point(37.774929, -122.419418);
  const ny = new Point(40.71278, -74.00594);
  t.same(Math.round(calculateDistanceOnEarth(sf, ny)), 4129);
  t.end();
});

test('calculate distance throws if not called with 2 points', t => {
  const a = new Point(37, -12);
  t.throws(() => calculateDistanceOnEarth(a, 123));
  t.end();
});

test('Point requires 2 integers', t => {
  t.throws(() => new Point(123, 'a'));
  t.end();
});
