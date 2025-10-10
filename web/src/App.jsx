import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
//import Alert from '@mui/material/Alert';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  useSearchParams,
  useNavigate
} from "react-router-dom";

//${variable} can :w
//be used inside of navigate in order to add url parameters


const website = 'LOCATION';


export function navigateEncrypt(){
  let navigate = useNavigate();
  navigate("/encrypt")
}

export function navigateDecrypt(){
  let navigate = useNavigate();
  navigate("/decrypt")
}

export function navigateLogs(){
  let navigate = useNavigate();
  navigate("/logs")
}

export function encryptButton(key,data){
  output = axios.post(website+"api/v1/encrypt",
    {
      "key":key,
      "data":data
})
//put output into its own box
  document.getElementById("textEncrypt").innerHTML = output.data
}

export function decryptButton(key,data){
  output = axios.post(website+"api/v1/decrypt",
    {
      "key":key,
      "data":data
    }
  )
  document.getElementById("textDecrypt").innerHTML = output.data
}

export function logsButton(size,offset){
  let navigate = useNavigate();
  navigate("logs?size=${size}&offset=${offset}")
}

export function logs(){
  const [searchParams] = useSearchParams()
  const size = searchParams.get("size")
  const offset = searchParams.get("offset")
  output = axios.post(website+"/api/v1/logs",
    {
      "size":size,
      "offset":offset
    }
  )
  return(
    <>
      //put the logs here
    </>
  )
}

export function encryptPage(){
  return(
	  <>
    <h1>Encrypt Data:</h1>
    <center>
	  <label>
	  Key: <input name="key"></input>
	  </label>
	  <label>
	  Data: <input name="data"></input>
	  </label>
	  </center>
	  <center>
	  <button onClick={()=>encryptButton(key,data)}/> Encrypt data 
	  </center>
	  <center>
	    <div id="textEncrypt"></div>
	  </center>
	  </>
  )
}

export function decryptPage(){
  return(
    <>
  <h1>Decrypt Data:</h1>
	  <center>
	  <label>
	  Key: <input name="key"></input>
	  </label>
	  <label>
	  Data: <input name="data"></input>
	  </label>
	  </center>
	  <center>
	  <button onClick={()=>decryptButton(key,data)}/>Decrypt data
	  </center>
	  <center>
	  <div id="textDecrypt"></div>
	  </center>
	  </>

  )


}

export function logsPage(){
  return(
    <>
    <center>
    <label>
    Size: <input name="size"></input>
	  </label>
	  <label>
	  Offset: <input name="offset"></input>
	  </label>
	  </center>
	  <center>
	  <button onClick={logsButton}/>
	  </center>
	  <logs/>
	  </>
  )
}


function App() {
  const [count, setCount] = useState(0)

  return (
	<>
	  <h1>SecureLog</h1>
	  <i>The world's leading Cryptography as a Service (CaaS) provider.</i>
          <p>Secure: Powered by the open source LibSodium crypto library, customers can rest assured their data is safe with us.</p>
	  <p>Open Source: Licensed under the GPLv3, SecureLog can be freely audit, modify, and used by anyone.</p>
	  <p>Made by Professionals: The wonderful team at SecureLog consists of one unpaid guy we found somewhere. You can sleep well knowing your data is in good hands!</p>
	  <p>Easy to Use: We believe that cryptography is a right, and so we set out democratize it. Rather than having to install specialized software and be skilled in its usage, anyone can leverage the power of the cloud to secure their data. It's easy--simply send the encryption key with the plaintext/ciphertext and we'll handle the rest!</p>
	  <p>If you've found our service useful, consider giving us a <a href="https://github.com/Oregano1963/SecureLog">star on GitHib.</a></p>
	  <button onClick={navigateEncrypt}>Encrypt Data</button>
	  <button onClick={navigateDecrypt}>Decrypt Data</button>
	  <button onClick={navigateLogs}>Fetch Logs</button>
	  <homePage/>
	  <pages/>
                           <BrowserRouter>
            <Routes>
                <Route path="encrypt" element={<encryptPage/>} />
	        <Route path="decrypt" element={<decryptPage/>}/>
	        <Route path="logs" element={<logPage/>}/>
            </Routes>
        </BrowserRouter>           
	  <body>
	  </body>
	  </>
  )
}

export default App
