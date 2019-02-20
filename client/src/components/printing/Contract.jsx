import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/lt';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import agreements from '../../utils/contractText';
import shortid from 'shortid'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        textAlign: 'justify'
    },
    section: {
        margin: 10,
        padding: "25px 10px 10px 10px"
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
        fontSize: 10,
        fontFamily: 'Open-Sans',
        width: "250px"
    },
    strong: {
        fontSize: 10,
        fontFamily: 'Open-Sans-Bold'
    },
    sectionHeader: {
        fontFamily: 'Open-Sans-Bold',
        fontSize: 11,
        marginLeft: 12,
        marginRight: 12,
        paddingTop: 8,
        paddingBottom: 0,
        width: 700
    },
    sectionItem: {
        fontFamily: 'Open-Sans',
        fontSize: 10,
        marginLeft: 12
    }
});

Font.register('//fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-U1Ug.ttf', { family: 'Open-Sans' });
Font.register('//fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rg-VQ.ttf', { family: 'Open-Sans-Bold' });

class Contract extends Component {

    constructor() {
        super();
        this.state = { timestamp: moment().format('LL').toLocaleString() }
        this.createList = this.createList.bind(this);
        this.getDays = this.getDays.bind(this);
    }

    getDays() {
        const startDate = moment(this.props.rent.startDate);
        const endDate = moment(this.props.rent.endDate);

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

        return (Math.floor(utc_two - utc_one) / 86400000) >>> 0;
    }

    createList(pageData, sectionOffset) {

        let list = [];

        for (let i = 0; i < pageData.outer.length; i++) {
            list.push(<Text key={shortid()} style={styles.sectionHeader}>{`${i + 1 + sectionOffset}. ${pageData.outer[i].content}`}</Text>);

            if (typeof pageData.outer[i].middle !== 'undefined') {
                for (let j = 0; j < pageData.outer[i].middle.length; j++) {
                    list.push(<Text key={shortid()} style={styles.sectionItem}>{`${i + 1 + sectionOffset}.${j + 1}. ${pageData.outer[i].middle[j].content}`}</Text>);

                    if (typeof pageData.outer[i].middle[j].inner !== 'undefined')
                        for (let k = 0; k < pageData.outer[i].middle[j].inner.length; k++)
                            list.push(<Text key={shortid()} style={styles.sectionItem}>{`${i + 1 + sectionOffset}.${j + 1}.${k + 1}. ${pageData.outer[i].middle[j].inner[k]}`}</Text>);
                }
            }
        }
        return list;
    }

