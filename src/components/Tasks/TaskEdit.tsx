import React, { useEffect, useRef, useState } from 'react'
import classes from './TaskEdit.module.scss'
import { useAppStore } from '../../store/AppStoresContext'
import { useParams, useHistory } from 'react-router-dom'

type RouteParamsType = {
  id: string
}

export const TaskEdit: React.FC = () => {
  const [id, setId] = useState<number>( -1 )
  const [title, setTitle] = useState<string>( '' )
  const {tasksStore} = useAppStore()
  const params = useParams<RouteParamsType>()
  const history = useHistory()
  const refTitle = useRef<HTMLInputElement | null>( null )

  useEffect( () => {
    const refInput = refTitle.current as HTMLInputElement
    if ( refInput )
      refInput.focus()
  }, [] )

  useEffect( () => {
    try {
      const run = async () => {
        const task = await tasksStore.getTaskById(
          Number.parseInt( params.id )
        )
        setId( task.id )
        setTitle( task.title )
      }
      run()
    } catch ( e ) {
      console.log( e )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id] )

  const updateTaskHandler = async () => {
    if ( title.trim().length === 0 ) {
      alert( 'Краткое описание не может быть пустым!' )
      return
    }

    try {
      await tasksStore.updateTask( {id, title} )
      history.push( '/tasks' )
    } catch ( e ) {
      alert( e.message )
    }
  }

  const changeTitleHandler = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setTitle( event.target.value )
  }

  const formSubmitHandler = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
  }

  return (
    <div className={classes.TaskEdit}>
      <div className={classes.TaskEdit_Header}>
        {`Задача №${id}`}
      </div>

      <form onSubmit={formSubmitHandler} className={classes.TaskEdit_Form}>
        <div>
          <div className={classes.TaskCreate__TitleLabelWrapper}>
            <label
              htmlFor='input_task_edit_title'
            >
              Краткое описание
            </label>
          </div>

          <input
            ref={refTitle}
            id='input_task_edit_title'
            className={classes.TaskEdit__TitleInput}
            name='title'
            type='text'
            value={title}
            onChange={changeTitleHandler}/>
        </div>

        <div className={classes.TaskCreate__ButtonsWrapper}>
          <button onClick={updateTaskHandler}
                  className={'btn btn-blue'}
          >Вернуться в список
          </button>
        </div>
      </form>
    </div>
  )
}
