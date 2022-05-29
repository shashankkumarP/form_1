import React,{useState,useEffect,useRef} from 'react'
import { Individual } from './Individual';

export const Form = () => {
    let [list,setList] = useState([]);
    let [fetchfromserver,setFetchfromserver] = useState(false);
    let sorti = useRef(false);
    let [nowpush,setNowpush] = useState(false)
    let li;
    let [form,setForm] = useState({
        name:"",
        age:"",
        address:"",
        Department:"",
        salary:"",
        maritial_status:"",
        files:""
       })
       let mysubmit =(e)=>{
        e.preventDefault();
        console.log(form);
        setNowpush(true);
    }
       let handlechange = (e)=>{
           let {name,value,checked,type,file} = e.target;
           if(type==value){
               value = value;
           }
           else if(type=="checkbox")
           {
               value=checked;
           }
           else if(type==file){
               value=file;
           }
           setForm({...form,[name]:value})
       }
      
       useEffect(()=>{
           if(nowpush){
            fetch("http://localhost:8005/identity",{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                },
                body: JSON.stringify({
                 name:form.name,
                 age:form.age,
                 address:form.address,
                 Department:form.Department,
                 salary:form.salary,
                 maritial_status:form.maritial_status,
                 files:form.files,
                })
            }).then((r)=>r.json()).then((data1)=>{
                console.log("data1",data1);
                setList([...list,data1])
                setFetchfromserver(true);
                // console.log(list,"list");
                setNowpush(false);
                
            })
        };
        
        
        
           
       },[nowpush])
       let mysort = (e)=>{
           sorti.current=true;
           if(e.target.value=="atd"){
              li = list.sort((a,b)=>{
                return Number(a.salary)-Number(b.salary)
            })
            console.log(li)
            
           }
           else{
             li = list.sort((a,b)=>{
                return Number(b.salary)-Number(a.salary)
            })
            console.log(li);

           }
           
       }

       let ondelete=(id)=>{
           fetch(`http://localhost:8005/identity/${id}`,{
               method:'DELETE'
           }).then((r)=>{
               r.json();
           }).then((r)=>{
               console.log(r);
               setFetchfromserver(true);
           })
       }
       useEffect(()=>{
           if(fetchfromserver){
               fetch("http://localhost:8005/identity").then((r)=>r.json()).then((data)=>{
                   console.log(data);
                   setList(data);
                   setFetchfromserver(false);
               })
          
           }
           
       },[fetchfromserver])

       

  return (
    <div>
        <form onSubmit={mysubmit}>
            <label htmlFor="">Name  
            <input type="text" name='name' placeholder='please enter your name' style={{marginLeft:"10px"}} onChange={handlechange}/>
            </label>
            <label style={{marginLeft:"10px"}}>
                Age 
                <input type="number" name='age' style={{marginLeft:"10px"}} onChange={handlechange}/>
            </label>
            <label htmlFor="" style={{marginLeft:"10px"}} >
                Address 
                <input type="text" name='address'  placeholder='type your address' style={{marginLeft:"10px"}} onChange={handlechange}/>
            </label>
            <label htmlFor="" style={{marginLeft:"10px"}}>
                Department 
                <select name="Department" id="" style={{marginLeft:"10px"}} onChange={handlechange}>
                    <option value=""></option>
                    <option value="Hr">Hr</option>
                    <option value="It">It</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Civil">Civil</option>
                </select>
            </label>
            <label htmlFor="" style={{marginLeft:"10px"}}>
                Salary 
                <input type="number" name='salary' placeholder="enter your salary" style={{marginLeft:"10px"}} onChange={handlechange}/>
            </label>
            <label htmlFor="" style={{marginLeft:"10px"}}>
                Maritial Status : Married
                <input type="radio"  value="married" style={{marginLeft:"10px"}}  name="maritial_status"  onChange={handlechange}/>
                single
                <input type="radio"  value="single" style={{marginLeft:"10px"}} name="maritial_status"  onChange={handlechange}/>
            </label>
            <label htmlFor="" style={{marginLeft:"10px"}}>
                Photo upload
                <input type="file" name='files' style={{marginLeft:"10px"}} accept="image/png,image/jpeg,pdf" onChange={handlechange}/>
            </label>
            <input type="submit" />
        </form>
        
        <select name="" id="" onChange={mysort}>
            <option value="">Sorting</option>
            <option value="atd">Accending</option>
            <option value="dta">Decending</option>
        </select>
        {sorti.current==true ? li.map((l)=>(<Individual key={l.id} l={l} ondelete={ondelete}/>)) :list.map((l)=>(<Individual key={l.id} l={l} ondelete={ondelete}/>))}



    </div>
  )
}
