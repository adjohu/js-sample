import test from 'tape';
import inviteCustomers from './inviteCustomers';
import {Point} from './location';
import customers from './customers.json';

const OFFICE = new Point(53.339428, -6.257664);

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

test('inviteCustomers should find 13 eligible customers in customers.json', t => {
  const result = inviteCustomers(customers);
  t.true(result.length === 13);
  t.end();
});

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
