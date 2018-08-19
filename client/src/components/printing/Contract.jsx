import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/lt';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

class Contract extends Component {

    constructor() {
        super();
        this.state = {
            timestamp: moment().format('LL').toLocaleString()
        }
    }
    
    render() {
        return (
            <Document style={styles.document}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Section #1</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Section #2</Text>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default Contract;