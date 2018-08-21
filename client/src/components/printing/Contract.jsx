import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/lt';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import agreements from '../../utils/invoiceText';
import shortid from 'shortid'

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
        fontSize: 11,
        paddingTop: 10
    },
    openingText: {
        marginLeft: 12,
        marginTop: 12,
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Open-Sans',
        textIndent: 50
    },
    text: {
        margin: 12,
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Open-Sans'
    },
    sectionHeader: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 11,
        marginLeft: 12,
        marginRight: 12,
        paddingTop: 15,
        paddingBottom: 5,
        width: 700
    },
    sectionItem: {
        fontFamily: 'Open-Sans',
        fontSize: 10,
        marginLeft: 12
    } 
});

Font.register('http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-U1Ug.ttf', { family: 'Open-Sans' });
Font.register('http://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rg-VQ.ttf', { family: 'Open-Sans-Bold' });

class Contract extends Component {

    constructor() {
        super();
        this.state = { timestamp: moment().format('LL').toLocaleString() }
        this.createList = this.createList.bind(this);
    }

    createList(pageData) {

        let list = [];

        for (let i = 0; i < pageData.outer.length; i++) {
            list.push(<Text key={shortid()} style={styles.sectionHeader}>{`${i + 1}. ${pageData.outer[i].content}`}</Text>);

            if (typeof pageData.outer[i].middle !== 'undefined') {
                for (let j = 0; j < pageData.outer[i].middle.length; j++) {
                    list.push(<Text key={shortid()} style={styles.sectionItem}>{`${i + 1}.${j + 1}. ${pageData.outer[i].middle[j].content}`}</Text>);

                    if (typeof pageData.outer[i].middle[j].inner !== 'undefined')
                        for (let k = 0; k < pageData.outer[i].middle[j].inner.length; k++)
                            list.push(<Text key={shortid()} style={styles.sectionItem}>{`${i + 1}.${j + 1}.${k + 1}. ${pageData.outer[i].middle[j].inner[k]}`}</Text>);
                }
            }
        }

        return list;
    }

    render() {
        return (
            <Document style={styles.document}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}> Transporto priemonės nuomos sutartis Nr.:  </Text>
                        <Text style={styles.title}> {this.state.timestamp} </Text>
                        <Text style={styles.openingText}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Pagal šią sutartį Nuomotojas nuomoja automobilį Nuomininkui. Nuomininkas sutinka laikytis automobilio naudojimosi taisyklių, išdėstytų šioje sutartyje patvirtindamas tai savo parašu. </Text>
                        {this.createList(agreements.pageOne)}
                    </View>
                </Page>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        {agreements.pageOne.leftover.items.map((item, index) => 
                            <Text key={shortid()} style={styles.sectionItem}>{`${agreements.pageOne.leftover.continueFrom}.${index + 7}. ${item.content}`}</Text>
                        )}
                        {this.createList(agreements.pageTwo)}
                    </View>
                </Page>
            </Document>
        );
    }
}

export default Contract;