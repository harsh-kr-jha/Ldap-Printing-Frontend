import { Button, Paper } from '@mui/material'
import React ,{useState,useEffect} from 'react'
import MaterialAlert from '../utils/alert';
import  Link  from '@mui/material/Link';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Home() {
    const [file, setFile] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [filename,setFileName]=React.useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        const res = await axios.post('https://itc.gymkhana.iitb.ac.in/printing-api/profile/', { token: localStorage.getItem("userPrinter") });
        setProfile(JSON.parse(res.data.user));
        // console.log(JSON.parse(res.data.user));
    };

    const upload = () => {
        if(!file) {
            setMessage('Please select a file');
            setOpen(true);
            
            
            return;}
            setIsUploading(true);
        const data = new FormData();
        data.append('file', file);
        axios
      .post("/", data, {
        headers: {
          Authorization: `Token ${localStorage.getItem('userPrinter')}`,
          "Content-Type":
            "multipart/form-data ; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
          "Content-Disposition": `form-data; filename=${file.name}`,
        },
      })
      .then((res) => {
        if ((res.status === 200) & res.data.success) {
            setMessage('File uploaded successfully');
            setOpen(true);
          setIsUploading(false);
        } else {
            setMessage('File upload failed');
            setOpen(true);
          setIsUploading(false);
        }
      })
      .catch((error) => {
       setMessage('Error uploading file');
         setOpen(true);
        setIsUploading(false);
      });

      setFile("");
    }

    return (
       <div>
          <center>
          <div className='profile m-5' style={{width:"250px"}}>
           {
           profile ? <>
          
         <Paper elevation={2} className='my-2'>
         <table className="table">
<tbody>
<tr>
 <td><b>
        ldap:
        </b>
    </td>
    <td>
       {profile.email}
    </td>
 </tr>
 
 <tr>
 <td>
     <b>
        Name:
        </b>
    </td>
    <td>
        {profile.first_name} {profile.last_name}
        
    </td>
 </tr>
 <tr>
 <td><b>
        Hostel:
        </b>
    </td>
    <td>
       {profile.hostel_name}
    </td>
 </tr>
 

</tbody>
</table>
         </Paper>
           </> : <CircularProgress/>
         }

           </div>
          </center>
            <div className='container mt-5'>
           {file ? (
                    <small className="mr-2">{file.name.toString()}</small>
                  ) : (
                   <label htmlFor='file'>
                      <Button variant="contained" component="span"   className="mr-2 ">
                    Choose File</Button>
                   </label>
                  )} 

                    <input   accept="*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
               type="file" id="file" hidden />
 {isUploading ? 
                    <CircularProgress color="primary" /> :  <Button onClick={upload} variant="contained" endIcon={<CloudUploadIcon />}>
        Print
      </Button>}
   <span><Link>{filename}</Link></span>


      <MaterialAlert  severity={"info"} message={message} handle={setOpen} open={open} />
        </div>
       </div>
    )
}
