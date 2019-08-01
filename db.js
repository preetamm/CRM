const DataStore = require('nedb');
const app = require('electron').remote.app



const datafactory = (filename) => new DataStore({
    filename:  `${filename}`,
    autoload: true
})



const db = {
    customer: datafactory('customer.js'),
    customer_order: datafactory('customer_order.js')
}



module.exports = {
    db
}
