// Function return collection of final node elements
// ex. const obj = {  a: { b: { c: 1 }, n: { c: 1 }, m: { c: 2 } } };
// makeCollection(obj) return [1, 2]
export const makeCollection = (node: any): any[] => {
  let result = [];

  // Collect all finally node
  if (typeof node !== 'object') {
    result = [].concat(result, node);
  }

  // If node is type 'object', that get object keys and search node again
  if (typeof node === 'object') {
    const keys = Object.keys(node);

    for (let i = 0; i < keys.length; i++) {
      const nextNode = keys[i];

      result = [...result, ...makeCollection(node[nextNode])];
    }
  }

  // Return array of uniq elements
  return [...new Set(result)];
};
