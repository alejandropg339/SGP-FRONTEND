const filterApi = import.meta.env.VITE_FILTER_API;
const reportApi = import.meta.env.VITE_REPORT_API;
const getReportApi = import.meta.env.VITE_GET_REPORT_API;
const signApi = import.meta.env.VITE_GET_SIGN_API;

function setRequest(url:string) {
    try {
        let parse = JSON.stringify(url);
        let temp = JSON.parse(parse);
        parse = getReportApi+temp.nombreDocumento;
        return parse;
    } catch (error) {
        console.log("Error on setRequest", error);
    }
}

const repNames:any = {
    "0": "Datos básicos Semilleros",
    "1": "Integrantes activos Semilleros",
    "2": "Producción Semilleros",
    "3": "Participación en eventos Semilleros",
    "4": "Participación en convocatorias Semilleros",
    "5": "Proyectos en convocatorias abiertas Semilleros",
    "6": "Proyectos activos Semilleros",
    "7": "Proyectos finalizados Semilleros",
    "8": "Investigadores en formación Semilleros",
    "9": "Uso de presupuesto Semilleros",
    "10": "Producción GI",
    "11": "Integrantes activos GI",
    "12": "Datos básicos GI",
    "13": "Participación en eventos GI",
    "14": "Participación en convocatorias GI",
    "15": "Proyectos en convocatorias abiertas GI",
    "16": "Proyectos activos GI",
    "17": "Proyectos finalizados GI",
    "18": "Investigadores en formación",
    "19": "Uso de presupuesto GI",
    "20": "Semilleros en un programa",
    "21": "Grupos de investigación en un programa",
    "22": "Información de un proyecto",
    "23": "Actividad en un periodo Semilleros",
    "24": "Actividad en un periodo GI",
    "25": "Uso de presupuesto en periodo Semilleros",
    "26": "Uso de presupuesto en periodo GI"
};

const filterData:any ={
    "facultad": "/facultad",
    "gi": "/facultad/gi",
    "semillero": "/facultad/gi/semillero",
    "proyecto": "/facultad/gi/semillero/proyecto",
    "programa": "/facultad/programa",
    "anios": "/anios"
}




export {setRequest, repNames, filterData, filterApi, reportApi, signApi};