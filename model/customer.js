const {db} = require('../db')
const shortId = require('shortid');
const random = require('randomatic');

var  Data = {}


class Customer{

    constructor(name){
        this.name = name;
    }

    save(mobile, address, issue, maker, model, date){
        var info = {
            name : this.name,
            order_id : shortId.generate()
        }

        var orderInfo = {
            comp_no : compNo(),
            order_id : info.order_id,
            date :  date === ''? new Date().toDateString(): date ,
            name : this.name,
            mobile : mobile,
            address : address,
            issue : issue,
            maker : maker,
            model : model,
            payment : '',
            fee_amount : '',
            part_replaced : '',
            pending_reason : '',
            remark : '',
        }

    
        db.customer.insert(info, (err, data) =>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })

        db.customer_order.insert(orderInfo, (err, data) => {
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
            Data = data;
            show()
           
        })
    }

}

function show(){
    console.log(Data)
}

function compNo(){
    return random('0000')
}


module.exports = {
    Customer,
    compNo
}