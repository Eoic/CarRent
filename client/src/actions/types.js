export const CAR_ACTIONS = {

    // ADD
    ADD_CAR:            'carActions.AddCar',
    ADD_COST:           'carActions.AddCost',

    // GET
    GET_CARS:           'carActions.GetCars',
    GET_CAR_BY_ID:      'carActions.GetCarById',
    GET_COSTS:          'carActions.GetCosts',

    // UPDATE
    UPDATE_CAR:         'carActions.UpdateCar',

    // DELETE
    DELETE_CAR:         'carActions.DeleteCar',
    DELETE_COST:        'carActions.DeleteCost',

    // MISC
    GET_RENT_BY_ID:     'carActions.GetRentById',
    CAR_RENT_INCOME:    'carActions.CarRentIncome',
    CASH_TURNOVER:      'carActions.CashTurnover'
};

export const GLOBAL_ACTIONS = {
    REQUEST_FAILED:         'globalActions.RequestFailed',
    CHANGE_LANGUAGE:        'globalActions.ChangeLanguage',
    GET_USER_PROFILE:       'globalActions.GetUserProfile',
    CONFIRM_ACTION:         'globalActions.ConfirmAction'
};

export const RENT_ACTIONS = {
    
    // GET
    GET_ACTIVE_RENTS:       'rentActions.GetActiveRents',
    GET_RESERVED_RENTS:     'rentActions.GetReservedRents',
    GET_ENDED_RENTS:        'rentActions.GetEndedRents',
    GET_CALENDAR_RENTS:     'rentActions.GetCalendarRents',
    GET_RENT_COPY:          'rentActions.GetRentCopy',

    // ADD
    ADD_RENT:               'rentActions.AddRent',
    
    // UPDATE
    UPDATE_ACTIVE_RENT:     'rentActions.UpdateActiveRent',
    UPDATE_RESERVED_RENT:   'rentActions.UpdateReservedRent',
    UPDATE_ENDED_RENT:      'rentActions.UpdateEndedRent',

    // OPEN
    OPEN_INFO_MODAL:        'rentActions.OpenInfoModal',
    CLOSE_INFO_MODAL:       'rentActions.CloseInfoModal',

    // DELETE
    DELETE_ACTIVE_RENT:     'rentActions.DeleteActiveRent',
    DELETE_RESERVED_RENT:   'rentActions.DeleteReservedRent',
    DELETE_ENDED_RENT:      'rentActions.DeleteEndedRent',

    // END
    END_RENT_ACTIVE:        'rentActions.EndRentActive',

    // PRINT
    PRINT_INVOICE:          'rentActions.PrintInvoice',
    PRINT_CONTRACT:         'rentActions.PrintContract',

    // FILTER
    FILTER_RECORDS:         'rentActions.FilterRecords'
};

export const USER_ACTIONS = {
    GET_USERS: 'userActions.GetUsers',
    GET_USER_BY_ID: 'userActions.GetUserById',
    SWITCH_USER_VERIFICATION: 'userActions.SwitchUserVerification',
    SWITCH_USER_TYPE: 'userActions.SwitchUserType'
}