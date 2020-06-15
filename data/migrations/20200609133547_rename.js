
exports.up = function (knex) {
    return knex.schema.table('cars', tbl => {
        tbl.renameColumn('vin', 'VIN')
    })
};

exports.down = function (knex) {
    return knex.schema.table('cars', tbl => {
        tbl.renameColumn('VIN', 'vin')
    })
};
