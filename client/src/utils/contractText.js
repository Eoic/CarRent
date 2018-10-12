const agreements = {
    pageOne: {
        title: "Transporto priemonės nuomos sutarties nr.: ",
        description: 'Pagal šią sutartį Nuomotojas nuomoja automobilį Nuomininkui. Nuomininkas sutinka laikytis automobilio naudojimosi taisyklių, išdėstytų šioje sutartyje patvirtindamas tai savo parašu.',
        outer: [{
                content: "AUTOMOBILIO PRIĖMIMAS IR GRĄŽINIMAS",
                middle: [{
                        content: "Nuomininkas pasirašydamas sutartį patvirtina, kad gavo automobilį tvarkingą ir geros techninės būklės su visais papildomais priedais, įskaitant ir automobilio dokumentus."
                    },
                    {
                        content: "Nuomininkas, automobilį privalo grąžinti tokios techninės būklės ir komplektacijos, kokios buvo išnuomotas. Automobilis paimamas ir grąžinamas sutartu laiku pagal sutartį."
                    },
                    {
                        content: "Darbo valandomis nuomojamas automobilis turi būti paimtas ir pristatytas į sutartą vietą. Po darbo valandų ir savaitgaliais pagal išankstinę sutartį ir apmokėjimą."
                    },
                    {
                        content: "Automobilis išnuomojamas su pilnu kuro baku. Nuomininkas grąžina automobilį taip pat su pilnu kuro baku arba pagal susitarimą. Priešingu atveju nuomininkas turi sumokėti po 1.5 EUR už kuro litrą."
                    },
                    {
                        content: "Automobilis išnuomojamas švarus, tvarkingas ir grąžinamas nuplautas ir švariu salonu bei krovinių skyriumi. Jei automobilis grąžinamas nenuplautas ir/ar netvarkingas Nuomininkas Nuomotojui sumoka 20 EUR. ",
                    },
                    {
                        content: "Nuomotojas rezervuotą automobilį gali laikyti tik 3 valandas po sutarto laiko.",
                        inner: [
                            "Jei nuomininkas nevykdo sutartyje nurodytų nuomos sąlygų arba kai numatoma, kad nuomininkas negalės įvykdyti savo pareigų, nuomotojas turi teisę atsiimti automobilį anksčiau sutarto laiko arba kreiptis į policiją ir paskelbti automobilio paiešką. "
                        ]
                    },
                    {
                        content: "Dėl nuomos pratęsimo reikia tartis su nuomotoju ir gauto jo raštišką patvirtinimą."
                    },
                    {
                        content: "Jei nuomininkas negrąžina automobilio 24 valandų laikotarpyje nuo sutartyje nurodyto termino pabaigos, o taip pat raštiškai apie tai neinformuoja Nuomotojo, nuomotojas kreipiasi į policiją dėl automobilio vagystės."
                    }
                ]
            },
            {
                content: "AUTOMOBILIO NAUDOJIMAS",
                middle: [{
                        content: "Nuomininkas privalo pateikti: galiojantį asmens tapatybę patvirtinantį dokumentą, galiojantį vairuotojo pažymėjimą."
                    },
                    {
                        content: "Automobilį gali vairuoti tik sutartyje minimi asmenys, o jei nuomoja įmonė - pastarosios darbuotojas turintis teisę vairuoti įmonės automobilius ir įgaliojimą vairuoti transporto priemonę. Už galimą vairuotojo kaltę , jei yra, atsako nuomininkas / įmonė."
                    },
                    {
                        content: "Jei nuomoja fizinis asmuo, automobilį turi teisę vairuoti nuomos sutartį pasirašęs asmuo ir vienas papildomai nurodytas asmuo."
                    },
                    {
                        content: "Minimalus nuomos terminas – 5 valandos."
                    },
                    {
                        content: "Nuomininkas privalo užrakinti visas automobilio dureles ir, jei yra, įjungti signalizaciją, net ir trumpam laikui palikdamas automobilį. Nuomininkas privalo saugoti automobilio dokumentus ir raktus nuo trečiųjų asmenų."
                    },
                    {
                        content: "Automobilį draudžiama naudoti:",
                        inner: [
                            "Mokamam keleivių pervežimui;",
                            "Automobilių arba priekabų vilkimui;",
                            "Prekių pervežimui nusižengiant muitinės įstatymams ar kitoms įstatyminėms normoms;",
                            "Nusikalstamiems veiksmams;",
                            "Jeigu nuomininkas yra neblaivus, apsvaigęs nuo narkotinių medžiagų ar kitokių stipraus poveikio medikamentų, kurie daro poveikį žmogaus reakcijai;",
                            "Sportiniuose ar eismo renginiuose, kuriuose nesilaikoma saugaus eismo taisyklių;",
                            "Vežti vertingus daiktus ar dokumentus be nuosavybę patvirtinančio dokumento;",
                            "Vežti degius skysčius bei medžiagas, sprogmenis, narkotines medžiagas ar kitus daiktus, kurių laikymą bei vartojimą draudžia Lietuvos Respublikos ir / ar kitų šalių įstatymai;",
                            "Automobilyje draudžiama rūkyti;"
                        ]
                    },
                ]
            }
        ],
        leftover: {
            continueFrom: 2,
            items: [{
                    content: "Nuomininkas ar vairuotojas privalo laikytis saugaus eismo taisyklių ir nuomos sutarties sąlygų."
                },
                {
                    content: "Kiekvieną kartą pildamas kurą nuomininkas privalo kontroliuoti tepalų ir kitų eksploatacinių skysčių lygį."
                },
                {
                    content: "Sugedus automobiliui remontas turi būti atliekamas tik Nuomotojo rekomenduotame servise."
                },
                {
                    content: "Nuomos metu nuomininkas privalo imtis visų priemonių, kad automobilis būtų apsaugotas nuo vagysčių ir avarijų."
                },
                {
                    content: "Už nuomos mokestį per parą leidžiama nuvažiuoti ne daugiau nei 500 km. Už papildomą 1 km. Nuomininkas Nuomotojui sumoka po 0.05 EUR."
                }
            ]
        }
    },
    pageTwo: {
        outer: [{
                content: "VAGYSTĖ, AVARIJA, KITI AUTOMOBILIO SUGADINIMAI",
                middle: [{
                        content: "Įvykus autoavarijai, gaisrui, pastebėjus trečiųjų asmenų padarytą žalą automobiliu, vagystės atveju nuomininkas privalo kuo skubiau apie įvykį pranešti Nuomotojui, policijai, gaisrinei, draudimo įstaigai ar kitoms oficialioms instancijoms. Reikalauti, kad įvykis būtų tiriamas policijoje."
                    },
                    {
                        content: "Policijos dokumentai, transportavimo įmonių pažymos – pagrindas išmokėti draudimą bei apkaltinti trečiuosius asmenis dėl žalos padarymo."
                    },
                    {
                        content: "Įrodymų objektai (daiktai, pėdsakai, liudininkų parodymai) turi būti saugomi, įvykio dalyvių pavardės ir adresai užrašomi. Klientui draudžiama pasirašyti bet kokius dokumentus, kaltinančius Nuomotoją dėl padarytos žalos nuostolių atlyginimo."
                    },
                    {
                        content: "Nuomininkas ar kitas įgaliotas vairuotojas privalo imtis priemonių, kad apsaugotų nuomotojo bei draudimo kompanijos interesus, jeigu nuomos laikotarpiu įvyksta avarija. Nuomininkas privalo:",
                        inner: [
                            "Nedelsiant gelbėti transporto priemonę, apsaugoti ją nuo tolesnio gedimo ir pašalinti priežastis, galinčias padidinti nuostolius;",
                            "Nedelsiant apie draudiminį įvykį pranešti policijai ir gauti policijos pranešimą apie įvykį;",
                            "Nedelsiant apie įvykį informuoti nuomotoją telefonu +3706 505 568 arba +370 37 362484;",
                            "Pranešime būtina nurodyti, kur yra sugadinta transporto priemonė, kam ir kada pranešta apie įvykį, ar žinomas kaltininkas, jo vardas, pavardė, adresas, telefonas;"
                        ]
                    },
                    {
                        content: "Nuomotojas neatsako už nuostolius arba žalą, padarytą automobilyje paliktai nuomininko nuosavybei."
                    }
                ]
            },
            {
                content: "AUTOMOBILIO DRAUDIMAS",
                middle: [{
                    content: "Automobilis apdraustas privalomuoju civilinės atsakomybės draudimu."
                }]
            },
            {
                content: "APMOKĖJIMO SĄLYGOS",
                middle: [{
                        content: "Nuomos kaina mokama eurais, po to perduodamas automobilis."
                    },
                    {
                        content: "Į nuomos kainą įeina: transporto priemonės nuomos mokestis, draudimas, techninis aptarnavimas, techninė pagalba kelyje Lietuvos Respublikoje ir Europos sąjungos šalyse."
                    },
                    {
                        content: "Nuomininkas yra asmeniškai įsipareigojęs sumokėti nuomotojui pareikalavus:",
                        inner: [
                            "Nuomos sumą paskaičiuotą pagal nuomos įkainius;",
                            "Sumą, nurodytą sutartyje, jei nuomininkas grąžina automobilį nuomotojui ne pilnu kuro baku;",
                            "Sumą už papildomus patarnavimus;",
                            "Sumą, kuri kompensuotų padarytus nuostolius;"
                        ]
                    },
                    {
                        content: "Nuomininkas, pasiimdamas automobilį, moka 150 EUR užstatą. Grąžinus automobilį Nuomotojas Nuomininkui grąžina užstatą, jei neatsirado nuostolių dėl Nuomininko kaltės."
                    },
                    {
                        content: "Už kiekvieną uždelstą dieną nuomininkas įsipareigoja sumokėti 0.5% delspinigių."
                    },
                    {
                        content: "Jei grąžinamas nešvarus automobilis, papildomai reikia sumokėti 20 EUR."
                    },
                    {
                        content: "Jei automobilyje buvo rūkoma, nuomininkas moka nuomotojui 15 EUR baudą."
                    },
                    {
                        content: "Nuomininkas įsipareigoja sumokėti naudoto automobilio kelių mokestį."
                    }
                ]
            },
            {
                content: "NUOMININKO ATSAKOMYBĖ",
                middle: [{
                        content: "Nuomininkas yra visiškai atsakingas nuomotojui už automobilio tyčinį arba neapdairumo pasekoje įvykusį gedimą ir kitų nuotolių atlyginimą, tuo atveju, jei draudimo kompanija neatlygina padarytų nuostolių."
                    },
                    {
                        content: "Nuomininkas prisiima atsakomybę, jei įvyksta automobilio gedimas dėl jo kaltės."
                    },
                    {
                        content: "Nuomininkas atsako už automobiliui padarytą žalą, jei jis pažeidė transporto priemonės eksploatavimo taisykles arba:",
                        inner: [
                            "Naudojo techniškai netvarkingą transporto priemonę;",
                            "Pažeidė lengvai užsidegančių ir sprogstančių medžiagų vežimo ir saugojimo, priešgasrines saugumo taisykles;"
                        ]
                    }
                ]
            }
        ],
        leftover: {
            inner: [
                "Transporto priemonę vairavo asmuo, neturintis teisės vairuoti, apsvaigęs nuo alkoholio ar narkotinių medžiagų;",
                "Padarė avariją ir pabėgo iš įvykio vietos;",
                "Jeigu transporto priemonė priemonė buvo naudojama nusikalstamiems veiksmams vykdyti;"
            ],
            middle: [
                "Jeigu apie autoįvykį ar automobilio sugadinimą nuomininkas nepranešė policijai ir negavo policijos pranešimo, nepranešė nuomotojui, nuomininkas privalo apmokėti automobilio remonto išlaidas. Taip pat apmokėti nuostolius, padarytus nuomojamam automobiliui tuo atveju, jei draudimas negalioja arba draudimas neapmoka padarytų nuostolių.",
                "Nuomininkas turi laikytis galiojančių eismo taisyklių ir privalo sumokėti baudas ar išlaidas, susijusias su eismo taisyklių pažeidimais.",
                "Jaigu atumomobilis sugedo ne dėl nuomotojo kaltės, nuomininkas įsipareigoja imtis visų galimų priemonių, kad trumpiausiu laiku automobilis būtų suremontuotas.",
                "Pametus automobilio dokumentus, raktus, pilnai apmokama už raktų pagaminimo arba dokumentų atstatymo nuomotojo patirtus nuostolius.",
                "Sugadinus automobilio padangas, nuomininkas padengia visas išlaidas, o taip pat ir nuperka tokios pačios būklės padangas."
            ]
        }
    },
    pageThree: {
        outer: [{
            content: "NUOMOTOJO ATSAKOMYBĖ",
            middle: [{
                    content: "Nuomotojas neatsako už nuomininko nuostolius, kuriuos jis patyrė dėl to, kad negalėjo pasinaudoti nuomojamu automobiliu pastarojo gedimo atveju, įvykus nelaimingam atsitikimui ir panašiai. Taip pat dėl pavėluoto automobilio grąžinimo. Tačiau nuomotojas tokiu atveju, atsižvelgiant į galimybes, privalo suremontuoti automobilį arba pasiūlyti išsinuomoti kitą automobilį arba grąžinti pinigus už nepanaudotą automobilio nuomos laikotarpį."
                },
                {
                    content: "Nuomotojas neatsako už nuomininko sveikatos būklę."
                },
                {
                    content: "Nuomotojas neatsako už automobilyje buvusiam nuomininko turtui padarytus nuostolius"
                },
                {
                    content: "Nuomotojas neatsako už nuostolius, padarytus tretiesiems asmenims, dėl vairuotojo (nuomotojo) kaltės."
                }
            ]
        }, {
            content: "KITI NUOSTATAI",
            middle: [{
                content: "Nuomos sutarties papildymai ar kiti priedai galioja tik raštiškai patvirtinti abiejų šalių."
            },
            {
                content: "Sutartis sudaryta lietuvių kalba, dviem egzemplioriais, kiekvienai iš šalių, ir turinčiais vieną juridinę galią."
            },
            {
                content: "Šią sutartį reguliuoja Lietuvos Respublikos įstatymai. Ginčai ir nesutarimai sprendžiami tarpusavio derybomis, o tik po to Lietuvos Respublikos tesime, pagal Nuomotojo registracijos adresą."
            },
            {
                content: "Pasirašydamas šią sutartį Nuomininkas sutinka su visomis joje išdėstytomis sąlygomis."
            },
            {
                content: "Sutartis įsigalioja jos pasirašymo dieną ir galioja iki "
            }
        ]
        }]
    }
};

export default agreements;