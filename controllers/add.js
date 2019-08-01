const {Customer, compNo} = require('../model/customer')
const createCustomer = (name) => {
    return customer = new Customer(name)
}


module.exports = {
    createCustomer,
    compNo
}