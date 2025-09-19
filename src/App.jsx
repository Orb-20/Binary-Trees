import React, {useState} from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Theory from './pages/Theory'
import Algorithm from './pages/Algorithm'
import StoryMode from './pages/StoryMode'
import Quiz from './pages/Quiz'
import TreeViz from './components/TreeViz'

export default function App(){
  const [route, setRoute] = useState('home')
  const [treeType, setTreeType] = useState('BST')
  const [theme, setTheme] = useState('tech-forest') // placeholder for theme selection

  return (
    <div className={`app ${theme}`}>
      <Sidebar route={route} setRoute={setRoute} setTheme={setTheme} />
      <main className="main">
        {route === 'home' && <Home setTreeType={setTreeType} setRoute={setRoute} />}
        {route === 'theory' && <Theory treeType={treeType} />}
        {route === 'story' && <StoryMode treeType={treeType} />}
        {route === 'algorithm' && <Algorithm treeType={treeType} />}
        {route === 'quiz' && <Quiz treeType={treeType} />}
        {route === 'viz' && <TreeViz treeType={treeType} />}
      </main>
    </div>
  )
}
