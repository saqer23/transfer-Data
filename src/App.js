import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [words, setWords] = useState([])
  const [cate, setCate] = useState('')
  const [cate1, setCate1] = useState(0)
  const fetchCate = async () => {
    console.log('e.target.value');
    await axios.get('https://api.esharat.shi.org.sa/api/Words/Words?pageSize=1400&cate=' + cate)
      .then(res => {
        console.log(res);
        setWords(res.data)
      })
  }
  const create = async () => {
    console.log('>>>>>>>>', words);
    for (let i in words) {
      console.log(i);
      if (words[i].wordEn === null) {
        await axios.post('http://127.0.0.1:8000/api/word1', {
          video: words[i].video,
          descriptionImage: words[i].descriptionImage,
          category_id: 1,
          wordAr: words[i].word,
          wordEn: 'other',
          description: words[i].description,
          synonym: words[i].wordComplement,
        }, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
      } else {
        await axios.post('http://127.0.0.1:8000/api/word1', {
          video: words[i].video,
          descriptionImage: words[i].descriptionImage,
          category_id: +cate1,
          wordAr: words[i].word,
          wordEn: words[i].wordEn,
          description: words[i].description,
          synonym: words[i].wordComplement,
        }, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        })

      }
    }
  }
  return (
    <div className="App">
      <h1>ss</h1>
      <input value={cate} onChange={(e) => { setCate(e.target.value) }} />
      <br/>
      <input value={cate1} type='number' onChange={(e) => { setCate1(e.target.value) }} />
      <button onClick={fetchCate}>get</button>
      <button onClick={create}>post</button>
    </div>
  );
}

export default App;
