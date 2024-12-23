import { types } from '@babel/core'
import * as actionTypes from '../actionTypes'

export const createKundli = payload => ({
    type: actionTypes.CREATE_KUNDLI,
    payload
})

export const resetKundliData = payload => ({
    type: actionTypes.RESET_KUNDLI_DATA,
    payload
})

export const getAllKundli = payload => ({
    type: actionTypes.GET_ALL_KUNDLI,
    payload
})

export const setAllKundli = payload => ({
    type: actionTypes.SET_ALL_KUNDLI,
    payload
})

export const setAllMasterKundli = payload => ({
    type: actionTypes.SET_ALL_MASTRER_KUNDLI,
    payload
})

export const deleteKundli = payload => ({
    type: actionTypes.DELETE_KUNDLI,
    payload
})

export const getKundliData = payload => ({
    type: actionTypes.GET_KUNDLI_DATA,
    payload
})

export const setKundliId = payload => ({
    type: actionTypes.SET_KUNDLI_ID,
    payload
})

export const getKundliBirthDetails = payload => ({
    type: actionTypes.GET_KUNDLI_BIRTH_DETAILS,
    payload
})

export const setKundliBirthDetails = payload => ({
    type: actionTypes.SET_KUNDLI_BIRTH_DETAILS,
    payload
})

export const getKundliChartData = payload => ({
    type: actionTypes.GET_KUNDLI_CHART_DATA,
    payload
})
export const getKundliChartimage =payload => ({
    type: actionTypes.GET_KUNDLI_CHARTS_IMAGE,
    payload
})
export const setKundliChartimage =payload => ({
    type: actionTypes.SET_KUNDLI_CHARTS_IMAGE,
    payload
})

export const setKundliCharts = payload => ({
    type: actionTypes.SET_KUNDLI_CHARTS,
    payload
})

export const setKundliBasicDetails = payload => ({
    type: actionTypes.SET_KUNDLI_BASIC_DETAILS,
    payload
})

export const setPlanetData = payload => ({
    type: actionTypes.SET_PLANET_DATA,
    payload
})

export const getPlanetData = payload => ({
    type: actionTypes.GET_PLANET_DATA,
    payload
})

export const setKpPlanetData = payload => ({
    type: actionTypes.SET_KP_PLANET_DATA,
    payload
})

export const getKpPlanetData = payload => ({
    type: actionTypes.GET_KP_PLANET_DATA,
    payload
})

export const setKpHouseCupsData = payload => ({
    type: actionTypes.SET_KP_HOUSE_CUPS_DATA,
    payload
})

export const getKpHouseCupsData = payload => ({
    type: actionTypes.GET_KP_HOUSE_CUPS_DATA,
    payload
})

export const getKundliMajorDasha = payload => ({
    type: actionTypes.GET_KUNDLI_MAJOR_DASHA,
    payload
})

export const setKundliMajorDasha = payload => ({
    type: actionTypes.SET_KUNDLI_MAJOR_DASHA,
    payload
})

export const getKundliSubVDasha = payload => ({
    type: actionTypes.GET_KUNDLI_SUB_V_DASHA,
    payload
})

export const setKundliSubVDasha = payload => ({
    type: actionTypes.SET_KUNDLI_SUB_V_DASHA,
    payload
})

export const setKundliDashaVisible = payload => ({
    type: actionTypes.SET_KUNDLI_DAHSA_VISIBLE,
    payload
})

export const setKundliSubSubVDasha = payload => ({
    type: actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA,
    payload
})

export const getKundliSubSubVDasha = payload => ({
    type: actionTypes.GET_KUNDLI_SUB_SUB_V_DASHA,
    payload
})

export const setKundliDashaPath = payload => ({
    type: actionTypes.SET_KUNDLI_DASHA_PATH,
    payload
})

export const setKundliSubSubSubVDasha = payload => ({
    type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA,
    payload
})

export const getKundliSubSubSubVDasha = payload => ({
    type: actionTypes.GET_KUNDLI_SUB_SUB_SUB_V_DASHA,
    payload
})
export const setKundliSubSubSubSubVDasha = payload => ({
    type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA,
    payload
})

