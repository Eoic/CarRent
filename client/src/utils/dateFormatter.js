const dateFormatter = {
    getLongDurationString (duration) {
        return `${Math.floor((duration / 60) / 24)} days ${Math.floor((duration / 60) % 24)} h. ${duration % 60} min.`
    },

    getDuration (startDate, endDate) {
        const utc_one = Date.UTC(startDate.get('y'),
            startDate.get('month'),
            startDate.get('D'),
            startDate.get('hour'),
            startDate.get('minute'));

        const utc_two = Date.UTC(endDate.get('y'),
            endDate.get('month'),
            endDate.get('D'),
            endDate.get('hour'),
            endDate.get('minute'));

        return Math.floor((utc_two - utc_one) / 60000);
    }
}

export { dateFormatter };