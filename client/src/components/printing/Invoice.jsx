import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/lt';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    section: {
        margin: 10,
        padding: "35px 10px 10px 10px"
    },
    document: {
        width: "100%",
        height: "100%"
    }
});

Font.register('http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-U1Ug.ttf', { family: 'Open-Sans' });
Font.register('http://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rg-VQ.ttf', { family: 'Open-Sans-Bold' });

class Invoice extends Component {

    constructor() {
        super();
        this.state = { timestamp: moment().format('LL').toLocaleString() }
    }

    render() {
        return (
            <Document style={styles.document}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text> Placeholder </Text>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default Invoice;