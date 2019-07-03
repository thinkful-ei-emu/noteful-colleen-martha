import React from 'react'
import NotefulContext from '../NotefulContext'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import { callbackify } from 'util';


 export default class Note extends React.Component {
  static contextType = NotefulContext 

  handleDeleteNote(noteId, callback) {
    fetch(`http://localhost:9090/notes/${noteId}`,{
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    })
    .then(res=> {
      if(!res.ok){
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(note => {
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
  }


  render(){
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${this.props.id}`}>
          {this.props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={() => this.handleDeleteNote(this.props.id, this.context.deleteNote)}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(this.props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}