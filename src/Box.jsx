import React from "react";
import { useState } from "react";
import "./Box.css";
import { specialCharacters, number, upperCase, lowerCase } from "./secretRoom";
const Box = () => {
 const [password, setPassword] = useState('')
 const [passwordLength, setPasswordLength] = useState(26)
 const [includeLowerCase, setIncludeLowerCase] = useState(false)
 const [includeNumber, setIncludeNumber] = useState(false)
 const [includeUpperCase, setIncludeUpperCase] = useState(false)
 const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false)
 
 const generatePassword= () => {
  let newPassword = ""
  if(!includeLowerCase && !includeNumber && !includeSpecialCharacters && !includeUpperCase){
   console.log("please choose atleast one box")
  }
 if (includeLowerCase){
   newPassword += lowerCase
  }
  if (includeUpperCase){
   newPassword += upperCase
  }
  if(includeSpecialCharacters){
   newPassword += specialCharacters
  }
  if(includeNumber){
   newPassword += number
  }
   setPassword(createPassword(newPassword))
  
 
 }

 function createPassword (characterlist) {
 let createdPassword = ''
 const characterLength = characterlist.length
 
 for (let i=0; i <= passwordLength; i++){
  let characterIndex = Math.ceil(Math.random() * characterLength)
  createdPassword += characterlist.charAt(characterIndex)
 
 }
 return createdPassword
}
 
 

  return (
    <>
      <div className="box">
        <div className="boxWrapper">
          <div className="boxTop">
            <h4 className="boxTitle">Password Generator</h4>
          </div>
          <div className="boxCenter">{password}</div>
          <div className="boxBottom">
            <div className="boxItem">
              <input  type="number" onChange={(e) => setPasswordLength(e.target.value)} value={passwordLength} className="numberInput" />
              <span className="boxItemName">Select the length</span>
            
            </div>
            <div className="boxItem">
              <input checked={includeNumber} onChange={(e) => setIncludeNumber(e.target.checked)} type="checkbox" name="includeNumbers" />
              <span className="boxItemName">Numbers[0-9]</span>
            </div>
            <div className="boxItem">
              <input checked={includeSpecialCharacters} onChange={(e) => setIncludeSpecialCharacters(e.target.checked)} type="checkbox" name="includeSpecialCharacters" />
              <span className="boxItemName">Special Characters</span>
            </div>
            <div className="boxItem">
              <input checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)} type="checkbox" name="includeUpperCase" />
              <span className="boxItemName">UpperCase[A-Z]</span>
            </div>
            <div className="boxItem">
              <input checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)}  type="checkbox" name="includeLowerCase" />
              <span className="boxItemName">lowerCase[a-z]</span>
            </div>
            <hr  className="boxHr"/>
            <div className="boxItem">
            <button type="button" onClick={generatePassword} className="boxButton">Generate</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Box;
