import React  from 'react'
import { Button } from '@mui/material'
export default function Auth() {


    return (
        <div className="auth">
            
        <center>
        <h2 style={{"color":"white"}} >  LDAP BASED PRINTING</h2>
        </center>
           <br/>
           <Button variant='contained' color="primary"    href="https://gymkhana.iitb.ac.in/profiles/oauth/authorize/?client_id=bsvKH9AqOUkDJIesV34cYlsseocAZGhc9kW88Lz1&response_type=code&scope=basic profile picture secondary_emails ldap program insti_address">
               sign in with sso
           </Button >
       
      <div  style={{"position":"absolute" ,bottom:"10px" ,color:"white !important"}}>
      <center>
<span  style={{color:"white"}}>      {"Developed by "}     ITC with ❤️
</span>
      <br/>
     <small><span style={{color:"white"}}> </span></small>
      </center>
      </div>
        </div>
    )
}
