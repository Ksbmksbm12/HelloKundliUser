
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import * as actionTypes from '../actionTypes'

const initialState = {
    kundliId: null,
    kundliPayloads: null,
    kundliListData: null,
    masterKundliListData: null,
    birthDetailsData: null,
    chartImage: null,
    chartData: null,
    basicDetails: null,
    planetData: null,
    kpPlanetData: null,
    kpHouseCupsData: null,
    dashaVisible: 'MAJOR',
    dashaPath: '',
    majorDashaData: null,
    subVDashaData: null,
    subSubVDashaData: null,
    subSubSubVDashaData: null,
    subSubSubSubVDashaData: null,
    houseReportData: null,
    maleKundliData: null,
    femaleKundliData: null,
    matchingAshtakootPointsData: null,
    kundliRashiReport: null,
    AshtakvargaReport: null,
    SarvaReport: null,
    AscedentReport: null,
    Panchang: null,
    MatchBasicDetails: null,
    BasicAstroMatching: null,
    MatchingReport: null,
    ConclusionReport: null,
    DashKootReport: null,
    MatchAscedentReport: null,
    Saptamanshachart: null,
    Navamanshachart: null,



    laganChart: null,
    moonchart: null,
    planetstatus: null,
    avakhadachakra: null,
    ghaatchakra: null,
    sarvadata: null,
    kalsarpdata: null,
    kalsarpremdies: null,
    manglikyog: null,
    manglikRemedi: null,
    sadesati: null,
    sadesatiRemedies: null,
    basicStone: null,
    healthstone:null,
    educationStone:null,
    daanstone:null,
    yaradata:null,
    mantradata:null,
    rudradata:null,
    vismahadas:null,
    visAntardasha:null,
    visPayantardasha:null,
    vsiSukshama:null,
    getdivision:null,
    AstakAsc:null,
    astalsat:null,
    astasun:null,
    astamars:null,
    astamoon:null,
    astajup:null,
    astamer:null,
    astasat:null,
    astaven:null,
    matchgun:null,
    astkootdosa:null,
    matchmanglik:null,
    matchconlusion:null,
    panchangData:null,
    muhuratData:null,
    durmuhurat:null,
    yogdata:null,
    pratyantraDasha:null,



}

