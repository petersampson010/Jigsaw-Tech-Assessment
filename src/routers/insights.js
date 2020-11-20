const express = require('express');
const router = express.Router();
const { fetchTransactions, sortByCategory, getValidEntries, sortAndAddNull } = require('../functions/reusable');

router.get('/categories', async (req, res, next) => {
  try {
    fetchTransactions()
    .then(allTrans=>{
      let categoryObj = sortByCategory(allTrans);
      res.status(200).json(categoryObj);
    })
  } catch (err) {
    return next(err);
  }
});

router.get('/cashflow/:month', async (req, res, next) => {
  try {
    let reqMonth = req.params.month
    if (reqMonth>0 && reqMonth<13) {
      fetchTransactions()
      .then(allTrans=>{
        let validEntries = getValidEntries(allTrans, reqMonth);
        let cashflowObj = sortAndAddNull(validEntries, reqMonth);
        res.status(200).json(cashflowObj);
      })
    } else {
      res.status(501).json({ message: 'Invalid Params: Please choose a month between 1 and 12' });
    }
  } catch (err) {
    return next(err);
  }
});

router.get('/cashflow', (req, res) => {
  res.status(200).json({ message: "Please add the month you would like to view: e.g. /cashflow/11"})
});

module.exports = router;