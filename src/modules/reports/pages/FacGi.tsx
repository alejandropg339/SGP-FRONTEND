import { useState, useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import { setRequest, repNames, filterApi, filterData, reportApi } from '../services/loadData';
import { useLocation } from 'react-router-dom';

//Funcionalidad lista
//Pendiente reciclaje

function FacGi() {
    let request = {};
    const getFilePluginInstance = getFilePlugin();
    const { Download } = getFilePluginInstance;
    const [facultad, setFacultad] = useState([]);
    const [grupo, setGrupo] = useState([]);
    const [statusF, setStatusF] = useState("");
    const [statusG, setStatusG] = useState("");

    const localItems:any = JSON.parse(localStorage.getItem("user-data") as any);
    const [userId, setUserId] = useState(localItems["state"]["userInfo"]["numberId"]);
    const location = useLocation();
    const { reportId } = location.state;

    const [pdfUrl, setPdfUrl] = useState("");

    const fetchFacultadData = async () => {
        try {
            const result = await fetch(filterApi + filterData["facultad"]);
            const parsedResponse = await result.json();
            setFacultad(parsedResponse);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const fetchGrupoData = async (facultad: any) => {
        try {
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
        } catch (error) {
            console.log("Error", error);
        }
    }

    const fetchPdfData = async () => {
        try {
            request = {
                dato: statusG,
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
            let url: string = setRequest(parsedResponse) as string;
            setPdfUrl(url);
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
                    onChange={(e) => setStatusG(e.target.value)}
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
                <button type="button" onClick={fetchPdfData}>Generar reporte</button>
            </div>

        </div>
        <div>
            <div className="pdf-section">
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js'>
                    {pdfUrl && (
                        <Viewer fileUrl={pdfUrl} plugins={[getFilePluginInstance]} />
                    )}
                </Worker>
            </div>
        </div>
        <div className="flex-container-center">
            <div role="button" className="download-button">
                <Download />
            </div>
        </div>

    </>

}

export default FacGi;