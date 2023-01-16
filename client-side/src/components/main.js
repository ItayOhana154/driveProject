import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

// import Main from './components/main';

function Main() {

    const { user } = useUser();
    const [usersFiles, setUsersFiles] = useState({ files: [] })
    const [fileContent, setFileContent] = useState("");
    const [currentShown,setCurrentShown] = useState('')

    useEffect(() => {
        async function getFiles() {
            console.log(user);
            const data = await fetch(`http://localhost:8000/api/users/${user}`);
            const allFiles = await data.json();
            setUsersFiles(allFiles);
            console.log("dffdf");
        }
        getFiles();
    }, [])

    async function showContent(file) { 
        if(fileContent===""){
        console.log(`http://localhost:8000/api/users/${user}/${file.type}/${file.fileName}`);
        const res = await fetch(`http://localhost:8000/api/users/${user}/${file.type}/${file.fileName}`);
        const data = await res.json();
        setFileContent(data);
        setCurrentShown(file.fileName);
        }
        else{
            setFileContent("");
            setCurrentShown('');
        }
    }

    async function addFile(type) {
        let fileName = prompt('insert name')
        let fileBody = prompt('enter content')
        console.log(typeof user);
        const res = await fetch(`http://localhost:8000/api/users/${user}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type, fileName: fileName, fileBody: fileBody })
        })
        const data = await res.json();
        setUsersFiles(data);
        console.log(data);
    }

    async function showStats(file) {
        const res = await fetch(`http://localhost:8000/api/users/${user}/${file.name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName: file.fileName, showInfo: file.stats.show })
        })
        const data = await res.json();
        setUsersFiles(data);
    }

    async function rename (file) {
        let newName =  prompt('insert new name');
        const res = await fetch(`http://localhost:8000/api/users/${user}/${file.name}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName: file.fileName, type: file.type, newName:newName })
        })

        const data = await res.json();
        setUsersFiles(data);

    }

    async function addFolder(type) {
        let folderName = prompt('insert name')
        const res = await fetch(`http://localhost:8000/api/users/${user}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type, fileName: folderName })
        })
        const data = await res.json();
        setUsersFiles(data);
    }

    async function deleteF(file){
        const res = await fetch(`http://localhost:8000/api/users/${user}/${file.name}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName: file.fileName, type: file.type})
        })

        const data = await res.json();
        setUsersFiles(data);
    }

    async function moveFile(){
        
    }

    console.log("userfiles", usersFiles);
    return (
        <div className="App">
            <h1> hello {usersFiles.name} </h1>
            <button onClick={() => addFile("file")}>Add file</button>
            <button onClick={() => addFolder("folder")}>Add folder</button>
            <ul>
                {usersFiles ? usersFiles.files.map((file, index) => <li style={file.type == "folder" ? { background: "yellow" } : null} key={"a" + index}><b key={index} onClick={() => showContent(file)} >{file.fileName}</b>
                    <button onClick={() => showStats(file)}>info</button>
                    <p>{file.stats.show ? `the size is:${file.stats.size} the birthtime is ${file.stats.birthtime}` : ""}</p>
                    <button onClick={()=>rename(file)}>rename</button>
                    <button style={file.type=="folder"?{display:"none"}:null} onClick={()=>moveFile(file)}>move</button>
                    <button onClick={()=>deleteF(file)}>delete</button></li>) : ""}
            </ul>
            <p style={{background:"purple"}}><b>{currentShown}</b><br/>{fileContent}</p>
            <Link to="/">logout</Link>
        </div>
    );
}

export default Main;
