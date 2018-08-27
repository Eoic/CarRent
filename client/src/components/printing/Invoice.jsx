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
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Open-Sans',
        fontSize: 12,
        paddingTop: 8
    },
    text: {
        fontSize: 9,
        fontFamily: 'Open-Sans'
    },
    bold: {
        fontFamily: 'Open-Sans-Bold'
    },
    header: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 12
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
                        <Text style={styles.title}>  
                            PVM SĄSKAITA FAKTŪRA Nr. RAJ18 0000000
                        </Text>

                        <View style={{ flexDirection: 'row'}}>
                            <View>
                                <Text style={[styles.text, styles.bold]}> { this.state.timestamp} </Text>
                                <Text style={styles.header}> Pardavėjas </Text>
                                <Text style={styles.header}> UAB Rajesas </Text>
                                <Text style={styles.text}> Įm. k.: 135832118 www.rajesas.lt; info@rajesas.lt </Text>
                                <Text style={styles.text}> PVM k.: LT358321113 </Text>
                                <Text style={styles.text}> Kaunas, Radvilų dvaro g. 6 </Text>
                                <Text style={styles.text}> Tel.: 837 362665, Faks.: 837362665 </Text>
                                <Text style={styles.text}> Registro tvarkytojas </Text>
                                <Text style={styles.text}> AB Swedbank bankas, A.s. LT507300010039753927LTL </Text>
                                <Text style={styles.text}> AB Swedbank bankas, A.s. LT287300010096942807LTL </Text>
                                <Text style={styles.text}> AB SEB bankas, A.s. LT737044060005881155LTL </Text>
                            </View>

                            <View style={{ paddingLeft: 40}}>
                                <Text style={styles.text}> &nbsp; </Text>
                                <Text style={styles.header}> Pirkėjas </Text>
                                <Text style={styles.text}> Pavadinimas </Text>
                                <Text style={styles.text}> Įm. (asm) k.: 123456789 </Text>
                                <Text style={styles.text}> PVM k.: LT123456789 </Text>
                                <Text style={styles.text}> Adresas </Text>
                            </View>
                        </View>

                        <View style={[{ border: 1 }]}>
                            <Text> Text </Text>
                        </View>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default Invoice;