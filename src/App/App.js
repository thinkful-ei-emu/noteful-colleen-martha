import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import NotefulContext from "../NotefulContext";
import NoteAddForm  from '../NotefulForm/NoteAddForm';

import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);

    this.setState({
      notes: newNotes
    });
  };
  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }
  componentDidMount() {
    fetch('http://localhost:9090/folders')
        .then(res=> res.json())
        .then(folders => this.setState({
            folders: folders
        }))

        fetch('http://localhost:9090/notes')
        .then(res=> res.json())
        .then(notes => this.setState({
            notes: notes
        }))
    
  }

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NoteAddForm} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
    );
  }

  render() {
    return (
      <NotefulContext.Provider
        value={{
          notes: this.state.notes,
          folders: this.state.folders,
          deleteNote: this.deleteNote
        }}
      >
        <div className="App">
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <header className="App__header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
              <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
