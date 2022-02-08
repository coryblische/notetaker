import { useState, useEffect } from 'react'
import { app, database } from '../../firebaseConfig'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const dbInstance = collection(database, 'notes')
export default function NoteOperations({ getSingleNote }) {
  const [isInputVisible, setInputVisible] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteBody, setNoteBody] = useState('')
  const [notesArray, setNotesArray] = useState([])
  const [loading, setLoading] = useState(true)
  const inputToggle = () => {
    setInputVisible(!isInputVisible)
  }

  const addNoteBody = (value) => {
    setNoteBody(value)
  }

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteBody: noteBody,
      sortOrder: new Date().valueOf(),
    }).then(() => {
      setNoteTitle('')
      setNoteBody('')
      getNotes()
    })
  }

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setNotesArray(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })
      )
      setLoading(false)
    })
  }

  notesArray.sort((a, b) => (a.sortOrder > b.sortOrder ? -1 : 1))

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <>
      {/* <div className='w-full mb-3'>
        <button
          className='p-3 bg-orange-600 rounded text-white w-48 hover:text-orange-100 hover:bg-orange-900'
          onClick={getNotes}
        >
          <span className='font-bold'>Get Notes</span>
        </button>
      </div> */}

      <div className='mb-3 grid grid-cols-3 gap-3 '>
        {notesArray.map((note, id) => {
          return (
            <article
              key={id}
              className='p-3 bg-white rounded-sm border border-teal-100 hover:bg-teal-50 hover:border-teal-200'
              onClick={() => getSingleNote(note.id)}
            >
              <h4>{note.noteTitle}</h4>
              {/* <div dangerouslySetInnerHTML={{ __html: note.noteBody }}></div> */}
              <span className='font-mono text-purple-600'>
                {note.sortOrder}
              </span>
            </article>
          )
        })}
      </div>

      <div className='input-container mt-3 flex flex-col'>
        <input
          className='p-3 border border-gray-300 w-96'
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder='Enter a Title'
          value={noteTitle}
        />

        <div className='flex flex-col'>
          {!loading ? (
            <ReactQuill
              onChange={addNoteBody}
              value={noteBody}
              className='mt-3 w-full bg-white'
            />
          ) : (
            <></>
          )}
        </div>

        <button
          className='p-3 mt-3 bg-teal-600 rounded border border-teal-900 text-white w-32 hover:text-teal-100 hover:bg-teal-900 active:bg-teal-700'
          onClick={saveNote}
        >
          💾 Save Note
        </button>
      </div>
    </>
  )
}
