
const paymentOptions = [
    {
        text: 'Any',
        value: 'Any'
    },
    {
        text: 'In Cash',
        value: 'In Cash'
    },
    {
        text: 'Bank Transfer',
        value: 'Bank Transfer'
    }
];

const depositOptions = [
    {
        text: 'Any',
        value: 'Any'
    },
    {
        text: 'Yes',
        value: true
    },
    {
        text: 'No',
        value: false
    }
]

class FilterCache {
    constructor() {
        this.filterParameters = {
            startDate: null,
            endDate: null,
            dateAddedFrom: null,
            dateAddedTo: null,
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            income: '',
            deposit: depositOptions[0].value,
            paymentType: paymentOptions[0].value
        }

        this.filteredEntries = [];
        this.currentPage = 1;
        this.totalPages = 1;
    }

    getFilteredEntries() {
        return this.filteredEntries;
    }

    setFilteredEntries(data) {
        if (data === null)
            return;

        this.filteredEntries = data;
    }

    getFilterParameters() {
        return this.filterParameters;
    }

    setFilterParameters(data) {
        if (data === null)
            return;

        this.filterParameters = data;
    }

    setFilterOptions(currentPage, totalPages) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }

    getFilterOptions() {
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages
        }
    }
}

let filterCache = new FilterCache();
export { filterCache, paymentOptions, depositOptions };