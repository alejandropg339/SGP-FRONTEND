import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import { setRequest, repNames, filterData, filterApi, reportApi } from '../services/loadData';

//Funcionalidad lista
//Pendiente reciclaje

function FacGiSem() {
    let request = {};
    const getFilePluginInstance = getFilePlugin();
    const { Download } = getFilePluginInstance;
    const [facultad, setFacultad] = useState([]);
    const [grupo, setGrupo] = useState([]);
    const [semillero, setSemillero] = useState([]);
    const [statusF, setStatusF] = useState("");
    const [statusG, setStatusG] = useState("");
    const [statusS, setStatusS] = useState("");
    const [isLoading, setLoading] = useState(true);

    const localItems:any = JSON.parse(localStorage.getItem("user-data") as any);
    const userId = localItems["state"]["userInfo"]["numberId"];
    const location = useLocation();
    const { reportId } = location.state;

    const [pdfUrl, setPdfUrl] = useState("");

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

    const fetchPdfData = async () => {
        try {
            setLoading(true);
            request = {
                dato: statusS,
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
                    onChange={(e) => setStatusS(e.target.value)}
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

export default FacGiSem;