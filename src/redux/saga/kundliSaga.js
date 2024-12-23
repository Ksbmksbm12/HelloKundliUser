import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { kundliRequest, postRequest } from '../../utils/apiRequests'
import { add_kundli, api_url, delete_kundli, get_customer_kundli, get_horo_chart, get_kp_house_cusps, get_kp_planets, get_kundli_basic_details, get_planets } from '../../config/constants'
import { showToastMessage } from '../../utils/services'
import { navigate, replace } from '../../navigations/NavigationServices'
import moment from 'moment'
import { View } from 'react-native-reanimated/lib/typescript/Animated'
import axios from 'axios'
import { getastkmer } from '../actions/KundliActions'

function* createKundli(actions) {
    try {
        const { payload } = actions
        console.log(payload, 'dsaddasdasd')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + add_kundli,
            data: { ...payload, customerId: customerData?._id }
        })


        if (response?.success) {
            console.log('KundliResponseShreesh', response);
            showToastMessage({ message: 'Kundli created successfully' })

            yield call(navigate, 'showKundli', { kundliId: response?.kundli?._id })
            yield put({ type: actionTypes.GET_ALL_KUNDLI, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getAllKundli(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: api_url + get_customer_kundli,
            data: { customerId: customerData?._id }
        })

        if (response?.success) {

            yield put({ type: actionTypes.SET_ALL_KUNDLI, payload: response?.kundli })
            yield put({ type: actionTypes.SET_ALL_MASTRER_KUNDLI, payload: response?.kundli })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* deleteKundli(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: api_url + delete_kundli,
            data: { kundliId: payload }
        })

        if (response?.success) {
            showToastMessage({ message: 'Kundli deleted successfully' })
            yield put({ type: actionTypes.GET_ALL_KUNDLI, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        yield put({ type: actionTypes.SET_KUNDLI_ID, payload })
        console.log()

        const basicDetailsResponse = yield postRequest({
            url: api_url + get_kundli_basic_details,
            data: {
                kundliId: payload
            }
        })

        // console.log("Kundli Data ::::",basicDetailsResponse?.data)

        if (basicDetailsResponse.success) {
            const data = {
                d: moment(basicDetailsResponse?.data?.dob).format('DD/MM/YYYY'),
                t: moment(basicDetailsResponse?.data?.tob).format('HH:mm:ss'),
                lat: basicDetailsResponse?.data?.lat,
                lon: basicDetailsResponse?.data?.lon,
                userid: "agpssoluti",
                authcode: "725c084e9f589e9cd9ee6bfcbcc28e29",
                tz: "+5.5"
            }
            console.log(basicDetailsResponse?.data, moment(basicDetailsResponse?.data?.tob).format("HH/mm/ss"), '===')
            yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS, payload: basicDetailsResponse?.data })
            yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: data })

        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

////kunli.click

function* Laganchart(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key],);
            }
        }

        const header = {
            "Content-Type": "multipart/form-data"
        };
        console.log(formData, '===== ::::');
        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/chart-asc',
            formData,
            { headers: header, }
        );

        console.log('laganchart:::KKK', response.data?.urlsvg);

        if (response.data) {
            yield put({ type: actionTypes.SET_LAGAN_CHART, payload: response?.data?.urlsvg });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}




function* moonchartInfo(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('plnt_no', 2);


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/chart-planet',
            formData,
            { headers: header }
        );
        console.log(formData, 'alldata ')
        console.log('Moonchart ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_MOON_CHART, payload: response?.data?.url });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getDevisoinChart(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads, payload);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('div', payload?.data);

        console.log(formData)
        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/chart-dx',
            formData,
            { headers: header }
        );

        console.log('Moonchart ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_KUNDLI_CHARTS, payload: response?.data?.url });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}



function* PlanetStatusInfo(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }



        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/planets',
            formData,
            { headers: header }
        );

        console.log('planetry status ::::', response?.data?.planets_details);

        if (response.data) {
            yield put({ type: actionTypes.SET_PLANET_STATUS, payload: response?.data?.planets_details });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* AvakhadaChakraInfo(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload1111 :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        console.log(formData, 'asdfasdfsd')
        const header = {
            "Content-Type": "multipart/form-data"
        };
        console.log('thisis the fasdf')
        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/avakhada-chakra',
            formData,
            { headers: header }
        );
        // console.log('avakhada status ::::', response); 
        if (response.data) {
            yield put({ type: actionTypes.SET_AVAKHADA_CHAKRA, payload: response });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e, 'this is problem');
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* GhaatChakraInfo(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }



        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ghaat-chakra',
            formData,
            { headers: header }
        );

        console.log('ghat chakra status ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_GHAT_CHAKRA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* SarvastakdataInfo(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/sarvashtakvarga',
            formData,
            { headers: header }
        );

        console.log('Sarvastak Data:', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_SARVA_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* KalsarpyogINfo(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/kaalsarpyog-report',
            formData,
            { headers: header }
        );

        // console.log('kal sarp data::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_KALSARP_YOG, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* KalsarpyogRemediesINfo(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/kaalsarpyog-remedies',
            formData,
            { headers: header }
        );

        // console.log('kal sarp data::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_KALSARP_YOG, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* mangalikdata(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }



        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/manglikyog-report',
            formData,
            { headers: header }
        );

        // console.log('ghat chakra status ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_MANGLIK_YOG, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* mangalikremediesdata(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }



        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/manglikyog-remedies',
            formData,
            { headers: header }
        );

        // console.log('ghat chakra status ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_MAGLIK_REMEDIES, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* Sadesatidata(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }



        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/sadesati',
            formData,
            { headers: header }
        );

        // console.log('getsadesati status ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_SADESATI_REPORT, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* Sadesatiremediesdata(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }



        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/sadesati-remedies',
            formData,
            { headers: header }
        );

        // console.log('getsadesati remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_SADESARI_REMEDIES, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* BasicStone(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/gemstone-lucky',
            formData,
            { headers: header }
        );

        // console.log('getsadesati remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_BASIC_STONE, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* HealthStone(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/gemstone-health',
            formData,
            { headers: header }
        );

        // console.log('getsadesati remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_HEALTH_STONE, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* EducationStone(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/gemstone-education',
            formData,
            { headers: header }
        );

        // console.log('getsadesati remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_EDUCATION_STONE, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* DannStone(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/gemstone-daan',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_DAAN_STONE, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* YatraData(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/remedy-yantra',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_YATRA_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* MantraData(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/remedy-mantra',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_MANTRA_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* RudrakshaData(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/remedy-rudraksha',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_RUDRA_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


