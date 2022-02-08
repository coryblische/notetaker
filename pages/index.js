import Head from 'next/head'
import NoteOperations from './components/NoteOperations'
import NoteDetails from './components/NoteDetails'
import { useState } from 'react'

export default function Home() {
  const current = new Date()
  const copyrightYear = current.getFullYear()

  const [ID, setID] = useState(null)
  const getSingleNote = (id) => {
    setID(id)
    console.log(id)
  }
  return (
    <div className='flex flex-col h-screen justify-between '>
      <Head>
        <title>Notetaker</title>
        <meta name='description' content='Notetaker' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='flex justify-center p-2 lg:p-5 bg-teal-100 w-full'>
        <h6 className='font-light tracking-widest'>Notetaker</h6>
      </header>

      <main className='container flex mx-auto mb-auto'>
        <div className='left basis-1/2  p-3'>
          <h1 className='font-bold text-2xl mb-3'>Note List</h1>
          <NoteOperations getSingleNote={getSingleNote} />
        </div>
        <div className='right basis-1/2 p-3 flex flex-col justify-start'>
          <h1 className='font-bold text-2xl mb-3'>
            Single Note View / Edit / Delete
          </h1>
          <NoteDetails ID={ID} />
        </div>
      </main>

      <footer className='flex justify-center p-2 lg:p-5 bg-teal-100 w-full'>
        <h6 className='font-light tracking-widest'>
          &copy; Notetaker {copyrightYear}
        </h6>
      </footer>
    </div>
  )
}
