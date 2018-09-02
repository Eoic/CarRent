const express = require('express');
const router = express.Router();

const moment = require('moment');

const Rent = require('../../models/Rent');
const Expense = require('../../models/Expense');

router.get('/', (req, res) => {
    Promise.all([
        Expense.aggregate([{
            $group: {
                _id: null,
                total: {
                    $sum: "$value"
                }
            }
        }]),
        Expense.aggregate([{
            $match: {
                "addedAt": {
                    "$gte": new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    "$lte": new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
                }
            },
        }, {
            $group: {
                _id: null,
                total: {
                    $sum: "$value"
                }
            }
        }]),
        Rent.aggregate([{
            $group: {
                _id: null,
                total: {
                    $sum: "$value"
                }
            }
        }]),
        Rent.aggregate([{
                $match: {
                    "endDate": {
                        "$gte": new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        "$lte": new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
                    }
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$value"
                    }
                }
            }
        ])
    ]).then(([expensesTotal, expensesMonthly, rentsTotal, rentsMonthly], err) => {
        res.json({
            expensesTotal: (expensesTotal.length === 0 || err) ? 0 : expensesTotal[0].total,
            expensesMonthly: (expensesMonthly.length === 0 || err) ? 0 : expensesMonthly[0].total,
            rentsTotal: (rentsTotal.length === 0 || err) ? 0 : rentsTotal[0].total,
            rentsMonthly: (rentsMonthly.length === 0 || err) ? 0 : rentsMonthly[0].total
        });
    });
});

router.get('/months', (req, res) => {

    const currentYear = moment().utc().utcOffset(180).get("Y");

    Promise.all([
        Expense.aggregate([{
            $project: {
                month: {
                    $month: "$addedAt"
                },
                year: {
                    $year: "$addedAt"
                },
                value: 1
            }
        }, {
            $match: {
                year: currentYear
            }
        }, {
            $group: {
                _id: {
                    month: "$month"
                },
                total: {
                    $sum: "$value"
                }
            }
        }]),
        Rent.aggregate([{
                $project: {
                    month: {
                        $month: "$endDate"
                    },
                    year: {
                        $year: "$endDate"
                    },
                    value: 1
                }
            },
            {
                $match: {
                    year: currentYear
                }
            },
            {
                $group: {
                    _id: {
                        month: "$month"
                    },
                    total: {
                        $sum: "$value"
                    }
                }
            }
        ])
    ]).then(([expensesMonthly, incomeMonthly], err) => {
        if (err)
            return res.json(err);

        res.json({
            expensesMonthly,
            incomeMonthly
        });
    });
});

module.exports = router;