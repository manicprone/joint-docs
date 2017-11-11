import lodashObject from 'lodash/object';
import lodashLang from 'lodash/lang';
import lodashArray from 'lodash/array';
import lodashCollection from 'lodash/collection';

// -----------------------------------------------------------------------------
// diffArrays (<Array> previous, <Array> current)
// -----------------------------------------------------------------------------
// Returns an object of non-matching data when comparing "previous" to "current".
// If no differences, the function returns null.
//
// The function only supports flat arrays.
//
// The return object will group the differences into "added" and "removed"
// from the perspective of the "previous" array.
// -----------------------------------------------------------------------------
// For example:
//
// const previous = ['a', 'b', 'x', 'y'];
// const current = ['b', 'x', 'm'];
//
// diffArrays(previous, current)
// Returns =>
// {
//   added: ['m'],
//   removed: ['a', 'y'],
// }
//
// TODO: Add support for object arrays as well !!!
// -----------------------------------------------------------------------------
function diffArrays(previous = [], current = []) {
  // Check for diffs...
  const addedItems = lodashCollection.filter(current, (item) => {
    return !lodashCollection.includes(previous, item);
  });
  const removedItems = lodashCollection.filter(previous, (item) => {
    return !lodashCollection.includes(current, item);
  });

  // Return diffs in object...
  if (addedItems.length > 0 || removedItems.length > 0) {
    const diffs = {};
    if (addedItems.length > 0) diffs.added = addedItems;
    if (removedItems.length > 0) diffs.removed = removedItems;

    return diffs;
  }

  // Otherwise, return null...
  return null;
}

// -----------------------------------------------------------------------------
// reduceToSingleElementArray (<Array> array, <String> propertyName)
// -----------------------------------------------------------------------------
// Takes an array of objects, and returns a flattened array containing only the
// value indicated by "propertyName".
// -----------------------------------------------------------------------------
// For example:
//
// const objectArray = [
//   { id: 1, key: 'serotonin', label: 'Serotonin', mask: '100' },
//   { id: 2, key: 'dopamine', label: 'Dopamine', mask: '010'  },
//   { id: 3, key: 'norepinephrine', label: 'Norepinephrine', mask: '001' },
// ];
//
// reduceToSingleElementArray(objectArray, 'key')
// Returns =>
// ['serotonin', 'dopamine', 'norepinephrine]
// -----------------------------------------------------------------------------
function reduceToSingleElementArray(array, propertyName = 'id') {
  if (array && array.length > 0) {
    return array.map((object) => {
      return object[propertyName];
    });
  }
  return null;
}

// -----------------------------------------------------------------------------
// includesObject (<Array> array, <String> propertyName, <String> propertyValue)
// -----------------------------------------------------------------------------
function includesObject(array, propertyName = 'id', propertyValue) {
  let result = false;

  if (array && array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      const entry = array[i];
      const hasProp = lodashObject.has(entry, propertyName);
      const valueToCheck = entry[propertyName];

      if (hasProp && valueToCheck === propertyValue) {
        result = true;
        break;
      }
    } // end-for
  } // if (array && array.length > 0)

  return result;
}

export default {
  get: lodashObject.get,
  has: lodashObject.has,
  mapValues: lodashObject.mapValues,
  isEmpty: lodashLang.isEmpty,
  remove: lodashArray.remove,
  includes: lodashCollection.includes,
  filter: lodashCollection.filter,
  diffArrays,
  reduceToSingleElementArray,
  includesObject,
};
