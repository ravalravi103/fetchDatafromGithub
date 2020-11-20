import React from 'react'

function UsersInfo({finalUser,userRepos}) {
    const profileImageStyle = {
        width: '200px',
        height : '200px',
        borderRadius: '50%',
        border : "1px soild #777"
    }

    return (
        (finalUser)? <div>
        {console.log(finalUser)}
        <img src={finalUser.avatar_url} alt={finalUser.login} style={profileImageStyle}/>
        <h4>Name :{finalUser.login}</h4>
        <p>Github Url: {finalUser.url}</p>
        <p>Score: {finalUser.score}</p>
        {/* <p>Followers :{finalUser.followers_url.length}</p>
        <p>Following :{finalUser.following_url.length}</p> */}
        <p>Loacl Repositroy: {userRepos.length}</p>
        <h2>Loacal Repository</h2>
         {userRepos.map(repo => {
             return(
                <a href={repo.html_url}><h5>{repo.name}</h5></a>
             )
         })}
    </div> : null
    )
}

export default UsersInfo
