import React,{useEffect,useRef,useState} from 'react'

export const Individual = (props) => {
   
    
  return (
    <div style={{display:"flex",gap:"10px"}} key={props.l.id}>
        <h3>Name : {props.l.name}</h3>
        <h4>Age : {props.l.age}</h4>
        <h5>Address : {props.l.address}</h5>
        <h5>Department : {props.l.Department}</h5>
        <h5>Salary : {props.l.salary}</h5>
        <h5>Martial Status : {props.l.maritial_status}</h5>
        
        
        <button onClick={()=>props.ondelete(props.l.id)}>x</button>
    </div>
  )
}
