import axios from 'axios';
import React,{useState} from 'react';

function FileUpload(props) {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        if (props.anime_cim==""|| props.anime_tipus==""|| props.anime_leiras=="")
        {
        alert("toltsd ki!!")
        return
        }
        if (!file)
        {alert("Fajl nincs feltöltve!")
        return};
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",
                formData
            );
            console.log(res);

            let bemenet={
                bevitel1:props.anime_cim,
                bevitel2:props.anime_tipus,
                bevitel3:fileName,
                bevitel4:props.anime_leiras,
            }
            fetch('http://localhost:8080/animefelvitel',{
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
       
   
        )
        .then((response) => response.text())
        .then((szoveg) => {
    
        alert(szoveg)

        })




        } catch (ex) {
            console.log(ex);
        }
    };

        return (
            <div className="App">
                <input type="file" onChange={saveFile} />
                <button onClick={uploadFile}>Feltöltés</button>
            </div>
        );
}

export default FileUpload;