function* VisMahadahsa(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/vinshottari-mahadasha',
            formData,
            { headers: header }
        );


        if (response.data) {
            yield put({ type: actionTypes.SET_VISMAHADASHA_DATA, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* VisAnterdasha(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);


        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('mahadasha', payload?.id);

        console.log('kundli payload :::', formData);

        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/vinshottari-antardasha',
            formData,
            { headers: header }
        );

        // console.log('VISANTAR ::', response?.data)
        if (response.data) {
            yield put({
                type: actionTypes.SET_VISANTARDASH_DATA, payload: {
                    response: response?.data,
                    payload: payload, // Replace `yourPayload` with your actual data or variable
                },
            });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* Vispayanterdasha(actions) {
    try {
        const { payload } = actions;
        console.log(payload, 'pay Data')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('mahadasha', payload?.mid);
        formData.append('antardasha', payload?.aid);


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/vinshottari-pratyantardasha',
            formData,
            { headers: header }
        );

        // console.log('VISANTAR ::', response?.data)
        if (response.data) {
            yield put({
                type: actionTypes.SET_VISPAYANTAR_DATA, payload: {
                    response: response?.data,
                    payload: payload,
                },
            });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* VisSukshama(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('mahadasha', payload?.mid);
        formData.append('antardasha', payload?.aid);
        formData.append('pratyantardasha', payload?.pid)


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/vinshottari-sookshmadasha',
            formData,
            { headers: header }
        );

        // console.log('VISANTAR ::', response?.data)
        if (response.data) {
            yield put({
                type: actionTypes.SET_VSISUKSHAMA_DATA, payload: {
                    response: response?.data,
                    payload: payload,
                },
            });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* Patyantradasha(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('mahadasha', payload?.mid);
        formData.append('antardasha', payload?.aid);
        formData.append('pratyantardasha', payload?.pid)
        formData.append('sookshmadasha', payload?.sid)


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/vinshottari-praanadasha',
            formData,
            { headers: header }
        );
        console.log(formData, 'all data')

        console.log('VISANTAR ::', response?.data)
        if (response.data) {
            yield put({
                type: actionTypes.SET_PRATYANTRADASHA_DATA, payload: {
                    response: response?.data,
                    payload: payload,
                },
            });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAtakvargSun(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('planet_num', '1')


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtakvarga',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTAK_SUN, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAtakvargMoon(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('planet_num', '2')


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtakvarga',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTAK_MOON, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAtakvargMars(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('planet_num', '3')


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtakvarga',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTAK_MARS, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAtakvargJup(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('planet_num', '4')


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtakvarga',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTAK_JUP, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAtakvargVen(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('planet_num', '5')


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtakvarga',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTAK_VEN, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAtakvargSat(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('planet_num', '6')


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtakvarga',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTAK_SAT, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAtakvargAce(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('planet_num', '8')


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtakvarga',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTAK_ASC, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getAtakvargmer(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads);
        console.log('kundli payload :::', kundliPayloads);

        const formData = new FormData();
        for (const key in kundliPayloads) {
            if (kundliPayloads.hasOwnProperty(key)) {
                formData.append(key, kundliPayloads[key]);
            }
        }
        formData.append('planet_num', '9')


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtakvarga',
            formData,
            { headers: header }
        );

        // console.log('daan remedies ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTAK_MER, payload: response?.data });
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}


///click match
function* viewKundliFromKundliMatching(actions) {
    try {
        const { payload } = actions
        if (payload === 'male') {
            const kundliData = yield select(state => state.kundli.maleKundliData)
            const data = {
                day: parseInt(moment(kundliData.dob).format('D')),
                month: parseInt(moment(kundliData.dob).format('M')),
                year: parseInt(moment(kundliData.dob).format('YYYY')),
                hour: parseInt(moment(kundliData.tob).format('HH')),
                min: parseInt(moment(kundliData.tob).format('mm')),
                lat: kundliData.lat,
                lon: kundliData.lon,
                tzone: 5.5,
            };
            yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: data })
            yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS, payload: kundliData })
            yield call(navigate, 'showKundli', { type: 'matching' })
        } else {
            const kundliData = yield select(state => state.kundli.femaleKundliData)
            const data = {
                day: parseInt(moment(kundliData.dob).format('D')),
                month: parseInt(moment(kundliData.dob).format('M')),
                year: parseInt(moment(kundliData.dob).format('YYYY')),
                hour: parseInt(moment(kundliData.tob).format('HH')),
                min: parseInt(moment(kundliData.tob).format('mm')),
                lat: kundliData.lat,
                lon: kundliData.lon,
                tzone: 5.5,
            };
            yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: data })
            yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS, payload: kundliData })
            yield call(navigate, 'showKundli', { type: 'matching' })
        }
    } catch (e) {
        console.log(e)
    }
}

