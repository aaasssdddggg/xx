const items = require('../data/items');

test('Get expired items functionality, check if it runs without error in fetching data', 
async () => {
    let result = await items.getitems();
    expect(result).toBe(true);
  });