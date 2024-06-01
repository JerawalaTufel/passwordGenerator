import { useState , useCallback, useEffect, useRef } from "react"

function App() {
const [length , setLength] = useState(8)
const [numberExits , setNumberExits] = useState(false)
const [charExits , setCharExits] = useState(false)
const [pass , setPass] = useState('')

//useRef hook
const passRef = useRef(null)


const passGenerator = useCallback(() => {
  let pass = ""
  let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
 
  if(numberExits) str += "0123456789"
  if(charExits) str += "!@#$%^&*(){}[]~`'"

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    
    pass += str.charAt(char)
  }
  setPass(pass)

} , [length , numberExits , charExits])
  
useEffect(() =>{passGenerator()} , [length , numberExits , charExits , passGenerator])

const copyPass = () => {
  passRef.current?.select()
  window.navigator.clipboard.writeText(pass)
}
return (
    
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
           />

           <button 
           className="outline-none bg-blue-700 text-white
           px-3 py-0.5 shrink-0"
           onClick={copyPass}
           >copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {setLength(e.target.value)}}
             />
             <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              id="numberInput"
              defaultChecked = {numberExits}
              onChange={() => {
                setNumberExits((prev) => !prev)
              }}
            />
            <label>numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox" 
              id="numberInput"
              defaultChecked = {charExits}
              onChange={() => {
                setCharExits((prev) => !prev)
              }}
            />
            <label>characters</label>
          </div>
        </div>
      </div>
    
  )
}

export default App