export const getKundliSubSubSubSubVDasha = payload => ({
    type: actionTypes.GET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA,
    payload
})

export const setHouseReports = payload => ({
    type: actionTypes.SET_HOUSE_REPORTS,
    payload
})

export const getHouseReports = payload => ({
    type: actionTypes.GET_HOUSE_REPORTS,
    payload
})

export const setMaleKundliData = payload => ({
    type: actionTypes.SET_MALE_KUNDLI_DATA,
    payload
})

export const setFemaleKundliData = payload => ({
    type: actionTypes.SET_FEMALE_KUNDLI_DATA,
    payload
})

export const getKundliMatchingReport = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_REPORT,
    payload
})

export const getKundliMatchingAshtakootPoints = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS,
    payload
})

export const setKundliMatchingAshtakootPoints = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS,
    payload
})
 export const getMatchBasicAstro = payload => ({
    type: actionTypes.GET_BASIC_ASTRO_POINTS,
    payload
 })
 export const setMatchBasicAstro = paylod => ({
    type: actionTypes.SET_BASIC_ASTRO_POINTS,
    paylod
 })

 //////
 export const getDaskootapoint = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_DSHKOOT_POINTS,
    payload
 })
 export const setDaskootapoint = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_DSHKOOT_POINTS,
    payload
 })

 export const getMatchConclusionpoint = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_CONCLUSION_POINTS,
    payload
 })

 export const setMatchConclusionpoint = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_CONCLUSION_POINTS,
    payload
 })
 export const getMatchReport = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_REPORT_POINTS,
    payload
 })
 export const setMatchReport = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_REPORT_POINTS,
    payload
 })

///
export const viewKundliFromKundliMatching = payload => ({
    type: actionTypes.VIEW_KUNDLI_FROM_KUNDLI_MATCHING,
    payload,
})

export const setRashiReports = payload => ({
    type: actionTypes.SET_RASHI_REPORTS,
    payload
})

export const getRashiReports = payload => ({
    type: actionTypes.GET_RASHI_REPORTS,
    payload
})

export const getAstakReports = payload => ({
    type: actionTypes.GET_ASTAK_REPORTS,
    payload
})
export const setAstakReports = payload => ({
    type: actionTypes.SET_ASTAK_REPORTS,
    payload
})
export const getSarvaReports = payload => ({
    type: actionTypes.GET_SARVA_REPORTS,
    payload
})

export const getAscedentReport = payload => ({
    type: actionTypes.GET_ASCEDENT_REPORTS,
    payload
})

export const getMatchAscedentReport = payload => ({
    type: actionTypes.GET_ASCEDENT_MATCHING_REPORTS,
    payload
})
export const setMatchAscedentReport = payload => ({
    type: actionTypes.SET_ASCEDENT_MATCHING_REPORTS,
    payload
})
 
export const getbasicpanchange = payload => ({
    type: actionTypes.GET_BASIC_PANCHANGE,
    payload
})

export const getnumero = payload => ({
    type: actionTypes.GET_NUMERO_REPORT,
    payload
})

export const getSaptmashaChart = payload => ({
    type : actionTypes.GET_KUNDLI_D7_CHARTS,
    payload
})

export const getNavmashaChart = payload => ({
    type : actionTypes.GET_KUNDLI_D9_CHARTS,
    payload
})



/////kundli click
export const getlaganchart = paylod => ({
    type : actionTypes.GET_LAGAN_CHART,
    paylod
})
export const getmoonchart = payload => ({
    type : actionTypes.GET_MOON_CHART,
    payload
})
export const getPlanetStatus = payload => ({
    type : actionTypes.GET_PLANET_STATUS,
    payload
})
export const getavakhadachakra = payload => ({
    type : actionTypes.GET_AVAKHADA_CHAKRA,
    payload
})
export const getghatchakra = payload => ({
    type :  actionTypes.GET_GHAT_CHAKRA,
    payload
})
export const getsarvadata = payload => ({
    type :  actionTypes.GET_SARVA_DATA,
    payload
})
export const getKalsarpdata = payload => ({
    type : actionTypes.GET_KALSARP_YOG,
    payload
})
export const getKalsarpramedies = payload => ({
    type : actionTypes.GET_KALSARP_REMIDIES,
    payload
})
export const getManglik = payload => ({
    type : actionTypes.GET_MANGLIK_YOG,
    payload
})
export const getsadesati = payload => ({
    type : actionTypes.GET_SADESATI_REPORT,
    payload
})
export const getsadesatiRemedies = payload => ({
    type : actionTypes.GET_SADESARI_REMEDIES,
    payload
})

