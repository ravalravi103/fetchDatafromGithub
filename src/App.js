import './App.css';

import React,{useEffect, useState} from 'react';

import UserList from './Component/UserList';
import UsersInfo from './Component/UsersInfo';

function App() {
  const [nameOne,setNameOne] = useState('');
  const [nameTwo,setnameTwo] = useState('');
  
  const [usersOne,setUsersOne] = useState([]);
  const [usersTwo,setusersTwo] = useState([]);

  useEffect(()=> {
       getDatafunction(nameOne,nameTwo);
  },[])


  const imagestyle = {
    width: '100px',
    height : '100px',
    borderRadius :'70px'
  }
 

  const getDatafunction = async (nameOne,nameTwo) => {
         const urlOne = `https://api.github.com/search/users?q=${nameOne}`
         const urlTwo = `https://api.github.com/search/users?q=${nameTwo}`

      if(nameOne !== '' && nameTwo !== ''){
        const fetchReqUserOne = fetch(urlOne);
        const fetchReqUserTwo = fetch(urlTwo);
        Promise.all([fetchReqUserOne,fetchReqUserTwo])
          .then(response => Promise.all(response.map(res => res.json())))
          .then(data => {
            console.log(data)
            const firstUser = data[0].items;
            const secoundUser = data[1].items;
            setUsersOne(firstUser);
            setusersTwo(secoundUser);
          })
          .catch(err => console.log(err)) 
      }  
  } 
  
  return (
    <div className="App">
          <input type="text" placeholder="Enter Name One" onChange={(e)=> setNameOne(e.target.value)} className="userInputbox-one"/>
        <input type="text" placeholder="Enter Name Two" onChange={(e) => setnameTwo(e.target.value)} className="userInputbox-two"/>
           <button className="getDataBtn" onClick={()=> getDatafunction(nameOne,nameTwo)}>GetData</button>

          <div className="user-profile">
              <div className="user-One">
                   <UserList users={usersOne} />
              </div>
              <div className="user-Two">
                    <UserList users={usersTwo}/>
              </div>
          </div>
        
    </div>
  ); 
}

export default App;
