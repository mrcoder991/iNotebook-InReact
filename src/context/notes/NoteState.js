import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    // const [notes, setNotes] = useState(notesInitial)
    const notesInitial = [
      {
        "_id": "623f3626d0d61cdf34c871b2",
        "user": "623ea852ad10eb4f74bbf410",
        "title": "My title updated",
        "description": "Please wake up early updated",
        "tag": "personal",
        "date": "2022-03-26T15:49:58.250Z",
        "__v": 0
      },
      {
        "_id": "62406ec28787802a36d8ee3c",
        "user": "623ea852ad10eb4f74bbf410",
        "title": "learn git",
        "description": "Please learn git and github",
        "tag": "coding",
        "date": "2022-03-27T14:03:46.390Z",
        "__v": 0
      },
      {
        "_id": "62408f0652d55f57b28f1a11",
        "user": "623ea852ad10eb4f74bbf410",
        "title": "learn git",
        "description": "Please learn git and github",
        "tag": "coding",
        "date": "2022-03-27T16:21:26.316Z",
        "__v": 0
      },
      {
        "_id": "62408f0e52d55f57b28f1a13",
        "user": "623ea852ad10eb4f74bbf410",
        "title": "learn git 5",
        "description": "Please learn git and github 5",
        "tag": "coding",
        "date": "2022-03-27T16:21:34.590Z",
        "__v": 0
        }]
    
    const [notes, setNotes] = useState(notesInitial)
    
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;