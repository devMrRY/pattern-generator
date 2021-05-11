import React, { useState } from 'react';
import { imgs } from './utils/common';

import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [pattern, setPattern] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let nums = splitter(value);
    patternGenerator(nums);
  }

  const patternGenerator = (nums) => {
    debugger
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
  return (
    <div className="app">
      <h2>PATTERN GENERATOR</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Enter a number" onChange={handleChange} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div className="pattern-container">
        <svg height="250" width="250">
          {pattern}
        </svg>
      </div>
    </div>
  );
}

export default App;