function* getAtakGunmilan(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const maleKundliData = yield select(state => state.kundli.maleKundliData)
        const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

        console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
        const data = {
            md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
            mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
            mlat: maleKundliData?.lat,
            mlon: maleKundliData?.lon,
            mtz: 5.5,
            fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
            ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
            flat: femaleKundliData?.lat,
            flon: femaleKundliData?.lon,
            ftz: 5.5,
            userid: 'agpssoluti',
            authcode: '725c084e9f589e9cd9ee6bfcbcc28e29'
        };


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtkoot-points',
            data,
            { headers: header }
        );

        // console.log('Gun data ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_GUN_DATA, payload: response?.data });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getAtakDosa(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const maleKundliData = yield select(state => state.kundli.maleKundliData)
        const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

        console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
        const data = {
            md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
            mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
            mlat: maleKundliData?.lat,
            mlon: maleKundliData?.lon,
            mtz: 5.5,
            fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
            ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
            flat: femaleKundliData?.lat,
            flon: femaleKundliData?.lon,
            ftz: 5.5,
            userid: 'agpssoluti',
            authcode: '725c084e9f589e9cd9ee6bfcbcc28e29'
        };


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtkoot-doshas',
            data,
            { headers: header }
        );

        // console.log('DoSA data ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_ASTKOOT_DOSA, payload: response?.data });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}
function* getMaglidos(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const maleKundliData = yield select(state => state.kundli.maleKundliData)
        const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

        console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
        const data = {
            md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
            mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
            mlat: maleKundliData?.lat,
            mlon: maleKundliData?.lon,
            mtz: 5.5,
            fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
            ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
            flat: femaleKundliData?.lat,
            flon: femaleKundliData?.lon,
            ftz: 5.5,
            userid: 'agpssoluti',
            authcode: '725c084e9f589e9cd9ee6bfcbcc28e29'
        };


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/manglik-dosha',
            data,
            { headers: header }
        );

        // console.log('Maglik dosa data ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_MATCH_MAGLIK, payload: response?.data });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getMaatchcon(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        const maleKundliData = yield select(state => state.kundli.maleKundliData)
        const femaleKundliData = yield select(state => state.kundli.femaleKundliData)

        console.log(maleKundliData, 'Male data::', femaleKundliData, 'female kundali ::')
        const data = {
            md: parseInt(moment(maleKundliData?.dob).format('DD/MM/YYYY')),
            mt: parseInt(moment(maleKundliData?.tob).format('HH:mm:ss')),
            mlat: maleKundliData?.lat,
            mlon: maleKundliData?.lon,
            mtz: 5.5,
            fd: parseInt(moment(femaleKundliData?.dob).format('DD/MM/YYYY')),
            ft: parseInt(moment(femaleKundliData?.tob).format('HH:mm:ss')),
            flat: femaleKundliData?.lat,
            flon: femaleKundliData?.lon,
            ftz: 5.5,
            userid: 'agpssoluti',
            authcode: '725c084e9f589e9cd9ee6bfcbcc28e29'
        };


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/ashtkoot-conclusion',
            data,
            { headers: header }
        );

        console.log('Conclusion dosa data ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_MATCH_CONCLUSION, payload: response?.data['ashtkoot-conclusion'] });

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}



