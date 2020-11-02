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
        fontFamily: 'Open-Sans-Bold',
        fontSize: 18,
        paddingBottom: 12
    },
    text: {
        fontSize: 11,
        fontFamily: 'Open-Sans'
    },
    bold: {
        fontSize: 11,
        fontFamily: 'Open-Sans-Bold'
    },
    centered: {
        textAlign: 'center'
    },
    header: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 12
    },
    container: {
        flexDirection: 'row',
        marginTop: 24
    },

    bordered: {
        borderTop: 1,
        borderBottom: 1
    }
});

const tableStyle = {
    columnWidths: [130, 40, 40, 80, 80, 70, 45, "auto"]
}

const tableHeaders = [
    "Pavadinimas",
    "Kiekis",
    "Matas",
    "Kaina be PVM",
    "Suma be PVM",
    "PVM suma",
    "PVM %",
    "Iš viso"
]

const tablePlaceholders = [
    "Mikroautobuso nuoma",
    "1",
    "vnt",
    "0 €",
    "0 €",
    "0 €",
    "0 €",
    "0 €"
]

Font.register({ family: 'Open-Sans', src: '//fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-U1Ug.ttf' });
Font.register({ family: 'Open-Sans-Bold', src: '//fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rg-VQ.ttf' });

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
                            PVM SĄSKAITA FAKTŪRA
                        </Text>
                        <Text style={[styles.text, styles.centered]}> Serija ir nr. RA-001 </Text>
                        <Text style={[styles.text, styles.centered]}> Sąskaitos data: {Date.now().toString()}</Text>
                        <Text style={[styles.text, styles.centered]}> Apmokėti iki {Date.now().toString()}</Text>

                        <View style={styles.container}>
                            <View>
                                <Text style={styles.header}> Pardavėjas </Text>
                                <Text style={styles.text}> UAB &bdquo;Rajesas" </Text>
                                <Text style={styles.text}> Įm. kodas: 135832118 </Text>
                                <Text style={styles.text}> PVM mokėtojo kodas: LT358321113 </Text>
                                <Text style={styles.text}> Radvilų dvaro g. 6, Kaunas, LT48322, Lietuva </Text>
                                <Text style={{ fontSize: 9 }}> &nbsp; </Text>
                                <Text style={styles.text}> Bankas: Citadele </Text>
                                <Text style={styles.text}> Banko kodas: 72900 </Text>
                                <Text style={styles.text}> SWIFT kodas: INDULT2X </Text>
                                <Text style={styles.text}> LT987290000016467889 </Text>
                            </View>

                            <View style={{ paddingLeft: 40 }}>
                                <Text style={styles.text}> &nbsp; </Text>
                                <Text style={styles.header}> Pirkėjas </Text>
                                <Text style={styles.text}> [Pilnas vardas / Pavadinimas] </Text>
                                <Text style={styles.text}> [Įm. kodas 1212121212 ] </Text>
                                <Text style={styles.text}> [PVM mokėtojo kodas: 1212121212112 ] </Text>
                                <Text style={styles.text}> [Adresas] </Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            {tableHeaders.map((header, index) =>
                                <View style={{ width: tableStyle.columnWidths[index] }} key={index}>
                                    <Text style={[styles.bold, { marginBottom: 4 }]}> {header} </Text>
                                </View>
                            )}
                        </View>

                        <View style={[{ flexDirection: "row" }, styles.bordered]}>
                            {tableStyle.columnWidths.map((colWidth, index) =>
                                <View style={{ width: colWidth }}>
                                    <Text style={[styles.text, { marginTop: 4, marginBottom: 4 }]}>
                                        {tablePlaceholders[index]}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={{ flexDirection: "row", textAlign: "right"  }}>
                            <Text style={[styles.text, styles.bold]}> Suma be PVM (21%) </Text>
                            <Text style={styles.text}> 0 &euro; </Text>                            
                        </View>

                        <View style={{ flexDirection: "row", textAlign: "right"  }}>
                            <Text style={[styles.text, styles.bold]}> PVM (21%) </Text>
                            <Text style={styles.text}> 0 &euro; </Text>                            
                        </View>

                        <View style={{ flexDirection: "row", textAlign: "right" }}>
                            <Text style={[styles.text, styles.bold]}> Bendra suma </Text>
                            <Text style={styles.text}> 00000000 &euro; </Text>                            
                        </View>

                    </View>
                </Page>
            </Document>
        );
    }
}

export default Invoice;