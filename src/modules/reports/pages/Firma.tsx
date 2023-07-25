import { useState } from "react";

const UploadAndDisplayImage = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div>
            <h1>Firma</h1>

            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}

            <br />
            <br />

            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    console.log((event?.target as any).files[0] ?? "");
                    setSelectedImage((event?.target as any).files[0] ?? "");
                }}
            />
        </div>
    );
};

export default UploadAndDisplayImage;