function* getKundliMatchingReport(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        console.log(payload)

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/match_birth_details`,
            data: {
                ...payload
            },
            lang: payload?.lang
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS_MATCHING, payload: response })
            yield call(navigate, 'basicmatch')
        }

        // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
//panchag cklick

function* getPachangData(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        console.log(payload, "Panchang payload::::")

        const data = {
            d: payload?.d,
            t: payload?.t,
            lat: payload?.lat,
            lon: payload?.lon,
            tz: 5.5,
            userid: 'agpssoluti',
            authcode: '725c084e9f589e9cd9ee6bfcbcc28e29'
        };


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/panchang',
            data,
            { headers: header }
        );

        console.log('pachang data ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_PANCHA_DATA, payload: response?.data?.panchang });
            navigate('panchdata')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getMuhuratData(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        console.log(payload, 'muhurat payload::::')
        const data = {
            muhurat: payload?.muhurat,
            month: payload?.month,
            year: payload?.year,
            lat: +25.15,
            lon: +82.50,
            tz: 5.5,
            userid: 'agpssoluti',
            authcode: '725c084e9f589e9cd9ee6bfcbcc28e29'
        };


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/muhurat',
            data,
            { headers: header }
        );

        // console.log('pachang data ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_MUHURAT_DATA, payload: response?.data });
            navigate('muhurat');

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getDurMuhuratData(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        console.log(payload, 'durmuhrat:::')
        const data = {
            durmuhurat: payload?.durmuhurat,
            d: payload?.d,
            lat: +25.15,
            lon: +82.50,
            tz: 5.5,
            userid: 'agpssoluti',
            authcode: '725c084e9f589e9cd9ee6bfcbcc28e29'
        };


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/durmuhurat',
            data,
            { headers: header }
        );

        // console.log('Durmuhurat data ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_DURMUHURAT_DATA, payload: response?.data });
            navigate('durmuhurat')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getYogdata(actions) {
    try {
        const { payload } = actions;
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

        console.log(payload, 'payloadata:::::::::')
        const data = {
            yog: payload?.yog,
            month: payload?.month,
            year: payload?.year,
            lat: payload?.lat,
            lon: payload?.lon,
            tz: 5.5,
            userid: 'agpssoluti',
            authcode: '725c084e9f589e9cd9ee6bfcbcc28e29'
        };


        const header = {
            "Content-Type": "multipart/form-data"
        };

        const response = yield axios.post('https://api.kundli.click/cust_hellokundli_v0.4/yog',
            data,
            { headers: header }
        );

        console.log('Yog data ::::', response?.data);

        if (response.data) {
            yield put({ type: actionTypes.SET_YOG_DATA, payload: response?.data });
            navigate('yogdata')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (e) {
        console.log(e);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}



{/* <View>

// function* getPlanetData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         const planetResponse = yield kundliRequest({
//             url: 'https://json.astrologyapi.com/v1/planets',
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang

//         })

//         if (planetResponse) {
//             yield put({ type: actionTypes.SET_PLANET_DATA, payload: planetResponse })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKpPlanetData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const response = yield kundliRequest({
//             url: 'https://json.astrologyapi.com/v1/kp_horary',
//             data: {
//                 ...kundliPayloads,
//                 horary_number: 2
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KP_PLANET_DATA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKpHouseCupsData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const response = yield kundliRequest({
//             url: 'https://json.astrologyapi.com/v1/kp_horary',
//             data: {
//                 ...kundliPayloads,
//                 horary_number: 2
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KP_HOUSE_CUPS_DATA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }



// function* RashiReportData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)



//         const moonReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_rashi_report/moon`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const mercuryReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_rashi_report/mercury`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const marsReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_rashi_report/mars`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const venusReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_rashi_report/venus`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const saturnReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_rashi_report/saturn`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const jupiterReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_rashi_report/jupiter`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })


//         const data = {
//             moonReports,
//             mercuryReports,
//             marsReports,
//             saturnReports,
//             venusReports,
//             jupiterReports
//         }

//         yield put({ type: actionTypes.SET_RASHI_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* AstakVargaData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         console.log(kundliPayloads)

//         const ascendantReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak/ascendant`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const sunReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak/sun`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const moonReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak/moon`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const mercuryReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak/mercury`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const marsReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak/mars`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const venusReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak/venus`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const saturnReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak/saturn`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const jupiterReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak/jupiter`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const ascendantchart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak_image/ascendant`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const sunchart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak_image/sun`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const moonchart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak_image/moon`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const mercurychart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak_image/mercury`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const marschart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak_image/mars`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const venuschart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak_image/venus`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const saturnchart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak_image/saturn`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const jupiterchart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/planet_ashtak_image/jupiter`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })


//         const data = {
//             sunReports,
//             ascendantReports,
//             moonReports,
//             mercuryReports,
//             marsReports,
//             saturnReports,
//             venusReports,
//             jupiterReports,
//             sunchart,
//             ascendantchart,
//             moonchart,
//             mercurychart,
//             marschart,
//             saturnchart,
//             venuschart,
//             jupiterchart,

//         }

//         yield put({ type: actionTypes.SET_ASTAK_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* SarVargaData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         console.log('adfas', kundliPayloads)
//         const sarvashtak = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/sarvashtak`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const sarvashtakchart = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/sarvashtak_image`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })



//         const data = {
//             sarvashtak,
//             sarvashtakchart
//         }

//         yield put({ type: actionTypes.SET_SARVA_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* AscendantData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         console.log('adfas', kundliPayloads)
//         const AscedentReport = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })



//         const data = {
//             AscedentReport
//         }

//         yield put({ type: actionTypes.SET_ASCEDENT_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }
// function* MatchingAscendantData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         console.log('adfas', kundliPayloads)
//         const kundliDataMale = yield select(state => state.kundli.maleKundliData)
//         const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

//         console.log(kundliDataMale, 'sdfsdfsdf')
//         const m_data = {
//             day: parseInt(moment(kundliDataMale?.dob).format('D')),
//             month: parseInt(moment(kundliDataMale?.dob).format('M')),
//             year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
//             hour: parseInt(moment(kundliDataMale.tob).format('hh')),
//             min: parseInt(moment(kundliDataMale.tob).format('mm')),
//             lat: kundliDataMale.lat,
//             lon: kundliDataMale.lon,
//             tzone: 5.5,

//         };
//         const f_data = {
//             day: parseInt(moment(kundliDataFemale?.dob).format('D')),
//             month: parseInt(moment(kundliDataFemale?.dob).format('M')),
//             year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
//             hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
//             min: parseInt(moment(kundliDataFemale.tob).format('mm')),
//             lat: kundliDataFemale?.lat,
//             lon: kundliDataFemale?.lon,
//             tzone: 5.5,
//         };
//         const AscedentReportM = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
//             data: {
//                 ...m_data
//             },
//             lang: payload?.lang
//         })
//         const AscedentReporF = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
//             data: {
//                 ...f_data
//             },
//             lang: payload?.lang
//         })



//         const data = {
//             AscedentReportM,
//             AscedentReporF
//         }

//         yield put({ type: actionTypes.SET_ASCEDENT_MATCHING_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }
// function* BasicPanchangData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         console.log('adfas', kundliPayloads)
//         const Panchang = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/basic_panchang`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const data = {
//             Panchang
//         }

//         yield put({ type: actionTypes.SET_BASIC_PANCHANGE, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* NumerologyData(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         console.log('adfas', kundliPayloads)
//         const Numero = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/numero_table`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const data = {
//             Numero
//         }

//         yield put({ type: actionTypes.SET_BASIC_PANCHANGE, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliChart(actions) {
//     try {
//         const { payload } = actions
//         // console.log('payload ::::', payload);
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const chartResponse = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/horo_chart/${payload?.data}`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang

//         })

//         // console.log(chartResponse)
//         if (chartResponse) {
//             yield put({ type: actionTypes.SET_KUNDLI_CHARTS, payload: chartResponse })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getChartImage(actions) {
//     const { payload } = actions
//     yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//     const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//     const kundliRequestData = {
//         ...kundliPayloads
//     };
//     console.log('payload :::',kundliPayloads );
//     try {
//         if(payload?.data == 'chalit') {
//             const data = yield kundliRequest({
//                 url: `https://json.astrologyapi.com/v1/horo_chart_image/${payload?.data}`, 
//                 data: kundliRequestData});
//             console.log('hghjg :::',data);
//             const modifiedChartData = data.replace(/<path[^>]*d="M340,175L340,340L257.5,257.5"[^>]*><\/path>/g, '');
//             const chartData1 = modifiedChartData.replace('<text font-size="14" x="158.5" y="179.95" style="fill: black;">', '<text font-size="15" x="148.5" y="179.95" style="fill: black;">');
//             const newchart = chartData1.replace('</g>', '<path d="M340,175L340,340L257.5,257.5" stroke="black" stroke-width="1" fill="none"></path></g>');
//             // console.log('212=12==21', modifiedChartData);
//             if (newchart) {
//                 yield put({ type: actionTypes.SET_KUNDLI_CHARTS_IMAGE, payload: newchart })
//             }
//         } else {
//             const data = yield kundliRequest({
//                 url: `https://json.astrologyapi.com/v1/horo_chart_image/${payload?.data}`, 
//                 data: kundliRequestData});
//             // console.log('hghjg :::',data);
//             const modifiedChartData = data.svg.replace(/<path[^>]*d="M340,175L340,340L257.5,257.5"[^>]*><\/path>/g, '');
//             const chartData1 = modifiedChartData.replace('<text font-size="15" x="158.5" y="179.95" style="fill: black;">','<text font-size="15" x="148.5" y="179.95" style="fill: black;">');
//             const newchart = chartData1.replace('</g>','<path d="M340,175L340,340L257.5,257.5" stroke="black" stroke-width="1" fill="none"></path></g>');
//             if (newchart) {
//                 yield put({ type: actionTypes.SET_KUNDLI_CHARTS_IMAGE, payload: newchart })
//             }
//         }
       

    
       

//     yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
// } catch (e) {
//     console.log(e, 'hi')
//     yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
// }
// };


// function* getSaptmashaChart(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const kundliDataMale = yield select(state => state.kundli.maleKundliData)
//         const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

//         console.log(kundliDataMale, 'sdfsdfsdf')
//         const dataM = {
//             day: parseInt(moment(kundliDataMale?.dob).format('D')),
//             month: parseInt(moment(kundliDataMale?.dob).format('M')),
//             year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
//             hour: parseInt(moment(kundliDataMale.tob).format('hh')),
//             min: parseInt(moment(kundliDataMale.tob).format('mm')),
//             lat: kundliDataMale.lat,
//             lon: kundliDataMale.lon,
//             tzone: 5.5,
//         }
//         const dataF = {
//             day: parseInt(moment(kundliDataFemale?.dob).format('D')),
//             month: parseInt(moment(kundliDataFemale?.dob).format('M')),
//             year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
//             hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
//             min: parseInt(moment(kundliDataFemale.tob).format('mm')),
//             lat: kundliDataFemale?.lat,
//             lon: kundliDataFemale?.lon,
//             tzone: 5.5,
//         };

//         const chartResponseM = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/horo_chart/D7`,
//             data: {
//                 ...dataM
//             },
//             lang: payload?.lang
//         })


//         const chartResponseF = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/horo_chart/D7`,
//             data: {
//                 ...dataF
//             },
//             lang: payload?.lang
//         })

//         const response = {
//             chartResponseM,
//             chartResponseF
//         }

//         console.log(response)
//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_D7_CHARTS, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }
// function* getNavmashaChart(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const kundliDataMale = yield select(state => state.kundli.maleKundliData)
//         const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

//         console.log(kundliDataMale, 'sdfsdfsdf')
//         const dataM = {
//             day: parseInt(moment(kundliDataMale?.dob).format('D')),
//             month: parseInt(moment(kundliDataMale?.dob).format('M')),
//             year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
//             hour: parseInt(moment(kundliDataMale.tob).format('hh')),
//             min: parseInt(moment(kundliDataMale.tob).format('mm')),
//             lat: kundliDataMale.lat,
//             lon: kundliDataMale.lon,
//             tzone: 5.5,
//         }
//         const dataF = {
//             day: parseInt(moment(kundliDataFemale?.dob).format('D')),
//             month: parseInt(moment(kundliDataFemale?.dob).format('M')),
//             year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
//             hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
//             min: parseInt(moment(kundliDataFemale.tob).format('mm')),
//             lat: kundliDataFemale?.lat,
//             lon: kundliDataFemale?.lon,
//             tzone: 5.5,
//         };

//         const chartResponseM = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/horo_chart/D9`,
//             data: {
//                 ...dataM
//             },
//             lang: payload?.lang
//         })
//         const chartResponseF = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/horo_chart/D9`,
//             data: {
//                 ...dataF
//             },
//             lang: payload?.lang
//         })

//         const response = {
//             chartResponseM,
//             chartResponseF
//         }

//         console.log('navamashaa cart', response)
//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_D9_CHARTS, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliBirthDetails(actions) {
//     try {
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/birth_details`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_BIRTH_DETAILS, payload: response })
//         }


//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

//     } catch (e) {
//         console.log(e)
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliMajorDasha(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/major_vdasha`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_MAJOR_DASHA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliSubVDasha(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/sub_vdasha/${payload}`,
//             data: {
//                 ...kundliPayloads
//             },

//         })

//         if (response?.status) {
//             yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${payload?.plant}/` })
//             yield put({ type: actionTypes.SET_KUNDLI_SUB_V_DASHA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliSubSubVDasha(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         const dashaPath = yield select(state => state.kundli.dashaPath)
//         console.log(dashaPath)
//         console.log(`https://json.astrologyapi.com/v1/sub_sub_vdasha/${dashaPath}${payload?.plant}`)
//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/sub_sub_vdasha/${dashaPath}${payload?.plant}`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}/` })
//             yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliSubSubSubVDasha(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         const dashaPath = yield select(state => state.kundli.dashaPath)
//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/sub_sub_sub/vdasha/${dashaPath}${payload?.plant}`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}` })
//             yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliSubSubSubSubVDasha(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
//         const dashaPath = yield select(state => state.kundli.dashaPath)
//         console.log(payload?.plant)
//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/sub_sub_sub_sub/vdasha/${dashaPath}${payload?.plant}`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}` })
//             yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA, payload: response })
//         }

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliHouseReports(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
//         const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

//         const sunReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_house_report/sun`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const moonReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_house_report/moon`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const mercuryReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_house_report/mercury`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const marsReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_house_report/mars`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const venusReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_house_report/venus`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })

//         const saturnReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_house_report/saturn`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })
//         const jupiterReports = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/general_house_report/jupiter`,
//             data: {
//                 ...kundliPayloads
//             },
//             lang: payload?.lang
//         })


//         const data = {
//             sunReports,
//             moonReports,
//             mercuryReports,
//             marsReports,
//             saturnReports,
//             venusReports,
//             jupiterReports
//         }

//         yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getAsstkoota(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

//         const kundliDataMale = yield select(state => state.kundli.maleKundliData)
//         const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

//         console.log(kundliDataMale, 'sdfsdfsdf')
//         const data = {
//             m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
//             m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
//             m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
//             m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
//             m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
//             m_lat: kundliDataMale.lat,
//             m_lon: kundliDataMale.lon,
//             m_tzone: 5.5,
//             f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
//             f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
//             f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
//             f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
//             f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
//             f_lat: kundliDataFemale?.lat,
//             f_lon: kundliDataFemale?.lon,
//             f_tzone: 5.5,
//         };

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/match_ashtakoot_points`,
//             data: {
//                 ...data
//             },
//             lang: payload?.lang

//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS, payload: response })
//             yield call(navigate, 'basicmatch')
//         }

//         // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getDaskoota(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

//         const kundliDataMale = yield select(state => state.kundli.maleKundliData)
//         const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

//         console.log(kundliDataMale, 'sdfsdfsdf')
//         const data = {
//             m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
//             m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
//             m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
//             m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
//             m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
//             m_lat: kundliDataMale.lat,
//             m_lon: kundliDataMale.lon,
//             m_tzone: 5.5,
//             f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
//             f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
//             f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
//             f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
//             f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
//             f_lat: kundliDataFemale?.lat,
//             f_lon: kundliDataFemale?.lon,
//             f_tzone: 5.5,
//         };

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/match_dashakoot_points`,
//             data: {
//                 ...data
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_MATCHING_DSHKOOT_POINTS, payload: response })
//             // yield call(navigate, 'basicmatch')
//         }

