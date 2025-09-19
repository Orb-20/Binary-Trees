import React, {useRef, useEffect} from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

const sample = {
  name: 50,
  children:[
    {name:30, children:[{name:20},{name:40}]},
    {name:70, children:[{name:60},{name:80}]}
  ]
}

export default function TreeViz(){
  const ref = useRef()
  useEffect(()=>{
    const el = ref.current
    el.innerHTML = ''
    const width = el.clientWidth
    const height = el.clientHeight
    const svg = d3.select(el).append('svg').attr('width',width).attr('height',height)
    const g = svg.append('g').attr('transform',`translate(40,20)`)
    const root = d3.hierarchy(sample)
    const tree = d3.tree().size([width-80, height-60])
    tree(root)
    // links
    g.selectAll('path.link')
      .data(root.links())
      .enter().append('path')
      .attr('class','link')
      .attr('d', d3.linkVertical().x(d=>d.x).y(d=>d.y))
      .attr('stroke','rgba(0,212,255,0.6)')
      .attr('fill','none')
      .attr('stroke-width',2)
      .attr('opacity',0)
      .transition().duration(800).attr('opacity',1)
    // nodes
    const node = g.selectAll('.node').data(root.descendants()).enter().append('g')
      .attr('transform', d=>`translate(${d.x},${d.y})`)
    node.append('circle').attr('r',0)
      .transition().delay((d,i)=>i*120).duration(400).attr('r',14).attr('fill','rgba(0,212,255,0.12)').attr('stroke','rgba(0,212,255,0.9)')
    node.append('text').text(d=>d.data.name).attr('y',5).attr('text-anchor','middle').attr('fill','#e6f7ff').attr('font-size',12)
  },[])
  return (
    <div>
      <h2 className="h1">Interactive Tree Visualization</h2>
      <div className="card canvas-wrap">
        <motion.div ref={ref} style={{width:'100%',height:'100%'}} initial={{opacity:0}} animate={{opacity:1}} />
      </div>
    </div>
  )
}
