import React from 'react'
export default function Sidebar({route,setRoute,setTheme}){
  return (
    <aside className="sidebar">
      <div className="brand">Binary Trees — DSA Visualizer</div>
      <nav>
        <div className={`nav-button ${route==='home'?'active':''}`} onClick={()=>setRoute('home')}>Home</div>
        <div className={`nav-button ${route==='theory'?'active':''}`} onClick={()=>setRoute('theory')}>Theory</div>
        <div className={`nav-button ${route==='story'?'active':''}`} onClick={()=>setRoute('story')}>Story Mode</div>
        <div className={`nav-button ${route==='algorithm'?'active':''}`} onClick={()=>setRoute('algorithm')}>Algorithm</div>
        <div className={`nav-button ${route==='viz'?'active':''}`} onClick={()=>setRoute('viz')}>Visualization</div>
        <div className={`nav-button ${route==='quiz'?'active':''}`} onClick={()=>setRoute('quiz')}>Quiz</div>
      </nav>
      <div className="card" style={{marginTop:18}}>
        <div className="small">Theme</div>
        <select className="select" onChange={(e)=>setTheme(e.target.value)}>
          <option value="tech-forest">Tech Forest</option>
          <option value="oceanic">Oceanic</option>
        </select>
      </div>
      <div className="footer">Made for DSA learning • Use dev server: <span className="small">npm run dev</span></div>
    </aside>
  )
}