//         // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getMatchConclusion(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

//         const kundliDataMale = yield select(state => state.kundli.maleKundliData)
//         const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

//         console.log(kundliDataMale, 'sdfsdfsdf')
//         const data = {
//             m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
//             m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
//             m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
//             m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
//             m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
//             m_lat: kundliDataMale.lat,
//             m_lon: kundliDataMale.lon,
//             m_tzone: 5.5,
//             f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
//             f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
//             f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
//             f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
//             f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
//             f_lat: kundliDataFemale?.lat,
//             f_lon: kundliDataFemale?.lon,
//             f_tzone: 5.5,
//         };

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/match_manglik_report`,
//             data: {
//                 ...data
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_MATCHING_CONCLUSION_POINTS, payload: response })

//         }



//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getMatchReport(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

//         const kundliDataMale = yield select(state => state.kundli.maleKundliData)
//         const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

//         console.log(kundliDataMale, 'sdfsdfsdf')
//         const data = {
//             m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
//             m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
//             m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
//             m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
//             m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
//             m_lat: kundliDataMale.lat,
//             m_lon: kundliDataMale.lon,
//             m_tzone: 5.5,
//             f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
//             f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
//             f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
//             f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
//             f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
//             f_lat: kundliDataFemale?.lat,
//             f_lon: kundliDataFemale?.lon,
//             f_tzone: 5.5,
//         };

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/match_ashtakoot_points`,
//             data: {
//                 ...data
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_MATCHING_REPORT_POINTS, payload: response })

