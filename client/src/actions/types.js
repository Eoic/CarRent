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
    COLOR_SCHEME_CHANGE:    'globalActions.ColorSchemeChange',
    FONT_SIZE_CHANGE:       'globalActions.FontSizeChange'
};

export const RENT_ACTIONS = {
    
    // GET
    GET_ACTIVE_RENTS:       'rentActions.GetActiveRents',
    GET_RESERVED_RENTS:     'rentActions.GetReservedRents',
    GET_ENDED_RENTS:        'rentActions.GetEndedRents',

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

    // END
    END_RENT_ACTIVE:        'rentActions.EndRentActive'
};