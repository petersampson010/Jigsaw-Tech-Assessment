const fetch = require('node-fetch');

const formatDate = string => {
    return string.length<2 ? `0${string}` : string
}

const fetchTransactions = () => {
    return fetch('http://54.154.227.172:3000/transactions')
    .then(res=>res.json())
}

const sortByCategory = (allTrans) => {
    let categoryObj = {};
    for (const i of allTrans) {
        let { category, amount } = i
        categoryObj[category] = {
            totalNumber: categoryObj[category] ? categoryObj[category].totalNumber+1 : 1,
            totalValue: categoryObj[category] ? categoryObj[category].totalValue+amount : amount,
            averageValue: categoryObj[category] ? categoryObj[category].totalValue/categoryObj[category].totalNumber : amount
        }
    }
    return categoryObj;
}

const getValidEntries = (allTrans, reqMonth) => {
    let validEntries = {};
    formattedReqMonth = formatDate(reqMonth);
    for (const entry of allTrans) {
        let { paymentDate, amount } = entry
        let date = paymentDate.split('T')[0].split("-");
        let month = date[1];
        if (month===formattedReqMonth){
            let day = date[2];
            let year = date[0];
            date = `${day}/${month}/${year}`;
            validEntries[day] = {
                totalNumber: validEntries[day] ? validEntries[day].totalNumber+1 : 1,
                totalValue: validEntries[day] ? validEntries[day].totalValue+amount : amount,
                averageValue: validEntries[day] ? validEntries[day].totalValue/validEntries[day].totalNumber : amount
            }
        }
    }
    return validEntries;
}

const sortAndAddNull = (validEntries, reqMonth) => {
    let cashflowObj = {};
    let daysInMonth = new Date(2020, parseInt(reqMonth), 0).getDate();
    let formattedReqMonth = formatDate(reqMonth);
    for (let i=1;i<=daysInMonth;i++) {
        let day = formatDate(i.toString());
        if (validEntries[day]!==undefined) {
          cashflowObj[`${day}/${formattedReqMonth}/2020`] = validEntries[day]
        } else {
            cashflowObj[`${day}/${formattedReqMonth}/2020`] = {
                "totalNumber": 0,
                "totalValue": 0,
                "averageValue": 0
            }
        }
    }
    return cashflowObj
}

module.exports = {
    fetchTransactions,
    sortByCategory,
    getValidEntries,
    sortAndAddNull
}