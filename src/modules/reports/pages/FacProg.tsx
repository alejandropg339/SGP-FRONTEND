import { useState, useEffect } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import { setRequest, repNames, filterApi, filterData, reportApi } from '../services/loadData';
import { useLocation } from 'react-router-dom';

//Funcionalidad lista
//Pendiente limpieza y reciclaje


function FacProg() {
    let request = {};
    const getFilePluginInstance = getFilePlugin();
    const { Download } = getFilePluginInstance;
    const [facultad, setFacultad] = useState([]);
    const [programa, setPrograma] = useState([]);
    const [statusF, setStatusF] = useState("");
    const [statusP, setStatusP] = useState("");
    const [isLoading, setLoading] = useState(true);

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
            setLoading(false);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const fetchProgramaData = async (facultad: any) => {
        try {
            request = {
                facultad
            }
            const result = await fetch(filterApi + filterData["programa"], {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            const parsedResponse = await result.json();
            setPrograma(parsedResponse);
        } catch (error) {
            console.log("Error", error);
        }
    }

    const fetchPdfData = async () => {
        try {
            setLoading(true);
            request = {
                dato: statusP,
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
        await fetchProgramaData(event.target.value);
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
                <select id="programa"
                    value={statusP}
                    onChange={(e) => setStatusP(e.target.value)}
                    className='select-general'
                >
                    <option value="0">--Programa--</option>
                    {programa.length > 0 && (
                        <>
                            {programa.map((item: any) => (
                                <option value={item.id} key={item.id}>{item.nombre}</option>
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
                    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js'>
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

export default FacProg;