import React, {useState} from 'react'
const QUESTIONS = [
  {q:'In BST, left child values are ___ root?', a:'less'},
  {q:'AVL trees ensure height difference less than or equal to ?', a:'1'},
  {q:'Red-Black Trees color property helps ensure ___', a:'balance'}
]
export default function Quiz(){
  const [i,setI] = useState(0)
  const [ans,setAns] = useState('')
  const [score,setScore] = useState(0)
  const [done,setDone] = useState(false)
  function submit(){
    if(ans.trim().toLowerCase()===QUESTIONS[i].a.toLowerCase()) setScore(s=>s+1)
    setAns('')
    if(i+1<QUESTIONS.length) setI(i+1)
    else setDone(true)
  }
  return (
    <div>
      <h2 className="h1">Quick Quiz</h2>
      <div className="card">
        {!done ? (
          <>
            <div className="small">{QUESTIONS[i].q}</div>
            <input className="select" value={ans} onChange={e=>setAns(e.target.value)} placeholder="answer"/>
            <div style={{marginTop:8}}><button className="btn" onClick={submit}>Submit</button></div>
          </>
        ) : (
          <div>
            <div className="small">Score: {score} / {QUESTIONS.length}</div>
            <div style={{marginTop:8}}><button className="btn" onClick={()=>{setI(0);setScore(0);setDone(false)}}>Retry</button></div>
          </div>
        )}
      </div>
    </div>
  )
}
