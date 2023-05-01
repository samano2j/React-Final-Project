import config from '../config'
import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getData } from '../redux/middleware/api'

const Form = ({dataField, openForm, closeForm}) => {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [state, setState] = useState('')
    const [url, setURL] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdateAt] = useState('')
    const [formTitle, setFormTitle] = useState('Add new Issue')
    const [submitMode, setSubmitMode] = useState('create')
    const [key, setKey] = useState('')
    const dispatch = useDispatch()

    useEffect(()=> {
        if(dataField != null){
            setId(dataField.data.Id)
            setTitle(dataField.data.Title)
            setState(dataField.data.State)
            setURL(dataField.data.Url)
            setCreatedAt(dataField.data.Created_at)
            setUpdateAt(dataField.data.Updated_at)
            setFormTitle('Issue id:' + dataField.data.Id)
            setKey(dataField.data.Key)
            setSubmitMode('update')
        }
    }, [])

    if (!openForm) {
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(submitMode == 'update') {
            const { error } = await supabase
                .from(config.tableName)
                .update({ 
                    Id: id,
                    Title: title,
                    State: state,
                    Url: url,
                    Created_at: createdAt,
                    Updated_at: new Date()
                })
                .eq('Key', key)

            setId(dataField.data.Id)
            setTitle(dataField.data.Title)
            setState(dataField.data.State)
            setURL(dataField.data.Url)
            setCreatedAt(dataField.data.Created_at)
            setUpdateAt(dataField.data.Updated_at)
            setFormTitle('Issue id:' + dataField.data.Id)
            setKey(dataField.data.Key)
            setSubmitMode('update')

        }
        else if (submitMode == 'create') {
            const { error } = await supabase
                .from(config.tableName)
                .insert({ 
                    Id: id,
                    Title: title,
                    State: state,
                    Url: url,
                })

            setId('')
            setTitle('')
            setState('')
            setURL('')
            setCreatedAt('')
            setUpdateAt('')
        }
        
        dispatch(getData({mode: 'normal'}))
        closeForm()
    }

    const disable = (id == '') || (title == '') || (state == '') 

    return (
        <div className="text-black fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <form className="bg-white w-8/12 sm:w-5/12 p-5 flex flex-col gap-10 rounded-xl" 
            onSubmit={handleSubmit}>
                <h1 className="mb-5 text-xl">{formTitle}</h1>
                <input
                    type='text'
                    placeholder="Id*"
                    name='id'
                    value={id}
                    className={id==""?'border-red-600 w-full border-solid border-b-2 focus:outline-none':'border-gray-300 w-full border-solid border-b-2 focus:outline-none'}
                    onChange={e => setId(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder="Title*"
                    name='title'
                    value={title}
                    className={title==""?'border-red-600 w-full border-solid border-b-2 focus:outline-none':'border-gray-300 w-full border-solid border-b-2 focus:outline-none'}

                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder="State*"
                    name='state'
                    value={state}
                    className={state==""?'border-red-600 w-full border-solid border-b-2 focus:outline-none':'border-gray-300 w-full border-solid border-b-2 focus:outline-none'}
                    onChange={e => setState(e.target.value)}
                    required
                />
                <input
                    type='text'
                    placeholder="Url"
                    name='url'
                    value={url}
                    className="w-full border-solid border-b-2 focus:outline-none"
                    onChange={e => setURL(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Created at (Automatic)"
                    name='createdAt'
                    value={createdAt}
                    className="w-full border-solid border-b-2 focus:outline-none"
                    readOnly
                    // onChange={e => setCreatedAt(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Updated at (Automatic)"
                    name='updatedAt'
                    value={updatedAt}
                    className="w-full border-solid border-b-2 focus:outline-none"
                    readOnly
                    // onChange={e => setUpdateAt(e.target.value)}
                />
                <div className="flex gap-10 px-5 py-2">
                    <button type='submit' disabled={disable} className={disable?'text-gray-300':'text-black'}>Save</button>
                    <button type='button' onClick={closeForm}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default Form