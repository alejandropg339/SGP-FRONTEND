function loadJson(data:any, element:any) {
    while (element.options.length > 1) {
        element.remove(1);
    }
    var opt = null;
    data.map((item:any) => {
        opt = document.createElement('option');
        opt.value = item.id;
        if (item.nombre === undefined) {
            opt.innerHTML = item.titulo;
        } else {
            opt.innerHTML = item.nombre;
        }
        element.appendChild(opt);
    })
}

function validateStatus(data:any, status:any, element:any){
    if(status !== null){
        if(status !== undefined){
            loadJson(data,element);
        }

    }
}

function loadGrupo(data:any, status:any) {
    try {
        var gruposInv = document.getElementById("grupoInvestigacion");
        validateStatus(data, status, gruposInv);
    } catch (error) {
        console.log("Error", error);
    }
}

function loadSemillero(data:any, status:any) {
    try {
        var semillero = document.getElementById("semillero");
        validateStatus(data,status,semillero);
        /*
        switch (status) {
            case '3003':
                loadJson(data, semillero);
                break;
            default:
                break;
        }
        */
    } catch (error) {
        console.log("Error", error);
    }
}

function loadPrograma(data:any, status:any) {
    try {
        var programa = document.getElementById("programa");
        validateStatus(data,status,programa);
        /*
        switch (status) {
            case '1001':
                loadJson(data, programa);
                break;
            default:
                break;
        }
        */
    } catch (error) {
        console.log("Error", error);
    }
}

function loadProyecto(data:any, status:any) {
    try {
        var proyecto = document.getElementById("proyecto");
        validateStatus(data,status,proyecto);
        /*
        switch (status) {
            case '4018':
                loadJson(data, proyecto);
                break;
            default:
                break;
        }
        */
    } catch (error) {
        console.log("Error", error);
    }
}

function setRequest(url:string) {
    try {
        let parse = JSON.stringify(url);
        let temp = JSON.parse(parse);
        parse = "http://localhost:8081/archivo/get/reporte/"+temp.nombreDocumento;
        return parse;
    } catch (error) {
        console.log("Error on setRequest", error);
    }
}

export { loadGrupo, loadSemillero, loadPrograma, loadProyecto, setRequest};