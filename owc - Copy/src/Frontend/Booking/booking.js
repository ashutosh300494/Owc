import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../../config'

export default function Book() {
  
  const role =  sessionStorage.getItem("role")
   var arr=[] 
   const [books, setbooks]=useState([])
   const [valid,setvalid]=useState({
   email:"",
   Propertyname:"",
   Propertydesc:"",
   prize:"" 
   })
   const bookingdata=async()=>{
    if(role=="Admin"){
    axios.get(url.server+"/Payment/payment").then((res)=>{

      setbooks(res.data)
  
     }).catch(err=>{console.log(err)})
    }
    else{
       axios.post(url.server+"/Payment/booking",{email:sessionStorage.getItem("email")}).then(res=>{
        //console.log("in else");
          const result=Array.isArray(res.data)
          if(result){
             
            setbooks(res.data)
            
            
          }
          else if(res.data!=null){
                arr.push(res.data)

                setbooks(arr)
                    
          }
          
        //   console.log(res.data);
        //    console.log(arr);
       }).catch(err=>{

        console.log(err);
       }) 

    }
    }



    
  



   useEffect(()=>{
       bookingdata()
   },[])          
  return (
    <>

    &nbsp; 

    <h1 style={{textalign:"centre"}}> Booked Properties</h1>
  
  <hr></hr>
    
    
    {
    books.map((props)=>{
       
      return (
      
      <>
      {
        books==null?
        <h3>No Bookings</h3>:
      <div class="card w-75" style={{"width": "18rem","margin":"4%"}}>
       <div class="card-body">
       <img  className="card-img-top" src={props.image} />
         <h5 class="card-title">{props.Propertyname}</h5>
         <p class="card-text">{props.Propertydesc}</p>
         <a href="#" class="btn btn-success">Booked </a>
       </div>
       
     </div>
    }
     &nbsp;
      
     </>
      )
    })}

    
   
  &nbsp;
    
    </>
  )
}
