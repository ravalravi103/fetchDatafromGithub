import React,{useState} from 'react';

import UsersInfo from './UsersInfo';

function UserList({users}) {
    
   const [finalUser,setFinalUser] = useState({});
   const [finalUserRepo,setFinalUserRepo] = useState([]);

    const imageStyle = {
        width: '100px',
        height : '100px',
        borderRadius: '50%',
        border : "1px soild #777"
    }
   
    

    const fetchUserRepo = async (name) => {
        // use Single Promoise instead of Two
        const response = await fetch(`https://api.github.com/users/${name}/repos`);
        const data = await response.json();
        console.log(data)
        setFinalUserRepo(data);
    }

    const clickThisHandler = (e) => {
    fetchUserRepo(e.target.name)
     console.log(e.target.id)
     console.log(e.target.name)
     fetch(`https://api.github.com/users/${e.target.name}`)
      .then(res => res.json())
      .then(singleUser => setFinalUser(singleUser))
      .catch(err => console.log(err))
    }

  

    return (
        <>
        <div className='user-list'>
            {/* dont use Div  uer React Fragmnet*/}
            {/* use && INSTEAD OF TERNARY */}
            {(users) ? <>
                {users.map(user => {
                    return(
                        <div className="user-item">
                            <img src={user.avatar_url} alt={user.name} style={imageStyle}/>
                            <h5>Name: {user.login}</h5>
                            <button className="click-this-btn" id={user.id} name={user.login} onClick={(e) => clickThisHandler(e)}>Click This</button>
                        </div>
                        
                    )
                })}
          </> : null}            
        </div>
        {(finalUserRepo)? <UsersInfo 
            finalUser={finalUser} 
            userRepos={finalUserRepo}/> : null }
      </>
    )
}

export default UserList
