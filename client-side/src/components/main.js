import React, { useEffect, useState } from 'react';
// import Main from './components/main';

function Main() {

    const [usersFiles, setUsersFiles] = useState({ files: [] })
    useEffect(() => {
        async function getFiles() {
            const data = await fetch(`http://localhost:8000/users/ofek`);
            const allFiles = await data.json();
            setUsersFiles(allFiles);
            console.log("dffdf");
        }
        getFiles();
    }, [])

    return (
        <div className="App">
            <h1> hello {usersFiles.name} </h1>
            <ul>
                {usersFiles.files.map((file) => <li><a href='#'>{file}</a></li>)}
            </ul>
        </div>
    );
}

export default Main;
