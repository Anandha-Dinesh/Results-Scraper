import React from "react";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

export default function Form(){
    return(
        <div className="form">
             <form action="/submit" method="POST" name="form" id="form"> 
                <div className="formElements">
                    <input type="file" id="fileupload" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    
                    <label for="fileupload">
                        <UploadFileTwoToneIcon /> &nbsp; Choose a file </label>
                
                    {/* <button type="submit"> START</button> */}
                </div>
                </form>
            
        </div>
    )
}
