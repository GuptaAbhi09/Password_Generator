import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [Characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (Characters) str += "!@#$%^&*";
    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numbers, Characters]);

  useEffect(() => {
    generatePassword();
  }, [length, numbers, Characters, generatePassword]);

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard");
  }, [password]);

  return (
    <>
      <Toaster position="top-center" />
      <div className="w-full flex justify-center mt-8 px-3">
        <div className="bg-zinc-700 w-full max-w-md rounded-lg flex flex-col justify-center items-center py-4 px-3 sm:px-6">
          <h1 className="text-white text-lg sm:text-2xl font-semibold text-center">
            Password Generator
          </h1>

          {/* Password + Copy button */}
          <div className="flex w-full mt-4 gap-2 items-center">
            <div className="bg-amber-50 flex-1 flex items-center rounded-md">
              <input
                className="px-2 w-full h-10 sm:h-12 outline-none text-base sm:text-xl font-semibold text-orange-500 placeholder-zinc-400 tracking-wide"
                type="text"
                placeholder="password"
                value={password}
                readOnly
              />
            </div>
            <button
              className="py-1.5 px-2 text-xs sm:text-lg sm:py-2 sm:px-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row mt-5 gap-y-3 sm:gap-x-6 text-orange-500 font-medium w-full justify-center items-center">
            <div className="flex items-center gap-2">
              <input
                type="range"
                className="cursor-pointer w-28 sm:w-auto"
                min={8}
                max={30}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label className="text-sm sm:text-base">Len: {length}</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers((prev) => !prev)}
              />
              <label className="text-sm sm:text-base">Numbers</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={Characters}
                onChange={() => setCharacters((prev) => !prev)}
              />
              <label className="text-sm sm:text-base">Chars</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