//         }

//         // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }


// function* getMatchBasicAstro(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

//         const kundliDataMale = yield select(state => state.kundli.maleKundliData)
//         const kundliDataFemale = yield select(state => state.kundli.femaleKundliData)

//         console.log(kundliDataMale, 'sdfsdfsdf')
//         const data = {
//             m_day: parseInt(moment(kundliDataMale?.dob).format('D')),
//             m_month: parseInt(moment(kundliDataMale?.dob).format('M')),
//             m_year: parseInt(moment(kundliDataMale?.dob).format('YYYY')),
//             m_hour: parseInt(moment(kundliDataMale.tob).format('hh')),
//             m_min: parseInt(moment(kundliDataMale.tob).format('mm')),
//             m_lat: kundliDataMale.lat,
//             m_lon: kundliDataMale.lon,
//             m_tzone: 5.5,
//             f_day: parseInt(moment(kundliDataFemale?.dob).format('D')),
//             f_month: parseInt(moment(kundliDataFemale?.dob).format('M')),
//             f_year: parseInt(moment(kundliDataFemale?.dob).format('YYYY')),
//             f_hour: parseInt(moment(kundliDataFemale.tob).format('hh')),
//             f_min: parseInt(moment(kundliDataFemale.tob).format('mm')),
//             f_lat: kundliDataFemale?.lat,
//             f_lon: kundliDataFemale?.lon,
//             f_tzone: 5.5,
//         };

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/match_astro_details
// `,
//             data: {
//                 ...data
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_BASIC_ASTRO_POINTS, payload: response })