export const getBasicStone = payload => ({
    type : actionTypes.GET_BASIC_STONE,
    payload
})
export const getHealthStone = payload => ({
    type : actionTypes.GET_HEALTH_STONE,
    payload
})
export const getEducation = payload => ({
    type : actionTypes.GET_EDUCATION_STONE,
    payload
})
export const getdaan = payload => ({
    type : actionTypes.GET_DAAN_STONE,
    payload
})
export const getyatra = payload => ({
    type : actionTypes.GET_YATRA_DATA,
    payload
})
export const getMantra = payload => ({
    type : actionTypes.GET_MANTRA_DATA,
    payload
})
export const getRurda = payload => ({
    type : actionTypes.GET_RUDRA_DATA,
    payload
})
export const getvismahadas = payload => ({
    type : actionTypes.GET_VISMAHADASHA_DATA,
    payload
})
export const getvisantar = payload => ({
    type : actionTypes.GET_VISANTARDASH_DATA,
    payload
})
export const getVispayantar = payload => ({
    type : actionTypes.GET_VISPAYANTAR_DATA,
    payload
})
export const getSukshama = payload => ({
    type : actionTypes.GET_VSISUKSHAMA_DATA,
    payload
})
export const getPratyantra = payload => ({
    type : actionTypes.GET_PRATYANTRADASHA_DATA,
    payload
})
export const setPratyantra = payload => ({
    type : actionTypes.SET_PRATYANTRADASHA_DATA,
    payload
})
export const getDevisionData = payload =>({
    type : actionTypes.GET_KUNDLI_CHART_DATA,
    payload
})

export const getAstakAsc = payload => ({
    type : actionTypes.GET_ASTAK_ASC,
    payload
})

export const getAstaksat = payload => ({
    type : actionTypes.GET_ASTAK_SAT,
    payload
})
export const getAstaksun = payload => ({
    type : actionTypes.GET_ASTAK_SUN,
    payload
})
export const getAstakmars = payload => ({
    type : actionTypes.GET_ASTAK_MARS,
    payload
})
export const getastkmoon = payload => ({
    type : actionTypes.GET_ASTAK_MOON,
    payload
})
export const getastkjup = payload => ({
    type : actionTypes.GET_ASTAK_JUP,
    payload
})
export const getastkmer = payload => ({
    type : actionTypes.GET_ASTAK_MER,
    payload
})
export const getastaven = payload => ({ 
        type : actionTypes.GET_ASTAK_VEN,
        payload
    })
////click match
export const getgundata = payload => ({
    type : actionTypes.GET_GUN_DATA,
    payload
})

export const getastkootdosha = payload => ({
    type : actionTypes.GET_ASTKOOT_DOSA,
    payload
})

export const getmatchmanglik = payload => ({
    type : actionTypes.GET_MATCH_MAGLIK,
    payload
})

export const getmatchconclusion = payload => ({
    type : actionTypes.GET_MATCH_CONCLUSION,
    payload
})

export const getpanchdata = payload => ({
    type : actionTypes.GET_PANCHA_DATA,
    payload
})

export const  getMuhurat = payload => ({
    type : actionTypes.GET_MUHURAT_DATA,
    payload
})

export const getDurmuhurat = payload => ({
    type : actionTypes.GET_DURMUHURAT_DATA,
    payload
})

export const getYog = payload => ({
    type : actionTypes.GET_YOG_DATA,
    payload
})





