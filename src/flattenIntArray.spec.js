import test from 'tape';
import flattenIntArray from './flattenIntArray';

test('flattenIntArray should flatten a deeply nested array of ints', t => {
  const expected = [1, 2, 3, 4];
  const arr = [[1, 2, [3]], 4];
  t.same(flattenIntArray(arr), expected);
  t.end();
});

test('flattenIntArray should throw if not passed an array', t => {
  t.throws(() => flattenIntArray(1));
  t.throws(() => flattenIntArray('a'));
  t.throws(() => flattenIntArray({length: 12}));
  t.throws(() => flattenIntArray({reduce: () => {}}));
  t.end();
});

test('flattenIntArray should throw if it encounters anything other than an array or int', t => {
  t.throws(() => flattenIntArray(['a']));
  t.throws(() => flattenIntArray([1, 2, {test: true}]));
  t.end();
});
