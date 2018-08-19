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
        padding: 10
    },
    document: {
        width: "100%",
        height: "100%"
    }
});

Font.register(
    'http://fonts.gstatic.com/s/worksans/v3/QGYsz_wNahGAdqQ43RhPew.ttf',
    { family: 'Work-Sans' },
);

class Invoice extends Component {

    constructor() {
        super();
        this.state = {
            timestamp: moment().format('LL').toLocaleString()
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Document style={styles.document}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={{ fontFamily: 'Work-Sans', fontSize: 14 }}> ĄČĘĖĮŠŲŪŽ - ąčęėįšųūž </Text>
                    </View>
                    <View style={styles.section}>
                        <Text> Section #2 </Text>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default Invoice;