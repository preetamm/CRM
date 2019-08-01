const $ = require('jquery');

const removeElement = (el) => {
    $(el).remove()
}

const addElement = (el1, el2) => {
    $(el1).prepend(el2)
}


const notFound = () => {

}

function sortHistory() {
    arr = ['Sat Jun 29 2019', 'Tue Jul 02 2019']
    console.log(arr)
    res = arr.sort(function (a, b) {
        var date1 = new Date(a);
        var date2 = new Date(b);
        console.log(date1)
        console.log(date2)
        console.log(+date1 > +date2)
        if (+date1 < +date2) {
            console.log(date1 > date2)
            return 1
        } else if (+date1 === +date2) {
            console.log('blaa')
            return 0
        }
    })
    setTimeout(() => {
        console.log(res)
    }, 1500)
}


function sortOrder(data) {
    data.map((d) => {
        // console.log(d.date)
        d.date =  new Date(d.date).valueOf()
       
        //  console.log(d.date)
        // console.log(d)
    })

    newData = data
    //console.log(newData)
    newData.sort((a, b) => {
        console.log(`${a.date} - ${b.date} = ${b.date - a.date}`)
        return b.date - a.date; //you may have to switch the order
    });

    //console.log(newData)
    newData.map((d)=> {
        d.date  = new Date(d.date).toDateString()
    })

    newData.reverse()
    console.log(newData)
    
    return newData
}

function calcBalance(a, b){
    return a - b 
}

module.exports = {
    removeElement,
    addElement,
    sortHistory,
    sortOrder,
    calcBalance,
}