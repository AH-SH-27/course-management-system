// "use client"
// import ELK from 'elkjs/lib/elk.bundled.js';
// import React, { useCallback, useLayoutEffect } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   Panel,
//   useNodesState,
//   useEdgesState,
//   useReactFlow,
// } from 'reactflow';

// import 'reactflow/dist/style.css';


// const elkOptions = {
//     'elk.algorithm': 'layered',
//     'elk.layered.spacing.nodeNodeBetweenLayers': '100',
//     'elk.spacing.nodeNode': '80',
//   };
  
//   // Data
//   const allCourses = [
//     // A portion of the courses for brevity
//     // Add the rest of the courses following the same pattern
//     { Course: "COMP499", Title: "Internship", Credits: 1, Level: "UG", Type: "CE Core" },
//     { Course: "COMP502", Title: "Final Year Project II", Credits: 3, Level: "UG", Type: "CE Core" },
//     // ...
//   ];
  
//   const preReqList = [
//     // Prerequisite data
//     { Course: "MATH283", Prerequisite: ["MATH282", "MATH281"] },
//     { Course: "COMP210", Prerequisite: ["COMP208"] },
//     // ...
//   ];
  
//   const elk = new ELK();
  
//   const getLayoutedElements = (nodes, edges, options = {}) => {
//     const isHorizontal = options?.['elk.direction'] === 'RIGHT';
//     const graph = {
//       id: 'root',
//       layoutOptions: options,
//       children: nodes.map((node) => ({
//         ...node,
//         targetPosition: isHorizontal ? 'left' : 'top',
//         sourcePosition: isHorizontal ? 'right' : 'bottom',
//         width: 150,
//         height: 50,
//       })),
//       edges: edges,
//     };
  
//     return elk
//       .layout(graph)
//       .then((layoutedGraph) => ({
//         nodes: layoutedGraph.children.map((node) => ({
//           ...node,
//           position: { x: node.x, y: node.y },
//         })),
//         edges: layoutedGraph.edges,
//       }))
//       .catch(console.error);
//   };
  
//   function LayoutFlow() {
//     const [nodes, setNodes, onNodesChange] = useNodesState([]);
//     const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//     const { fitView } = useReactFlow();
  
//     const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  
//     const onLayout = useCallback(
//       ({ direction, useInitialNodes = false }) => {
//         const opts = { 'elk.direction': direction, ...elkOptions };
//         const ns = useInitialNodes ? initialNodes : nodes;
//         const es = useInitialNodes ? initialEdges : edges;
  
//         getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
//           setNodes(layoutedNodes);
//           setEdges(layoutedEdges);
//           window.requestAnimationFrame(() => fitView());
//         });
//       },
//       [nodes, edges]
//     );
  
//     useLayoutEffect(() => {
//       onLayout({ direction: 'RIGHT', useInitialNodes: true }); // Set initial direction to RIGHT
//     }, []);
  
//     return (
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onConnect={onConnect}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         fitView
//       >
//         <Panel position="top-right">
//           <button onClick={() => onLayout({ direction: 'DOWN' })}>Vertical layout</button>
//           <button onClick={() => onLayout({ direction: 'RIGHT' })}>Horizontal layout</button>
//         </Panel>
//       </ReactFlow>
//     );
//   }
  
//   export default () => (
//     <ReactFlowProvider>
//       <LayoutFlow />
//     </ReactFlowProvider>
//   );
  