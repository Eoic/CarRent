class QueryBuilder {
    constructor(data) {
        this.data = data;
        this.query = {};
    }

    like(queryField, dataField) {
        if (dataField == null)
            dataField = queryField;
        
        if (this.data[dataField] === null)
            return;

        if (this.data[dataField].trim() === '')
            return;

        this.query[queryField] = { "$regex": this.data[dataField].trim(), "$options": "i" };
    }

    lessThan(queryField, dataField, inclusive = false) {
        if (this.data[dataField] === null)
            return;
        
        let queryValue = {};
        queryValue[inclusive ? "$lte" : "$lt"] = this.data[dataField];
        this.query[queryField] = queryValue;
    }

    greaterThan(queryField, dataField, inclusive = false) {
        if (this.data[dataField] === null)
            return;

        let queryValue = {};
        queryValue[inclusive ? "$gte" : "$gt"] = this.data[dataField];
        this.query[queryField] = queryValue;
    }

    matchWithException(forbiddenValue, queryField, dataField) {
        if (dataField == null)
            dataField = queryField;

        if (this.data[dataField] === null)
            return;

        if (this.data[dataField] === '' || this.data[dataField] === forbiddenValue)
            return;

        this.query[queryField] = this.data[dataField];
    }

    range(startInclusive, endInclusive, queryField, dataFieldStart, dataFieldEnd) {
        if (queryField == null)
            return;

        if (this.data[dataFieldStart] === null && this.data[dataFieldEnd] === null)
            return;

        let queryValue = {};

        if (this.data[dataFieldStart] !== null)
            queryValue[startInclusive ? "$gte" : "$gt"] = this.data[dataFieldStart];

        if (this.data[dataFieldEnd] !== null)
            queryValue[endInclusive ? "$lte" : "$lt"] = this.data[dataFieldEnd];

        this.query[queryField] = queryValue;
    }

    getQueryObject() {
        return this.query;
    }
}

module.exports = QueryBuilder;