//         }



//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }

// function* getKundliMatchingReport(actions) {
//     try {
//         const { payload } = actions
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

//         console.log(payload)

//         const response = yield kundliRequest({
//             url: `https://json.astrologyapi.com/v1/match_birth_details`,
//             data: {
//                 ...payload
//             },
//             lang: payload?.lang
//         })

//         if (response) {
//             yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS_MATCHING, payload: response })
//             yield call(navigate, 'basicmatch')
//         }

//         // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     } catch (e) {
//         console.log(e, 'hi')
//         yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
//     }
// }



</View> */}

export default function* kundliSaga() {
    yield takeLeading(actionTypes.CREATE_KUNDLI, createKundli)
    yield takeLeading(actionTypes.GET_ALL_KUNDLI, getAllKundli)
    yield takeLeading(actionTypes.DELETE_KUNDLI, deleteKundli)
    yield takeLeading(actionTypes.GET_KUNDLI_DATA, getKundliData)


    ///kundli,click
    yield takeLeading(actionTypes.GET_LAGAN_CHART, Laganchart)
    yield takeLeading(actionTypes.GET_MOON_CHART, moonchartInfo)
    yield takeLeading(actionTypes.GET_KUNDLI_CHART_DATA, getDevisoinChart)
    yield takeLeading(actionTypes.GET_PLANET_STATUS, PlanetStatusInfo)
    yield takeLeading(actionTypes.GET_AVAKHADA_CHAKRA, AvakhadaChakraInfo)
    yield takeLeading(actionTypes.GET_GHAT_CHAKRA, GhaatChakraInfo)
    yield takeLeading(actionTypes.GET_SARVA_DATA, SarvastakdataInfo)
    yield takeLeading(actionTypes.GET_KALSARP_YOG, KalsarpyogINfo)
    yield takeLeading(actionTypes.GET_KALSARP_REMIDIES, KalsarpyogRemediesINfo)
    yield takeLeading(actionTypes.GET_MANGLIK_YOG, mangalikdata)
    yield takeLeading(actionTypes.GET_MAGLIK_REMEDIES, mangalikremediesdata)
    yield takeLeading(actionTypes.GET_SADESATI_REPORT, Sadesatidata)
    yield takeLeading(actionTypes.GET_SADESARI_REMEDIES, Sadesatiremediesdata)
    yield takeLeading(actionTypes.GET_BASIC_STONE, BasicStone)
    yield takeLeading(actionTypes.GET_HEALTH_STONE, HealthStone)
    yield takeLeading(actionTypes.GET_EDUCATION_STONE, EducationStone)
    yield takeLeading(actionTypes.GET_DAAN_STONE, DannStone)
    yield takeLeading(actionTypes.GET_YATRA_DATA, YatraData)
    yield takeLeading(actionTypes.GET_MANTRA_DATA, MantraData)
    yield takeLeading(actionTypes.GET_RUDRA_DATA, RudrakshaData)
    yield takeLeading(actionTypes.GET_VISMAHADASHA_DATA, VisMahadahsa)
    yield takeLeading(actionTypes.GET_VISANTARDASH_DATA, VisAnterdasha)
    yield takeLeading(actionTypes.GET_VISPAYANTAR_DATA, Vispayanterdasha)
    yield takeLeading(actionTypes.GET_VSISUKSHAMA_DATA, VisSukshama)
    yield takeLeading(actionTypes.GET_PRATYANTRADASHA_DATA, Patyantradasha)
    yield takeLeading(actionTypes.GET_ASTAK_SUN, getAtakvargSun)
    yield takeLeading(actionTypes.GET_ASTAK_MOON, getAtakvargMoon)
    yield takeLeading(actionTypes.GET_ASTAK_MARS, getAtakvargMars)
    yield takeLeading(actionTypes.GET_ASTAK_JUP, getAtakvargJup)
    yield takeLeading(actionTypes.GET_ASTAK_VEN, getAtakvargVen)
    yield takeLeading(actionTypes.GET_ASTAK_SAT, getAtakvargSat)
    yield takeLeading(actionTypes.GET_ASTAK_ASC, getAtakvargAce)
    yield takeLeading(actionTypes.GET_ASTAK_MER, getAtakvargmer)
    //click match
    yield takeLeading(actionTypes.GET_GUN_DATA, getAtakGunmilan)
    yield takeLeading(actionTypes.VIEW_KUNDLI_FROM_KUNDLI_MATCHING, viewKundliFromKundliMatching)
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_REPORT, getKundliMatchingReport)
    yield takeLeading(actionTypes.GET_ASTKOOT_DOSA, getAtakDosa)
    yield takeLeading(actionTypes.GET_MATCH_MAGLIK, getMaglidos)
    yield takeLeading(actionTypes.GET_MATCH_CONCLUSION, getMaatchcon)
    //pachacng
    yield takeLeading(actionTypes.GET_PANCHA_DATA, getPachangData)
    yield takeLeading(actionTypes.GET_MUHURAT_DATA, getMuhuratData)
    yield takeLeading(actionTypes.GET_DURMUHURAT_DATA, getDurMuhuratData)
    yield takeLeading(actionTypes.GET_YOG_DATA, getYogdata)





























    // yield takeLeading(actionTypes.GET_KUNDLI_BIRTH_DETAILS, getKundliBirthDetails)
    // yield takeLeading(actionTypes.GET_PLANET_DATA, getPlanetData)
    // yield takeLeading(actionTypes.GET_KP_PLANET_DATA, getKpPlanetData)
    // yield takeLeading(actionTypes.GET_KP_HOUSE_CUPS_DATA, getKpHouseCupsData)
    // yield takeLeading(actionTypes.GET_KUNDLI_CHART_DATA, getKundliChart)
    // yield takeLeading(actionTypes.GET_KUNDLI_CHARTS_IMAGE, getChartImage)
    // yield takeLeading(actionTypes.GET_KUNDLI_MAJOR_DASHA, getKundliMajorDasha)
    // yield takeLeading(actionTypes.GET_KUNDLI_SUB_V_DASHA, getKundliSubVDasha)
    // yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_V_DASHA, getKundliSubSubVDasha)
    // yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_SUB_V_DASHA, getKundliSubSubSubVDasha)
    // yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA, getKundliSubSubSubSubVDasha)
    // yield takeLeading(actionTypes.GET_HOUSE_REPORTS, getKundliHouseReports)
    // yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_REPORT, getKundliMatchingReport)
    // yield takeLeading(actionTypes.VIEW_KUNDLI_FROM_KUNDLI_MATCHING, viewKundliFromKundliMatching)
    // yield takeLeading(actionTypes.GET_RASHI_REPORTS, RashiReportData);
    // yield takeLeading(actionTypes.GET_ASTAK_REPORTS, AstakVargaData);
    // yield takeLeading(actionTypes.GET_SARVA_REPORTS, SarVargaData);
    // yield takeLeading(actionTypes.GET_ASCEDENT_REPORTS, AscendantData);
    // yield takeLeading(actionTypes.GET_BASIC_PANCHANGE, BasicPanchangData);
    // yield takeLeading(actionTypes.GET_NUMERO_REPORT, NumerologyData)
    // yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS, getAsstkoota);
    // yield takeLeading(actionTypes.GET_BASIC_ASTRO_POINTS, getMatchBasicAstro);
    // yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_DSHKOOT_POINTS, getDaskoota);
    // yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_CONCLUSION_POINTS, getMatchConclusion);
    // yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_REPORT_POINTS, getMatchReport);
    // yield takeLeading(actionTypes.GET_ASCEDENT_MATCHING_REPORTS, MatchingAscendantData);
    // yield takeLeading(actionTypes.GET_KUNDLI_D7_CHARTS, getSaptmashaChart);
    // yield takeLeading(actionTypes.GET_KUNDLI_D9_CHARTS, getNavmashaChart)


}