    render() {

        const data = this.props.rent;

        return (
            <Document style={styles.document}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={Object.assign({}, styles.text, { textAlign: 'center', width: 515 })}> {`${agreements.pageOne.title}${shortid()}`}</Text>
                        <Text style={styles.title}> {this.state.timestamp} </Text>
                        <Text style={styles.openingText}> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {agreements.pageOne.description} </Text>
                        {this.createList(agreements.pageOne, 0)}
                    </View>
                </Page>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        {agreements.pageOne.leftover.items.map((item, index) =>
                            <Text key={shortid()} style={styles.sectionItem}>{`${agreements.pageOne.leftover.continueFrom}.${index + 7}. ${item.content}`}</Text>
                        )}
                        {this.createList(agreements.pageTwo, 2)}
                    </View>
                </Page>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        {agreements.pageTwo.leftover.inner.map((item, index) =>
                            <Text key={shortid()} style={styles.sectionItem}>{`${6}.${3}.${index + 3}. ${item}`}</Text>
                        )}
                        {agreements.pageTwo.leftover.middle.map((item, index) =>
                            <Text key={shortid()} style={styles.sectionItem}>{`${6}.${index + 4}. ${item}`}</Text>
                        )}
                        {this.createList(agreements.pageThree, 6)}

                        <Text style={styles.sectionHeader}>9. NUOMOJAMAS AUTOMOBILIS </Text>

                        <View style={{ flexDirection: 'row', marginLeft: 12, marginRight: 12 }}>
                            <View style={{ width: 120 }}>
                                <Text style={styles.text}> Odometro parodymai: </Text>
                                <Text style={styles.text}> Nuomos pradžia: </Text>
                                <Text style={styles.text}> Nuomos pabaiga: </Text>
                                <Text style={styles.text}> Viso parų: </Text>
                                <Text style={styles.text}> Užstatas: </Text>
                                <Text style={styles.strong}> Viso suma: </Text>
                            </View>

                            <View style={{ width: 110 }}>
                                <Text style={styles.text}> {data.odometer} </Text>
                                <Text style={styles.text}> {moment(data.startDate).format('YYYY/MM/DD HH:mm')} </Text>
                                <Text style={styles.text}> {moment(data.endDate).format('YYYY/MM/DD HH:mm')} </Text>
                                <Text style={styles.text}> {this.getDays()} </Text>
                                <Text style={styles.text}> {(data.deposit) ? 150 : 0} EUR </Text>
                                <Text style={styles.strong}> {data.value} EUR </Text>
                            </View>

                            <View style={{ width: 150 }}>
                                <Text style={styles.text}> Pagaminimo metai: </Text>
                                <Text style={styles.text}> Kėbulo numeris: </Text>
                                <Text style={styles.text}> Valstybinis numeris: </Text>
                                <Text style={styles.text}> Automobilio vertė: </Text>
                                <Text style={styles.text}> Registracijos liudijimo nr.: </Text>
                            </View>

                            <View>
                                <Text style={styles.text}> - </Text>
                                <Text style={styles.text}> - </Text>
                                <Text style={styles.text}> {data.regNumber} </Text>
                                <Text style={styles.text}> 3000 EUR </Text>
                                <Text style={styles.text}> - </Text>
                            </View>
                        </View>

                        <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: 'Open-Sans-Bold', marginTop: 6 }}>
                            Šalių parašai
                        </Text>
                        <View style={{ flexDirection: 'row', marginLeft: 12, marginRight: 12, marginTop: 6 }}>
                            <View style={{ width: 250 }}>
                                <Text style={[styles.strong, { textAlign: 'center', marginBottom: 6 }]}> NUOMOTOJAS </Text>
                                <Text style={styles.text}> UAB ,,RAJESAS“ </Text>
                                <Text style={styles.text}> 135832118 / LT358321113 </Text>
                                <Text style={[styles.text, { width: 500 }]}> ADRESAS: RADVILŲ DVARO 6, KAUNAS </Text>
                                <Text style={styles.text}> TEL.: +37065505568 </Text>
                            </View>
                            <View style={{ width: 250 }}>
                                <Text style={[styles.strong, { textAlign: 'center', marginBottom: 0 }]}> NUOMININKAS </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 100 }}>
                                        <Text style={styles.text}> Pavadinimas: </Text>
                                        <Text style={styles.text}> Vardas, pavardė: </Text>
                                        <Text style={styles.text}> Įmonės kodas: </Text>
                                        <Text style={styles.text}> PVM kodas: </Text>
                                        <Text style={styles.text}> Adresas: </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.text}> - </Text>
                                        <Text style={styles.text}> {`${data.name} ${data.surname}`}</Text>
                                        <Text style={styles.text}> - </Text>
                                        <Text style={styles.text}> - </Text>
                                        <Text style={styles.text}> {data.address} </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginLeft: 12, paddingTop: 4 }}>
                            <Text style={[styles.text, { width: 700 }]}> KITI ASMENYS, KURIE VAIRUOS TRANSPORTO PRIEMONĘ </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 12, marginRight: 12, marginTop: 6 }}>
                            <View style={{ width: 250 }}>
                                <Text style={styles.text}> Vardas, pavardė: </Text>
                                <Text style={[styles.text, {marginTop: 4 }]}> Adresas: </Text>
                                <Text style={[styles.text, {marginTop: 4}]}> Tel.: </Text>       
                            </View>
                            <View style={{ width: 300 }}>
                                <Text style={styles.text}>_______________________________________________________</Text>
                                <Text style={[styles.text, {marginTop: 4}]}>_______________________________________________________</Text>
                                <Text style={[styles.text, {marginTop: 4}]}>_______________________________________________________</Text>
                            </View>
                        </View>
                        <View style={{ marginLeft: 12, marginRight: 12, marginTop: 20 }}>
                            <Text style={styles.text}> _______________________________________________________ </Text>
                            <Text style={styles.text}> (Nuomotojo parašas grąžinant transporto priemonę) </Text>
                        </View>
                    </View>
                </Page>
            </Document>
        );
    }
}

export default Contract;