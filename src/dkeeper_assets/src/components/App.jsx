import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.title,newNote.content);
      return [newNote,...prevNotes];
    });
  }

  useEffect(()=>{
    console.log("useEffect got triggered");
    fetchData();
  },[]);

  async function fetchData(){
    const newArray = await dkeeper.readNotes(); 
    setNotes(newArray);
  };

  function deleteNote(id) {
    setNotes(prevNotes => {
      dkeeper.deleteNote(id);
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
