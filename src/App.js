import React, { useRef, useState } from 'react';
import { imgs } from './utils/common';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [pattern, setPattern] = useState('');
  const imgRef = useRef(null);
  
  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let nums = splitter(value);
    patternGenerator(nums);
  }

  const patternGenerator = (nums) => {
    let arr = nums.map(item=>imgs[item]);
    setPattern(arr);
  }

  const splitter = (num) => {
    num = parseInt(num);
    let arr = [];
    let rem = Infinity;
    while(num > 10){
      rem = num % 10;
      num = ~~(num / 10);
      arr.push(rem);
    }
    arr.push(num);
    return arr.map((item, i)=>item*Math.pow(10, i))
  }

  const download = () => {
    const content = imgRef.current.outerHTML
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.svg";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="app">
      <h2>TECH SUPERIOR PATTERN GENERATOR</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Enter a number" maxLength="4" onChange={handleChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
      {pattern && <div className="pattern-container">
        <button onClick={download}>download</button>
        <svg height="250" width="250" ref={imgRef} xmlns="http://www.w3.org/2000/svg" version="1.1">
          {pattern}
        </svg>
      </div>}
    </div>
  );
}

export default App;
