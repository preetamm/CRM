const $ = require('jquery');
const { db } = require('./db');
const path = require('path')
const app = require('electron').remote.app
const { searchClient, renderListResult, searchCLientHistory, renderCustomerDetails, renderOrderData, renderNewOrderUi, renderUpdateOrderUi, addOrder, updateOrder } = require('./controllers/home')
const { removeElement, addElement, sortHistory, sortOrder } = require('./helper')
const { createCustomer, compNo } = require('./controllers/add')
const { showRemarkList, showMonthList, searchWithRemark, renderOrderResult, findWithData } = require('./controllers/history')
var state = {}
var data = []
customerHistory = []
const navClick = {
    history: $('#history'),
    home: $('#home'),
    add: $('#add'),
    customerSearchIcon: $('#customer_search_icon'),
    input: $('#search_customer')
}





//////////////      homepage control      ////////////////////



sortHistory()


const addHomePage = () => {
    //remover the element already present in the bash board
    removeElement('.remover')
    //add the homepage ui 

    var html = `
    <div class="remover">
        <div class="home_page">
            <div class="customer_details">

            </div>
            <div class="customer_list">

            </div>
        </div>
    </div>`

    addElement('.dash', html)



}


navClick.customerSearchIcon.click(searchCustomer)

async function searchCustomer() {
    //get the query from the ui

    try {
        const query = `${navClick.input.val()}`
        var q = ''
        if (query === '') {
            console.log('query cant be empty')
        } else {
            q = new RegExp(query)
            data = await searchClient(q)
            console.log(data)
            if (data.length != 0) {

                renderListResult(data)


            } else {
                console.log('not found')
            }
        }

    } catch (error) {
        console.log(error)
    }
    //if 0 result say customer not found

    //if not display the result on it
}



//get the id of the clicked element and get the data from the array




async function showDetails(Uid) {

    //get the id of the clicked element and get the data from the array
    console.log(Uid)
    if (Uid === undefined) {
        console.log(Uid === null)
        var id = event.target.id
        customerDetails = data[id]
        console.log(customerDetails.order_id)
        var unSortedHistory = await searchCLientHistory(customerDetails.order_id)
        //console.log(unSortedHistory)
        customerHistory = sortOrder(unSortedHistory)
        console.log(unSortedHistory)
        //console.log(customerHistory)
        //updatethestate 
        state.currentCustomerId = id;
        console.log(state)
        console.log(customerHistory)
        //render details to ui 
        renderCustomerDetails(customerHistory)
        $('#add_icon').click(addNewOrder)
    } else {
        id = Uid
        customerDetails = data[id]
        //get the details of the perticular order
        console.log(customerDetails.order_id)
        //get the history
        var unSortedHistory = await searchCLientHistory(customerDetails.order_id)
        console.log(unSortedHistory)
        customerHistory = sortOrder(unSortedHistory)

        console.log(customerHistory)
        //updatethestate 
        state.currentCustomerId = id;
        console.log(state)
        console.log(customerHistory)
        //render details to ui 
        renderCustomerDetails(customerHistory)
        $('#add_icon').click(addNewOrder)
    }
}



function showHistoryDetails() {
    var id = event.target.id
    renderOrderData(customerHistory, id, 'paragraph')
}

function editHistoryDetails() {
    var id = event.target.id
    //redner the update ui 
    state.customerHistoryDbId = customerHistory[id]._id
    state.customerHistoryArrayId = event.target.id

    renderUpdateOrderUi(customerHistory, id)
    renderOrderData(customerHistory, id, 'input')
    //save the data or cancel the process
}

function dateSearch(){
    //get the keyword and search 
}

function addNewOrder() {
    var id = customerDetails.order_id;
    //set the ui to add new order
    renderNewOrderUi(customerDetails, compNo)
    //add the desition buttons
    //add funtion to that buttons
}



