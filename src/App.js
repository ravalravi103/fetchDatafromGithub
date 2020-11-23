import './App.css';

import React,{useState} from 'react';

import UserList from './Component/UserList';
import UsersInfo from './Component/UsersInfo';

function App() {
  const [nameOne,setNameOne] = useState('');
  const [nameTwo,setnameTwo] = useState('');
  
  const [usersOne,setUsersOne] = useState([]);
  const [usersTwo,setusersTwo] = useState([]);

  // Note : Use Effect  Read Docs

  const imagestyle = {
    // Use CreateStyle
    width: '100px',
    height : '100px',
    borderRadius :'70px'
  }
 

  const getDatafunction = async () => { 
    // No Need to pass function Perameter.
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
            .catch(err=> console.log(err))
      } 
      else{
        alert('Two Name Require for Comparision !')
      } 
  } 
  
  return (
    <div className="App">
           <div className="search-box">
               <h2>Fetch Github UserData</h2>
               <input type="text" placeholder="Enter Name One" onChange={(e)=> setNameOne(e.target.value)} className="userInputbox-one"/>
                <input type="text" placeholder="Enter Name Two" onChange={(e) => setnameTwo(e.target.value)} className="userInputbox-two"/>
                <button className="getDataBtn" onClick={()=> getDatafunction()}>GetData</button>
           </div>

          <div className="user-profile">
              <div className="user user-one">
                   <UserList users={usersOne} />
              </div>
              <div className="user user-two">
                    <UserList users={usersTwo}/>
              </div>
          </div>
        
    </div>
  ); 
}

export default App;
