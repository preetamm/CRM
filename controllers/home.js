const { db } = require('../db')
const { removeElement, addElement, calcBalance } = require('../helper')



async function searchClient(q) {
    //console.log(q)
    console.log({ 'name': q })
    return new Promise((resolve, reject) => {
        db.customer.find({ 'name': q }, function (error, docs) {
            console.log(q)
            console.log(docs)
            if (error) {
                reject()
            } else {
                resolve(docs)
            }
        })
    })


}

async function searchCLientHistory(id) {
    return new Promise((resolve, reject) => {
        db.customer_order.find({ 'order_id': id }, function (err, docs) {
            if (err) {
                reject()
            } else {
                console.log(docs)
                resolve(docs)
            }

        })
    })
}

function renderListResult(data) {
    var html = `
    <div class="remover_1"></div>
    `
    removeElement('.remover_1')
    addElement('.customer_list', html)
    var i = 0;
    data.forEach(el => {
        var template = `
        <div class="customer_data_1">
            <h5 id="${i}" onClick="showDetails()">${el.name}</h5>
        </div>`

        addElement('.remover_1', template)
        i = i + 1;
        console.log(i)


    });

}

function renderCustomerDetails(history, Uid) {
    if (Uid === undefined) {
        var recent = history.length - 1
        removeElement('.read_details')
        removeElement('.update_and_new_details')
        var html1 = ` 
         <div class="read_details">
            <h5 id='comp_no'>Comp no</h5><p id="comp_no_p">${history[recent].comp_no}</p><h5 id="date">Date</h5><p id="date_p">${history[recent].date}</p>
            <h5 id="name">Name</h5><p id="name_p">${history[recent].name}</p><h5 id="mobile">Mobile</h5><p id="mobile_p">${history[recent].mobile}</p>  
            <h5 id="address">Address</h5><p id="address_p">${history[recent].address}</p><h5 id="issue">Issue</h5><p id="issue_p">${history[recent].issue}</p>
            <h5 id="maker">Maker</h5><p id="maker_p">${history[recent].maker}</p><h5 id="model">model</h5><p id="model_p">${history[recent].model}</p><h5 id="fee_amount">Fee_amount</h5><p id="fee_amount_p">${history[recent].fee_amount}</p><h5 id="payment">Payment</h5><p id="payment_p">${history[recent].payment}</p>
            <h5 id="part_replaced">Part replaced</h5><p id="part_replaced_p">${history[recent].part_replaced}</p><h5 id="pending_reason">Pending reason</h5><p id="pending_reason_p">${history[recent].pending_reason}</p><h5 id="bal">Balance</h5><p id="bal_p"></p><h5 id="remark">Remark</h5><p id="remark_p">${history[recent].remark}</p>
            <div id="search">
            <div class="search_wrapper">
                <div class="search_field_2">
                   <input type="text" id='date_search_field'><span><i id="search_date" class="fas fa-search" onclick="dateSearch()"></i></span><i id="add_icon" class="fas fa-plus"></i>
                </div>
            <div class="history_result">
            </div>
            </div>
        </div>`

        addElement('.customer_details', html1)
        renderHistory(history)

    } else {
        removeElement('.read_details')
        removeElement('.update_and_new_details')
        var html1 = ` 
        <div class="read_details">
            <h5 id='comp_no'>Comp no</h5><p id="comp_no_p">${history[Uid].comp_no}</p><h5 id="date">Date</h5><p id="date_p">${history[Uid].date}</p>
            <h5 id="name">Name</h5><p id="name_p">${history[Uid].name}</p><h5 id="mobile">Mobile</h5><p id="mobile_p">${history[Uid].mobile}</p>  
            <h5 id="address">Address</h5><p id="address_p">${history[Uid].address}</p><h5 id="issue">Issue</h5><p id="issue_p">${history[Uid].issue}</p>
            <h5 id="maker">Maker</h5><p id="maker_p">${history[Uid].maker}</p><h5 id="model">model</h5><p id="model_p">${history[Uid].model}</p><h5 id="fee_amount">Fee_amount</h5><p id="fee_amount_p">${history[Uid].fee_amount}</p><h5 id="payment">Payment</h5><p id="payment_p">${history[Uid].payment}</p>
            <h5 id="part_replaced">Part replaced</h5><p id="part_replaced_p">${history[Uid].part_replaced}</p><h5 id="pending_reason">Pending reason</h5><p id="pending_reason_p">${history[Uid].pending_reason}</p><h5 id="bal">Balance</h5><p id="bal_p"></p><h5 id="remark">Remark</h5><p id="remark_p">${history[Uid].remark}</p>
            <div id="search">
            <div class="search_wrapper">
                <div class="search_field_2">
                   <input type="text" id='date_search_field'><span><i id="search_date" class="fas fa-search"></i></span><i id="add_icon" class="fas fa-plus"></i>
                </div>
            <div class="history_result">
            </div>
            </div>
        </div>`

        addElement('.customer_details', html1)
    }

}


function renderHistory(history) {
    var html = `
    <div class="remover_2"></div>
    `
    addElement('.history_result', html)
    var i = 0;
    history.forEach((el) => {
        var html = `
        <div class="history_1">
           <h5 id="${i}" onclick="showHistoryDetails()">${el.date}</h5><i id="${i}" onclick="editHistoryDetails()" class="fas fa-pen"></i>
        </div>`
        addElement('.remover_2', html)
        i++;
    })

}



