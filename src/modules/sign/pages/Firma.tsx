import { useEffect, useState } from "react";
import { useUserStore } from "../../../store/user.store";
import { signApi } from "../../reports/services/loadData";

function UploadAndDisplayImage() {
    const formData = new FormData();
    const localItems = useUserStore();
    const userRole = localItems.userInfo.role;
    const userId = localItems.userInfo.numberId as any;
    const img: any = document.querySelector('input[type="file"]')!;
    const [signUrl, setSignUrl] = useState("");
    const [state, setState] = useState(true);
    const [isLoading, setLoading] = useState(true);

    const saveSign = async (formData: any) => {
        try {
            setLoading(true);
            const result = await fetch(signApi + "archivo/upload", {
                method: "POST",
                body: formData
            });
            const parsedResponse = await result.json();
            alert("Success: " + parsedResponse);
            setLoading(true);
        } catch (error) {
            console.log("Error xd", error);
        }
    }

    const fetchSign = async (id: any) => {
        try {
            setLoading(true);
            const result = await fetch(signApi + "archivo/get/firma/" + id);
            const imageBlob = await result.blob();
            if (result.ok) {
                setState(false);
            } else {
                setState(true);
            }
            const imageURL = URL.createObjectURL(imageBlob);
            setSignUrl(imageURL);
            setLoading(false);
        } catch (error) {
            console.log("Error on fetchSign", error);
        }
    }

    useEffect(() => {
        fetchSign(userId);
    }, [])

    const handleImageInput = (event: any) => {
        setSignUrl(URL.createObjectURL(event.target.files[0]))
    }

    const handleSaveImage = () => {
        formData.append("file", img.files[0]);
        formData.append("usuario", userId);
        saveSign(formData);
    }
    if (userRole == 'SEMILLERISTA' || userRole == 'ESTUDIANTE' || userRole == 'ESTUDIANTE ACTIVO' || userRole == 'ESTUDIANTE INACTIVO') {
        return (
            <>
                <h1>El perfil de su usuario no está autorizado para utilizar esta función</h1>
            </>
        )
    } else {
        return <>
            <div>
                <h1>Firma</h1>
                <br />
                <div className="flex-container-center">
                    <img alt="FIRMA NO REGISTRADA"
                        width={"250px"}
                        src={signUrl} />
                </div>
                <div className="flex-container-center">

                    {state && (
                        <div>
                            <input
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                    handleImageInput(event);
                                }}
                            />
                            <br />
                            <br />
                            <button onClick={handleSaveImage}>Guardar</button>
                        </div>
                    )}
                </div>
                <div>
                    {isLoading && (
                        <div className='loader'></div>
                    )}
                </div>
            </div>
        </>
    }



}

export default UploadAndDisplayImage;