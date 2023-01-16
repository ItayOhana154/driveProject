
export default function File(){
    return (<div>
            <li style={file.type=="folder"?{background:"yellow"}:null} key={"a"+index}><a key={index} onClick={()=>showContent(file)} href='#'>{file.fileName}</a>
                <button>info</button>
                <button>rename</button>
                <button>move</button>
                <button>delete</button></li>
    </div>)
}