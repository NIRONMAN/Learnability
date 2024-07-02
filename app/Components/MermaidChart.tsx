import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useGesture } from "react-use-gesture";

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'monospace',
 });
interface MermaidComponentProps {
  chart: string;
}

const MermaidComponent: React.FC<MermaidComponentProps> = ({ chart }) => {
  const [crop,setCrop]=useState({
    x:0,
    y:0,
    scale:4
  })
  const mermaidRef = useRef<HTMLDivElement>(null);
  useGesture({
    onDrag:({offset:[x,y]})=>{
      setCrop((prev)=>({...prev,x,y}))
    },
    onPinch:({offset:[d]})=>{
      setCrop((prev)=>({...prev,scale:4+d/100}))
    }
    
  },{domTarget:mermaidRef,eventOptions:{passive:false}})

  useEffect(() => {
    const initializeMermaid = async () => {
      if (mermaidRef.current) {
        const { svg, bindFunctions } = await mermaid.render(`mermaid-diagram-${1}`, chart);
        mermaidRef.current.innerHTML = svg;
        bindFunctions?.(mermaidRef.current);

        // Add event listeners for nodes
        const nodes = mermaidRef.current.querySelectorAll('g[class*="node"]');
        nodes.forEach((node) => {
          node.addEventListener('click', () => {
            alert(`Node clicked: ${node.id}`);
          });
        });
      }
    };

    initializeMermaid();

    // Clean up mermaid instance when unmounting
    return () => {
      if (mermaidRef.current) {
        const nodes = mermaidRef.current.querySelectorAll('g[class*="node"]');
        nodes.forEach((node) => {
          node.removeEventListener('click', () => {
            alert(`Node clicked: ${node.id}`);
          });
        });
      }
    };
  }, [chart]);

  return <div id={'1'} ref={mermaidRef} style={{
    left:crop.x,
    right:crop.y,
    touchAction:"none",
    transform:`scale(${crop.scale})`
  }}></div>;
};

export default MermaidComponent;