function renderOrderData(history, id, type) {
   
    if (type === 'paragraph') {
        console.log('aaaaaaaaa')
        console.log(history[id].comp_no)
        $('#comp_no_p').text(`${history[id].comp_no}`)
        $('#date_p').text(`${history[id].date}`)
        $('#name_p').text(`${history[id].name}`)
        $('#mobile_p').text(`${history[id].mobile}`)
        $('#address_p').text(`${history[id].address}`)
        $('#issue_p').text(`${history[id].issue}`)
        $('#maker_p').text(`${history[id].maker}`)
        $('#model_p').text(`${history[id].model}`)
        $('#fee_amount_p').text(`${history[id].fee_amount}`)
        $('#payment_p').text(`${history[id].payment}`)
        $('#part_replaced_p').text(`${history[id].part_replaced}`)
        $('#pending_reason_p').text(`${history[id].pending_reason}`)
        $('#bal_p').text(`${calcBalance(history[id].fee_amount,history[id].payment === ''? 0 : history[id].payment )}`)
       // console.log(calcBalance(history[id].fee_amount,history[id].fee_amount === ''? 0 : history[id].fee_amount ))
        $('#remark_p').text(`${history[id].remark}`)
        
    }else{
        
        $('#comp_no_input').attr('placeholder',`${history[id].comp_no}`)
        $('#date_input').attr('placeholder', `${history[id].date}`)
        $('#name_input').attr('placeholder', `${history[id].name}`)
        $('#mobile_input').val(`${history[id].mobile}`)
        $('#address_input').val(`${history[id].address}`)
        $('#issue_input').val(`${history[id].issue}`)
        $('#maker_input').val(`${history[id].maker}`)
        $('#model_input').val(`${history[id].model}`)
        $('#fee_amount_input').val(`${history[id].fee_amount}`)
        $('#payment_input').val(`${history[id].payment}`)
        $('#part_replaced_input').val(`${history[id].part_replaced}`)
        $('#pending_reason_input').val(`${history[id].pending_reason}`)
        $('#bal_input').val(`${calcBalance(history[id].fee_amount,history[id].payment === ''? 0 : history[id].payment )}`)
        console.log(calcBalance( history[id].fee_amount , history[id].payment))
        $('#remark_input').val(`${history[id].remark}`)
        
    }
}




function renderNewOrderUi(detail, compNo) {
    //remove the read_detail
    removeElement('.read_details')
    removeElement('.update_and_new_details')

    var html1 = ` 
    <div class="update_and_new_details">
        <h5 id='comp_no'>Comp no</h5><input id="comp_no_input" placeholder="${compNo()}"><h5 id="date">Date</h5><input id="date_input" value="${new Date().toDateString()}">
        <h5 id="name">Name</h5><input id="name_input" placeholder="${detail.name}"><h5 id="mobile">Mobile</h5><input id="mobile_input">
        <h5 id="address">Address</h5><textarea id="address_input"></textarea><h5 id="issue">Issue</h5><textarea id="issue_input"></textarea>
        <h5 id="maker">Maker</h5><input id="maker_input"><h5 id="model">model</h5><input id="model_input"><h5 id="fee_amount">Fee_amount</h5><input id="fee_amount_input"><h5 id="payment">Payment</h5><input id="payment_input">
        <h5 id="part_replaced">Part replaced</h5><textarea id="part_replaced_input"></textarea><h5 id="pending_reason">Pending reason</h5><textarea id="pending_reason_input"></textarea><h5 id="bal">Balance</h5><input id="bal_input"><h5 id="remark">Remark</h5><input id="remark_input">
        <div id="search">
           <div class="search_wrapper">
            <div class="desition_btn_2">
               <a id="desition_btn_2_save" onclick="saveNewOrder()">Save</a>
               <a id="desition_btn_2_cancel" onclick="cancel2()">Cancel</a>
            </div>
           </div>
        </div>
    </div>`
    addElement('.customer_details', html1)




}

function renderUpdateOrderUi(history, id) {

    removeElement('.read_details')
    removeElement('.update_and_new_details')

    var html1 = ` 
    <div class="update_and_new_details">
        <h5 id='comp_no'>Comp no</h5><input id="comp_no_input" placeholder=""><h5 id="date">Date</h5><input id="date_input" placeholder="">
        <h5 id="name">Name</h5><input id="name_input" placeholder=""><h5 id="mobile">Mobile</h5><input id="mobile_input">
        <h5 id="address">Address</h5><textarea id="address_input"></textarea><h5 id="issue">Issue</h5><textarea id="issue_input"></textarea>
        <h5 id="maker">Maker</h5><input id="maker_input"><h5 id="model">model</h5><input id="model_input"><h5 id="fee_amount">Fee_amount</h5><input id="fee_amount_input"><h5 id="payment">Payment</h5><input id="payment_input">
        <h5 id="part_replaced">Part replaced</h5><textarea id="part_replaced_input"></textarea><h5 id="pending_reason">Pending reason</h5><textarea id="pending_reason_input"></textarea><h5 id="bal">Balance</h5><input id="bal_input"><h5 id="remark">Remark</h5><input id="remark_input">
        <div id="search">
           <div class="search_wrapper">
            <div class="desition_btn_2">
               <a id="desition_btn_2_save" onclick="updateTheOrder()">Save</a>
               <a id="desition_btn_2_cancel" onclick="cancel2()">Cancel</a>
            </div>
           </div>
        </div>
    </div>`
    addElement('.customer_details', html1)


}

function updateOrder(info, id){
    db.customer_order.update({_id : id}, info, function(err, n){
        console.log(n)
    })
}

function addOrder(info) {
    db.customer_order.insert(info, function (err, docs) {
        // console.log(err)
        console.log(docs)
    })

}




module.exports = {
    searchClient,
    renderListResult,
    searchCLientHistory,
    renderCustomerDetails,
    renderOrderData,
    renderUpdateOrderUi,
    renderHistory,
    renderNewOrderUi,
    updateOrder,
    addOrder,
    showHistoryDetails
}