function saveNewOrder() {
    //get the data from the ui
    var orderInfo = {
        comp_no: $('#comp_no_input').attr('placeholder'),
        order_id: customerDetails.order_id,
        date: new Date(`${$('#date_input').val()}`).toDateString(),
        name: $('#name_input').attr('placeholder'),
        mobile: $('#mobile_input').val(),
        address: $('#address_input').val(),
        issue: $('#issue_input').val(),
        maker: $('#maker_input').val(),
        model: $('#model_input').val(),
        payment: $('#payment_input').val(),
        fee_amount: $('#fee_amount_input').val(),
        part_replaced: $('#part_replaced_input').val(),
        pending_reason: $('#pending_reason_input').val(),
        remark: $('#remark_input').val()
    }
    console.log(orderInfo)
    //add it to the database
    addOrder(orderInfo)
    showDetails(state.currentCustomerId)
}


function updateTheOrder() {
    var arrId = state.customerHistoryArrayId
    var orderInfo = {
        comp_no: $('#comp_no_input').attr('placeholder'),
        order_id: customerDetails.order_id,
        date: $('#date_input').attr('placeholder'),
        name: $('#name_input').attr('placeholder'),
        mobile: $('#mobile_input').val(),
        address: $('#address_input').val(),
        issue: $('#issue_input').val(),
        maker: $('#maker_input').val(),
        model: $('#model_input').val(),
        payment: $('#payment_input').val(),
        fee_amount: $('#fee_amount_input').val(),
        part_replaced: $('#part_replaced_input').val(),
        pending_reason: $('#pending_reason_input').val(),
        remark: $('#remark_input').val()
    }
    console.log(orderInfo)

    updateOrder(orderInfo, state.customerHistoryDbId)
    showDetails(state.currentCustomerId)
    console.log('done')
    setTimeout(() => {
        renderOrderData(customerHistory, arrId, 'paragraph')
    }, 1500)


}

function cancel2() {
    showDetails(state.currentCustomerId)
}


//////////////      historypage control      ////////////////////





const addHistoryPage = () => {
    removeElement('.remover')
    var html = `
    <div class="remover">
        <div class="search_field_1">
            <input type="text" id="remark_reason"><span><i id="customer_search_icon" class="fas fa-search" onclick="getSearchResult()"></i></span>
        </div>
       <div class="filter">
           <h5>Remark :</h5>
           <input type="text" id="remark_value"><Span><i id="drop_down_1" class="fas fa-caret-down"></i></Span>
           <div class="remark_list">
              <h5 onclick="getRemarkValue()">SCB</h5>
              <h5 onclick="getRemarkValue()">HL</h5>
              <h5 onclick="getRemarkValue()">PP</h5>
              <h5 onclick="getRemarkValue()">CCB</h5>
              <h5 onclick="getRemarkValue()">DDD</h5>
        </div>
       </div>
       <div class="recent">
           <div class="tab">
               <h5>Recent</h5>
               <div class="date_picker">
                  <i class="far fa-calendar" onclick="searchWithDate()"></i>
                  <div class="month_input_field">
                      <input id="month_picker" placeholder="Month">
                      <i id="drop_down_2" class="fas fa-caret-down"></i>
                  </div>
                  <input id="year_picker" placeholder="Year">                
               </div>
               <div class="month_list">
                  <h5 onclick="getMonthValue()">Jan</h5>
                  <h5 onclick="getMonthValue()">Feb</h5>
                  <h5 onclick="getMonthValue()">Apr</h5>
                  <h5 onclick="getMonthValue()">Mar</h5>
                  <h5 onclick="getMonthValue()">May</h5>
                  <h5 onclick="getMonthValue()">Jun</h5>
                  <h5 onclick="getMonthValue()">Jul</h5>
                  <h5 onclick="getMonthValue()">Aug</h5>
                  <h5 onclick="getMonthValue()">Sep</h5>
                  <h5 onclick="getMonthValue()">Oct</h5>
                  <h5 onclick="getMonthValue()">Nov</h5>
                  <h5 onclick="getMonthValue()">Dec</h5>
             </div>
           </div>
           <div class="customer_list_1">
                <div class="customer_data_schema">
                    <h5 align="center">COMP NO</h5>
                    <h5 align="center">DATE</h5>
                    <h5>NAME</h5>
                    <h5>MOBILE</h5>
                    <h5>ADDRESS</h5>
                    <h5>ISSUE</h5>
                    <h5>MAKER</h5>
                    <h5>MODEL</h5>
                    <h5 align="center">FEE AMOUNT</h5>
                    <h5>PAYMENT</h5>
                    <h5 align="center">PART REPLACED</h5>
                    <h5 align="center">PENDING REASON</h5>
                    <h5>BALANCE</h5>
                    <h5>REMARK</h5>
                </div>
                <div class="client_order_list">
                 
                </div>
            </div>
       </div>
    </div>`

    addElement('.dash', html)
    $('#drop_down_1').click(showRemarkList)
    $('#drop_down_2').click(showMonthList)
}


