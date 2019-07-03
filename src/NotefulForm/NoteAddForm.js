import React from 'react'
import NotefulContext from '../NotefulContext'
import cuid from 'cuid'



class NoteAddForm extends React.Component {
  state = 
  {
    title : '',
    description: '',
    folders: ''
  }

  static contextType = NotefulContext

  onTitleChange= (e) => {
    this.setState({
      title: e.target.value
    })
  }
  onDescriptionChange=(e)=>{
    this.setState({
      description: e.target.value
    })
  }
  onFolderSelect=(e)=>{
    this.setState({
      folders: e.target.value
    })

  }
  handleForm=(e)=>{
    e.preventDefault()
    const { title, description, folders } = e.target
    const note = {
      name: title.value,
      content: description.value,
      folderId: folders.value,
      id: cuid(),
      modified: new Date()
    }
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json',
      }})
    .then(res => {
      if(!res.ok){
        return res.json().then(error => {throw error})
      }
      return res.json()
    })
    .then(data => {
      title.value = ''
      description.value=''
      this.context.addNote(data)
      console.log(data)
      this.props.history.goBack()
    })
    .catch(error => {
      this.setState({ error })
    })
  }
  

  
    
  render(){
    console.log(this.context.folders)
    const folderChoice = this.context.folders.map((folder, index) => 
    <><input key={index} name="folders" type="radio" value={folder.id} onChange ={this.onFolderSelect}></input>
    <label>{folder.name}</label></>)
    return <div>
  <form onSubmit = {this.handleForm}>
    { folderChoice }
  <input name="title" type="text" onChange={this.onTitleChange}></input> 
  <textarea name="description" type="text" onChange={this.onDescriptionChange}></textarea>
  <button>Add Note</button>
  </form></div>
}
}
export default NoteAddForm