const kundli = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_KUNDLI_PAYLOADS:
            return {
                ...state,
                kundliPayloads: payload
            }
        case actionTypes.RESET_KUNDLI_DATA:
            return {
                ...initialState,
                kundliListData: state.kundliListData,
                maleKundliData: state.maleKundliData,
                femaleKundliData: state.femaleKundliData,
                matchingAshtakootPointsData: state.matchingAshtakootPointsData
            }
        case actionTypes.SET_KUNDLI_ID:
            return {
                ...state,
                kundliId: payload
            }
        case actionTypes.SET_ALL_KUNDLI:
            return {
                ...state,
                kundliListData: payload,
            }
        case actionTypes.SET_ALL_MASTRER_KUNDLI:
            return {
                ...state,
                masterKundliListData: payload,
            }


        case actionTypes.SET_KUNDLI_BIRTH_DETAILS:
            return {
                ...state,
                birthDetailsData: payload
            }
        case actionTypes.SET_KUNDLI_CHARTS_IMAGE:
            return {
                ...state,
                chartImage: payload
            }
        // case actionTypes.SET_KUNDLI_CHARTS:
        //     return {
        //         ...state,
        //         chartData: payload
        //     }
        case actionTypes.SET_KUNDLI_BASIC_DETAILS:
            return {
                ...state,
                basicDetails: payload
            }
        case actionTypes.SET_PLANET_DATA:
            return {
                ...state,
                planetData: payload
            }
        case actionTypes.SET_KP_PLANET_DATA:
            return {
                ...state,
                kpPlanetData: payload
            }
        case actionTypes.SET_KP_HOUSE_CUPS_DATA:
            return {
                ...state,
                kpHouseCupsData: payload
            }
        case actionTypes.SET_KUNDLI_MAJOR_DASHA:
            return {
                ...state,
                majorDashaData: payload
            }
        case actionTypes.SET_KUNDLI_DAHSA_VISIBLE:
            return {
                ...state,
                dashaVisible: payload,
            }
        case actionTypes.SET_KUNDLI_DASHA_PATH:
            return {
                ...state,
                dashaPath: payload,
            }
        case actionTypes.SET_KUNDLI_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'ANTAR',
                subVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'PRATYANTAR',
                subSubVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'SOOKSHMA',
                subSubSubVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'PRAN',
                subSubSubSubVDashaData: payload
            }
        case actionTypes.SET_HOUSE_REPORTS:
            return {
                ...state,
                houseReportData: payload
            }
        case actionTypes.SET_MALE_KUNDLI_DATA:
            return {
                ...state,
                maleKundliData: payload
            }
        case actionTypes.SET_FEMALE_KUNDLI_DATA:
            return {
                ...state,
                femaleKundliData: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS:
            return {
                ...state,
                matchingAshtakootPointsData: payload
            }
        case actionTypes.SET_RASHI_REPORTS:
            return {
                ...state,
                kundliRashiReport: payload
            }
        case actionTypes.SET_ASTAK_REPORTS:
            return {
                ...state,
                AshtakvargaReport: payload
            }
        case actionTypes.SET_SARVA_REPORTS:
            return {
                ...state,
                SarvaReport: payload
            }
        case actionTypes.SET_ASCEDENT_REPORTS:
            return {
                ...state,
                AscedentReport: payload
            }
        case actionTypes.SET_BASIC_PANCHANGE:
            return {
                ...state,
                Panchang: payload
            }
        case actionTypes.SET_KUNDLI_BASIC_DETAILS_MATCHING:
            return {
                ...state,
                MatchBasicDetails: payload
            }
        case actionTypes.SET_BASIC_ASTRO_POINTS:
            return {
                ...state,
                BasicAstroMatching: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_REPORT_POINTS:
            return {
                ...state,
                MatchingReport: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_CONCLUSION_POINTS:
            return {
                ...state,
                ConclusionReport: payload
            }
        case actionTypes.SET_KUNDLI_MATCHING_DSHKOOT_POINTS:
            return {
                ...state,
                DashKootReport: payload
            }
        case actionTypes.SET_ASCEDENT_MATCHING_REPORTS:
            return {
                ...state,
                MatchAscedentReport: payload
            }
        case actionTypes.SET_KUNDLI_D7_CHARTS:
            return {
                ...state,
                Saptamanshachart: payload
            }
        case actionTypes.SET_KUNDLI_D9_CHARTS:

            return {
                ...state,
                Navamanshachart: payload
            }

        //KUNCLI.CLICK
        case actionTypes.SET_LAGAN_CHART:

            return {
                ...state,
                laganChart: payload
            }
        case actionTypes.SET_MOON_CHART:
            return {
                ...state,
                moonchart: payload
            }
        case actionTypes.SET_PLANET_STATUS:
            return {
                ...state,
                planetstatus: payload
            }
        case actionTypes.SET_AVAKHADA_CHAKRA:
            return {
                ...state,
                avakhadachakra: payload
            }
        case actionTypes.SET_GHAT_CHAKRA:
            return {
                ...state,
                ghaatchakra: payload
            }
        case actionTypes.SET_SARVA_DATA:
            return {
                ...state,
                sarvadata: payload
            }
        case actionTypes.SET_KALSARP_YOG:
            return {
                ...state,
                kalsarpdata: payload
            }
        case actionTypes.SET_KALSARP_REMIDIES:
            return {
                ...state,
                kalsarpremdies: payload
            }
        case actionTypes.SET_MANGLIK_YOG:
            return {
                ...state,
                manglikyog: payload
            }
        case actionTypes.SET_MAGLIK_REMEDIES:
            return {
                ...state,
                manglikRemedi: payload
            }
        case actionTypes.SET_SADESATI_REPORT:
            return {
                ...state,
                sadesati: payload
            }
        case actionTypes.SET_SADESARI_REMEDIES:
            return {
                ...state,
                sadesatiRemedies: payload
            }
        case actionTypes.SET_BASIC_STONE:
            return{
                ...state,
                basicStone:payload
            }
        case actionTypes.SET_HEALTH_STONE:
            return{
                ...state,
                healthstone:payload
            }
        case actionTypes.SET_EDUCATION_STONE:
            return{
                ...state,
                educationStone:payload
            }
        case actionTypes.SET_DAAN_STONE:
            return{
                ...state,
                daanstone:payload
            }
        case actionTypes.SET_YATRA_DATA:
            return{
                ...state,
                yaradata:payload
            }
        case actionTypes.SET_MANTRA_DATA:
            return{
                ...state,
                mantradata:payload
            }
        case actionTypes.SET_RUDRA_DATA:
            return{
                ...state,
                rudradata:payload
            }
        case actionTypes.SET_VISMAHADASHA_DATA:
            return{
                ...state,
                vismahadas:payload
            }
        case actionTypes.SET_VISANTARDASH_DATA:
            return{
                ...state,
                visAntardasha:payload
            }
        case actionTypes.SET_VISPAYANTAR_DATA:
            return{
                ...state,
                visPayantardasha:payload
            }
        case actionTypes.SET_VSISUKSHAMA_DATA:
            return{
                ...state,
                vsiSukshama:payload
            }
        case actionTypes.SET_KUNDLI_CHARTS:
            return{
                ...state,
                getdivision:payload
            }
        case actionTypes.SET_ASTAK_ASC:
            return{
                ...state,
                AstakAsc:payload
            }
        case actionTypes.SET_ASTAK_SAT:
            return{
                ...state,
                astalsat:payload
            }
        case actionTypes.SET_ASTAK_SUN:
            return{
                ...state,
                astasun:payload
            }
        case actionTypes.SET_ASTAK_MARS:
            return{
                ...state,
                astamars:payload
            }
        case actionTypes.SET_ASTAK_MOON:
            return{
                ...state,
                astamoon:payload
            }
        case actionTypes.SET_ASTAK_JUP:
            return{
                ...state,
                astajup:payload
            }
        case actionTypes.SET_ASTAK_MER:
            return{
                ...state,
                astamer:payload
            }
        case actionTypes.SET_ASTAK_SAT:
            return{
                ...state,
                astasat:payload
            }
        case actionTypes.SET_ASTAK_VEN:
            return{
                ...state,
                astaven:payload
            }
        case actionTypes.SET_GUN_DATA:
            return{
                ...state,
                matchgun:payload
            }
        case actionTypes.SET_ASTKOOT_DOSA:
            return{
                ...state,
                astkootdosa:payload
            }
        case actionTypes.SET_MATCH_MAGLIK:
            return{
                ...state,
                matchmanglik:payload
            }
        case actionTypes.SET_MATCH_CONCLUSION:
            return{
                ...state,
                matchconlusion:payload
            }
        case actionTypes.SET_PANCHA_DATA:
            return{
                ...state,
                panchangData:payload
            }
        case actionTypes.SET_MUHURAT_DATA:
            return{
                ...state,
                muhuratData:payload
            }
        case actionTypes.SET_DURMUHURAT_DATA:
            return{
                ...state,
                durmuhurat:payload
            }
        case actionTypes.SET_YOG_DATA:
            return{
                ...state,
                yogdata:payload
            }
            case actionTypes.SET_PRATYANTRADASHA_DATA:
            return{
                ...state,
                pratyantraDasha:payload
            }

        case actionTypes: SET_NUMERO_REPORT
        default: {
            return state;
        }

    }
}

export default kundli;