function getRemarkValue(params) {
    var value = event.target.innerText
    $("#remark_value").val(`${value}`)
    $(".remark_list").css('display', 'none')
}


function getMonthValue() {
    var value = event.target.innerText
    $("#month_picker").val(`${value}`)
    $(".month_list").css('display', 'none')
}


async function searchWithDate() {
    //get tha data and make the query
    var month = $('#month_picker').val()
    var year = $('#year_picker').val()
    //get the data
    var data = await findWithData(month, year)
    if (data.length != 0) {
        //  console.log(data)
        var newData = sortOrder(data)
        //  console.log(newData)
        renderOrderResult(data)
    } else {
        var html = `
        <div class="no_order_found">
           <h5> No order Found </h5>
        </div>
        `
        //get the data
        var el = ' <div class="client_order_list"></div>'
        removeElement('.client_order_list')
        $('.customer_list_1').append(el)
        addElement('.client_order_list', html)
        console.log('no order found with the given date')
    }
}



async function getSearchResult() {
    //get the result
    var result = await searchWithRemark()
    console.log(result)
    var newData = sortOrder(result)
    //display it on the Ui
    if (newData.length != 0) {
        renderOrderResult(newData)
    } else {
        var html = `
        <div class="no_order_found">
           <h5> No order Found </h5>
        </div>
        `
        //get the data
        var el = ' <div class="client_order_list"></div>'
        removeElement('.client_order_list')
        $('.customer_list_1').append(el)
        addElement('.client_order_list', html)
    }



}






// 60px auto 90px 90px 110px 110px 80px 90px 60px auto auto auto 70px 60px;







/////////////////   addpage control     /////////////



const addAddPage = () => {
    removeElement('.remover')

    var html = `
    <div class="remover">
        <div class="form_card">
           <div class="right">

           </div>
           <div class="left">
              <div class="form">
                 <h5>Name</h5><input type="text" id='add_name'>
                 <h5>Mobile</h5><input type="text" id='add_mobile'>
                 <h5>Address</h5><textarea name="" id="add_address" ></textarea>
                 <h5>Nature of complain</h5><textarea name="" id="add_issue"></textarea>
                 <h5>Make</h5><input type="text" id='add_maker'>
                 <h5>Model</h5><input type="text" id='add_model'>
                 <h5>Date</h5><input type="text" id='add_date'>
              </div>
            
              <div class="desition_btn_1">
                 <a id="desition_btn_1_save">Save</a>
                 <a id="desition_btn_1_cancel">Cancel</a>
              </div>
           </div>
        </div>
   </div>
    `
    addElement('.dash', html)
    $('#desition_btn_1_save').click(addCustomer)
    $('#desition_btn_1_cancel').click(addHomePage)

}



function addCustomer() {
    //get data from ui
    var info = {
        name: $('#add_name').val(),
        Mobile: $('#add_mobile').val(),
        address: $('#add_address').val(),
        issue: $('#add_issue').val(),
        maker: $('#add_maker').val(),
        model: $('#add_model').val(),
        date: $('#add_date').val() === '' ? '' : new Date(`${$('#add_date').val()}`).toDateString()
    }

    console.log(info)

    //add it to database//
    customer = createCustomer(info.name)
    customer.save(info.Mobile, info.address, info.issue, info.maker, info.model, info.date)

}



navClick.home.click(addHomePage)
navClick.history.click(addHistoryPage)
navClick.add.click(addAddPage)





