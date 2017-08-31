import test from 'tape';
import inviteCustomers from './inviteCustomers';
import {Point} from './location';

const OFFICE = new Point(53.339428, -6.257664);
const NY = new Point(40.71278, -74.00594);

const eligibleCustomers = [
  {
    user_id: 2,
    name: 'test2',
    latitude: OFFICE.latitude,
    longitude: OFFICE.longitude
  },
  {
    user_id: 1,
    name: 'test',
    latitude: OFFICE.latitude,
    longitude: OFFICE.longitude
  }
];

const ineligibleCustomers = [
  {user_id: 3, name: 'test3', latitude: NY.latitude, longitude: NY.longitude},
  {user_id: 4, name: 'test4', latitude: NY.latitude, longitude: NY.longitude}
];

const customers = [...eligibleCustomers, ...ineligibleCustomers];

test('inviteCustomers should sort customers by user_id', t => {
  const result = inviteCustomers(eligibleCustomers);
  t.true(result[0].user_id === 1);
  t.true(result[1].user_id === 2);
  t.end();
});

test('inviteCustomers should only return name and user_id', t => {
  const result = inviteCustomers(eligibleCustomers);
  t.same(Object.keys(result[0]), ['user_id', 'name']);
  t.end();
});

test('inviteCustomers should filter out customers which are too far away', t => {
  const result = inviteCustomers(customers);
  t.true(result.length === 2);
  t.true(result[0].user_id === 1);
  t.true(result[1].user_id === 2);
  t.end();
});

test('inviteCustomers should allow override of max distance', t => {
  const result = inviteCustomers(customers, 10000);
  t.true(result.length === 4);
  t.end();
});

test('inviteCustomers should allow override of office location', t => {
  const result = inviteCustomers(customers, 100, NY);
  t.true(result.length === 2);
  t.true(result[0].user_id === 3);
  t.true(result[1].user_id === 4);
  t.end();
});
