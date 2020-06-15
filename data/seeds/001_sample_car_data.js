
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: '1A6G78PL8906M23X8',
          make: 'Toyota',
          model: 'Tacoma',
          mileage: 0,
          transmission: 'auto',
          titleStatus: 'clean'
        },
        {
          VIN: '8PL83X81906M2A6G7',
          make: 'Chevy',
          model: 'Silverado',
          mileage: 34705,
          transmission: 'auto',
          titleStatus: 'salvage'
        },
        {
          VIN: '906M2816A8PL83XG7',
          make: 'Ford',
          model: 'Ranger',
          mileage: 85249,
          transmission: 'manual',
          titleStatus: 'clean'
        }

      ]);
    });
};
