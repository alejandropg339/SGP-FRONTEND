import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import { setRequest, repNames, filterData, filterApi, reportApi } from '../services/loadData';
import '../styles/reports.scss'

//Funcionalidad lista
//Pendiente limpieza y reciclaje

/*
Funcion de despliegue de pantalla
*/

function FacGISemProy() {
    /*
    Funciones de carga de datos desde la API
    */
    let request = {};
    const getFilePluginInstance = getFilePlugin();
    const { Download } = getFilePluginInstance;
    const [pdfUrl, setPdfUrl] = useState("");
    const localItems:any = JSON.parse(localStorage.getItem("user-data") as any);
    const userId = localItems["state"]["userInfo"]["numberId"];
    const location = useLocation();
    const { reportId } = location.state;
    const [isLoading, setLoading] = useState(true);

    const [facultad, setFacultad] = useState([]);
    const [grupo, setGrupo] = useState([]);
    const [semillero, setSemillero] = useState([]);
    const [proyecto, setProyecto] = useState([]);

    const [statusF, setStatusF] = useState<any>([]);
    const [statusG, setStatusG] = useState<any>([]);
    const [statusS, setStatusS] = useState<any>([]);
    const [statusPj, setStatusPj] = useState<any>([]);


    const fetchPdfData = async () => {
        try {
            setLoading(true);
            request = {
                dato: statusPj,
                reporte: reportId,
                usuario: userId
            }
            const result = await fetch(reportApi, {
                method: "POST",

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            const parsedResponse = await result.json();
            const url: string = setRequest(parsedResponse) as string;
            setPdfUrl(url);
            setLoading(false);
        } catch (error) {
            console.log("Error xd", error);
        }
    }

    const fetchFacultadData = async () => {
        try {
            const result = await fetch(filterApi + filterData["facultad"]);
            const parsedResponse = await result.json();
            setFacultad(parsedResponse);
            setLoading(false);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const fetchGrupoData = async (facultad: any) => {
        try {
            setLoading(true);
            request = {
                facultad
            }
            const result = await fetch(filterApi + filterData["gi"], {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            const parsedResponse = await result.json();
            setGrupo(parsedResponse);
            setLoading(false);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const fetchSemilleroData = async (gi: any) => {
        try {
            setLoading(true);
            request = {
                gi
            }
            const result = await fetch(filterApi + filterData["semillero"], {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            const parsedResponse = await result.json();
            setSemillero(parsedResponse);
            setLoading(false);
        } catch (error) {
            console.log("ªªªªªªErrorªªªªªª", error);
        }
    }

    const fetchProyectoData = async (semillero: any) => {
        try {
            setLoading(true);
            request = {
                semillero
            }
            const result = await fetch(filterApi + filterData["proyecto"], {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            const parsedResponse = await result.json();
            setProyecto(parsedResponse);
            setLoading(false);
        } catch (error) {
            console.log("ªªªªªªErrorªªªªªª", error);
        }
    }

    useEffect(() => {
        fetchFacultadData();
    }, []);

    const handleFacultySelected = async (event: any) => {
        setStatusF(event.target.value);
        await fetchGrupoData(event.target.value);
    }

    const handleGISelected = async (event: any) => {
        setStatusG(event.target.value);
        await fetchSemilleroData(event.target.value);
    }

    const handleSemSelected = async (event: any) => {
        setStatusS(event.target.value);
        await fetchProyectoData(event.target.value);
    }

    /*
    Funcion de renderizado
    */
    return <>
        <div>
            <h1>{repNames[reportId]}</h1>
        </div>
        <div className="flex-container">
            <div>
                <select id="facultad"
                    value={statusF}
                    onChange={async (e) => await handleFacultySelected(e)}
                    className='select-general'
                >
                    <option value="0">--Facultad--</option>
                    {facultad.length > 0 && (
                        <>
                            {facultad.map((facu: any) => (
                                <option value={facu.id} key={facu.id}>{facu.nombre}</option>
                            ))}
                        </>
                    )}
                </select>
            </div>
            <div>
                <select id="grupoInvestigacion"
                    value={statusG}
                    onChange={async (e) => await handleGISelected(e)}
                    className='select-general'
                >
                    <option value="0">--Grupo--</option>
                    {grupo.length > 0 && (
                        <>
                            {grupo.map((group: any) => (
                                <option value={group.id} key={group.id}>{group.nombre}</option>
                            ))}
                        </>
                    )}
                </select>
            </div>

            <div>
                <select id="semillero"
                    value={statusS}
                    onChange={async (e) => await handleSemSelected(e)}
                    className='select-general'
                >
                    <option value="0">--Semillero--</option>
                    {semillero.length > 0 && (
                        <>
                            {semillero.map((sem: any) => (
                                <option value={sem.id} key={sem.id}>{sem.nombre}</option>
                            ))}
                        </>
                    )}
                </select>
            </div>
            <div>
                <select id="proyecto"
                    value={statusPj}
                    onChange={(e) => setStatusPj(e.target.value)}
                    className='select-general'
                >
                    <option value="0">--Proyecto--</option>
                    {proyecto.length > 0 && (
                        <>
                            {proyecto.map((item: any) => (
                                <option value={item.id} key={item.id}>{item.titulo}</option>
                            ))}
                        </>
                    )}
                </select>
            </div>
            <div>
                <button type="button" onClick={fetchPdfData}>Generar reporte</button>
            </div>
        </div>
        <div>
            {pdfUrl && (
                <div className="pdf-section">
                    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.9.179/build/pdf.worker.min.js'>
                        {pdfUrl && (
                            <Viewer fileUrl={pdfUrl} plugins={[getFilePluginInstance]} />
                        )}
                    </Worker>
                    <div className="flex-container-center">
                        <div role="button" className="download-button">
                            <Download />
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div>
            {isLoading && (
                <div className='loader'></div>
            )}
        </div>

    </>

}

export default FacGISemProy;
