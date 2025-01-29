import React, { useEffect, useRef, useState, useCallback } from "react";

const App = () => {
  const [length, setLength] = useState(6);
  const [Numbers, setNumbers] = useState(false);
  const [Symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (Numbers) str += "0123456789";
    if (Symbols) str += "@#!$%^&*~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, Numbers, Symbols]);

  useEffect(() => {
    passGenerator();
  }, [passGenerator]);

  const copyToClipboard = useCallback(() => {
    if (passRef.current) {
      //if passRef have any reference(value) then it will run.
      passRef.current.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  return (
    <div className="bg-black flex items-start py-10 justify-center w-full h-screen">
      <div className="bg-gray-700 w-full max-w-md p-6 rounded-2xl flex flex-col items-center">
        <h1 className="text-4xl text-white mb-4">Password Generator</h1>

        <div className="flex w-full">
          <input
            type="text"
            ref={passRef}
            readOnly
            className="flex-grow bg-white px-4 py-3 rounded-l-xl text-black"
            placeholder="Password"
            value={password}
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-700 active:bg-gray-900 px-4 py-3 rounded-r-xl text-white hover:bg-blue-600"
          >
            Copy
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 w-full text-white">
          <div className="flex items-center">
            <input
              onChange={(e) => setLength(Number(e.target.value))}
              type="range"
              min={1}
              max={50}
              className="cursor-pointer"
              value={length}
            />
            <span className="ml-2 font-bold">Length: {length}</span>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={Numbers}
                onChange={() => setNumbers((prev) => !prev)}
              />
              <span className="ml-1 text-green-300">Numbers</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={Symbols}
                onChange={() => setSymbols((prev) => !prev)}
              />
              <span className="ml-1 text-green-300">Symbols</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
