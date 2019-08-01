const { db } = require('../db')
const { addElement, removeElement, calcBalance } = require('../helper')

function showRemarkList() {


    if ($('.remark_list').css("display") === "block") {
        //console.log($('.remark_list'))
        // console.log('working')
        $('.remark_list').css("display", "none");
    } else {
        $('.remark_list').css("display", "block")
    }
}




function showMonthList() {
    if ($('.month_list').css("display") === "block") {
        //console.log($('.remark_list'))
        //console.log('working')
        $('.month_list').css("display", "none");
    } else {
        $('.month_list').css("display", "block")
    }
}

function searchWithRemark() {
    //get the result from the ui 
    var reason = $('#remark_reason').val()
    var remark = $('#remark_value').val()
    //if the searcn is empty search with the reamrk value
    if (reason === '') {
        if (remark != '') {
            //search db for the remark value
            return new Promise((resolve, reject) => {
                db.customer_order.find({ remark: remark }, function (err, docs) {
                    if (err) {
                        reject()
                    } else {
                        resolve(docs)
                    }
                })

            })
        } else {
            console.log('remark should not be empty')
        }
    }else{
        return new Promise((resolve, reject) => {
            var r = new RegExp(reason)
            db.customer_order.find({ pending_reason: r }, function (err, docs) {
                if (err) {
                    reject()
                } else {
                    resolve(docs)
                }
            })

        })
    }
    //else if take thr reason 
}


function renderOrderResult(data) {
    //get the data
    var el = ' <div class="client_order_list"></div>'
    removeElement('.client_order_list')
    $('.customer_list_1').append(el)
    console.log(data)
    data.forEach(el => {
        var html = `
        <div class="order_detail_2">
           <h5 align="center">${el.comp_no}</h5>
           <h5 align="center">${el.date}</h5>           
           <h5 align="center">${el.name}</h5>
           <h5>${el.mobile}</h5>
           <h5>${el.address}</h5>
           <h5>${el.issue}</h5>
           <h5>${el.maker}</h5>
           <h5>${el.model}</h5>
           <h5>${el.fee_amount}</h5>
           <h5>${el.payment}</h5>
           <h5>${el.part_replaced}</h5>
           <h5>${el.pending_reason}</h5>
           <h5>${calcBalance(el.fee_amount, el.payment ===''? 0: el.payment)}</h5>
           <h5>${el.remark}</h5>
        </div>
        `
        addElement('.client_order_list', html)
        console.log('done')
    });
}

function findWithData(month, year) {
    console.log('runned')
    console.log(month == '')
    console.log(year)
    if (month === '' && year === '') {
        console.log('both fields cant ne empty')
        return []
    } else {
        if (month === '' && year != '') {
            //search with year
            var y = new RegExp(year)
            console.log('search withh year working...')
            return new Promise((resolve, reject) => {
                db.customer_order.find({ date: y }, function (err, docs) {
                  
                    if (err) {
                        reject()
                    } else {
                        resolve(docs)
                    }
                })
            })

        } else if (year === '' && month != '') {
            //search with month
            var m = new RegExp(month)
            console.log('search withh month working...')
            return new Promise((resolve, reject) => {
                db.customer_order.find({ date: m }, function (err, docs) {
                    console.log(docs)
                    if (err) {
                        reject()
                    } else {
                        resolve(docs)
                    }
                })
            })

        } else if (year != '' && month != '') {
            //search with year first and sort them according to month
            return new Promise((resolve, reject) => {

                var y = new RegExp(year)
                var AllData = new Promise((resolve, reject) => {
                    db.customer_order.find({ date: y }, function (err, docs) {
                        console.log(docs)
                        if (err) {
                            reject()
                        } else {
                            resolve(docs)
                        }
                    })
                })
                var filteredData = AllData.then((d) => {
                    var m = new RegExp(month)
                  
                    var data = []
                    for (var i = 0; i <= d.length - 1; i++) {

                        if (d[i].date.search(m) != -1) {
                            data.push(d[i])
                        }
                    }
                    return data
                })

                console.log('hogya')
                resolve(filteredData)


            })

        }
    }
}


module.exports = {
    showRemarkList,
    showMonthList,
    searchWithRemark,
    renderOrderResult,
    findWithData

}