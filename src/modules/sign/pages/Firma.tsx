import { useEffect, useState } from "react";

function UploadAndDisplayImage() {
    const formData = new FormData();
    const localItems:any = JSON.parse(localStorage.getItem("user-data") as any);
    const [userId, setUserId] = useState(localItems["state"]["userInfo"]["numberId"]);
    const img: any = document.querySelector('input[type="file"]')!;
    const [signUrl, setSignUrl] = useState("");
    const [state, setState] = useState(true);

    const saveSign = async (formData: any) => {
        try {
            const result = await fetch("http://localhost:8081/archivo/upload", {
                method: "POST",
                body: formData
            });
            const parsedResponse = await result.json();
            alert("Success: " + parsedResponse);
        } catch (error) {
            console.log("Error xd", error);
        }
    }

    const fetchSign = async (id: any) => {
        try {
            const result = await fetch("http://localhost:8081/archivo/get/firma/" + id);
            const imageBlob = await result.blob();
            if (result.ok) {
                setState(false);
            } else {
                setState(true);
            }
            const imageURL = URL.createObjectURL(imageBlob);
            setSignUrl(imageURL);
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
                        <br/>
                        <button onClick={handleSaveImage}>Guardar</button>
                    </div>
                )}
            </div>
        </div>
    </>


}

export default UploadAndDisplayImage;