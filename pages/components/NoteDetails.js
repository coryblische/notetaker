import { useState, useEffect } from 'react'
import { app, database } from '../../firebaseConfig'
import {
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const dbInstance = collection(database, 'notes')

export default function NoteDetails({ ID }) {
  const [singleNote, setSingleNote] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteBody, setNoteBody] = useState('')
  const getSingleNote = async () => {
    if (ID) {
      const singleNote = doc(database, 'notes', ID)
      const data = await getDoc(singleNote)
      setSingleNote({ ...data.data(), id: data.id })
    }
  }

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setSingleNote(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })[0]
      )
    })
  }

  const getEditData = () => {
    setIsEdit(true)
    setNoteTitle(singleNote.noteTitle)
    setNoteBody(singleNote.noteBody)
  }

  useEffect(() => {
    getNotes()
  }, [])

  useEffect(() => {
    getSingleNote()
  }, [ID])

  const editNote = (id) => {
    const collectionById = doc(database, 'notes', id)

    updateDoc(collectionById, {
      noteTitle: noteTitle,
      noteBody: noteBody,
    }).then(() => {
      window.location.reload()
    })
  }

  const deleteNote = (id) => {
    const collectionById = doc(database, 'notes', id)

    deleteDoc(collectionById).then(() => {
      window.location.reload()
    })
  }

  return (
    <>
      <article className='bg-white border border-teal-200 p-3 rounded w-full shadow-xl shadow-teal-100/50'>
        <h2>{singleNote.noteTitle}</h2>
        <div
          className='single-note'
          dangerouslySetInnerHTML={{ __html: singleNote.noteBody }}
        ></div>
        <span className='font-mono text-purple-600'>
          {singleNote.sortOrder}
        </span>
        <hr className='border-teal-100 mt-1 mb-3' />
        <div className='flex flex-row justify-end gap-3'>
          <button
            className='p-3 rounded w-24 border border-blue-400 hover:bg-blue-50 active:bg-blue-200'
            onClick={getEditData}
          >
            Edit
          </button>
          <button
            className='p-3 rounded w-24 border border-red-400 hover:bg-red-50 active:bg-red-200'
            onClick={() => deleteNote(singleNote.id)}
          >
            Delete
          </button>
        </div>
      </article>
      {isEdit ? (
        <div className='mt-4'>
          <h3 className='font-bold text-lg'>Edit Note Form</h3>
          <input
            className='p-3 border border-gray-300 w-96'
            placeholder='Enter the Title...'
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />

          <ReactQuill
            className='mt-3 w-full bg-white'
            onChange={setNoteBody}
            value={noteBody}
          />

          <button
            onClick={() => editNote(singleNote.id)}
            className='p-3 rounded w-32 border border-green-400 mt-3 hover:bg-green-50 active:bg-green-200'
          >
            Update Note
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
