import React, { useEffect, useRef, useState } from 'react'
import classes from './TaskCreate.module.scss'
import { useAppStore } from '../../store/AppStoresContext'

type TaskCreatePropsType = {
  closeFormCreateTask?: () => void
}

export const TaskCreate: React.FC<TaskCreatePropsType> = ( props ) => {
  const [title, setTitle] = useState( '' )
  const [titleTouch, setTitleTouch] = useState( false )
  const [validForm, setValidForm] = useState( false )
  const [messageTitleValidation, setMessageTitleValidation] = useState( '' )
  const {tasksStore} = useAppStore()
  const refTitle = useRef<HTMLInputElement | null>( null )

  useEffect( () => {
    const refInput = refTitle.current as HTMLInputElement
    if ( refInput )
      refInput.focus()
  }, [] )

  useEffect( () => {
    let valid = true

    let messageErrorTitle = ''
    if ( titleTouch && title.trim().length === 0 ) {
      messageErrorTitle = 'Заголовок не может быть пустым'
      valid = false
    }

    setMessageTitleValidation( prevState =>
      messageErrorTitle !== prevState
        ? messageErrorTitle
        : prevState
    )

    setValidForm( valid && titleTouch )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title] )

  const createTaskHandler = async ( event: React.MouseEvent<HTMLButtonElement> ) => {
    try {
      await tasksStore.addTask( title )
      setTitle( '' )
      if ( props.closeFormCreateTask ) {
        props.closeFormCreateTask()
      }
    } catch ( e ) {
      alert( e.message )
    }
  }

  const changeTitleHandler = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setTitle( event.target.value )
    setTitleTouch( true )
  }

  const formSubmitHandler = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
  }

  const clickCancelHandler = () => {
    if ( props.closeFormCreateTask ) {
      props.closeFormCreateTask()
    }
  }

  return (
    <div className={classes.TaskCreate}>
      <form onSubmit={formSubmitHandler}>
        <div>
          <div className={classes.TaskCreate__TitleLabelWrapper}>
            <label htmlFor='input_task_create_title'>
              Краткое описание
            </label>

            <div className={classes.TaskCreate__TitleCancelImgWrapper}
                 onClick={clickCancelHandler}
            >
              <img src="/img/cancel_task.png"
                   alt=""
              />
            </div>
          </div>

          <input
            ref={refTitle}
            id='input_task_create_title'
            className={classes.TaskCreate__TitleInput}
            name='title'
            type='text'
            value={title}
            onChange={changeTitleHandler}/>

          <div className={classes.TaskCreate__InputInvalidMessage}>
            {messageTitleValidation}
          </div>
        </div>

        <div className={classes.TaskCreate__ButtonsWrapper}>
          <button onClick={createTaskHandler}
                  className={'btn btn-green'}
                  disabled={!validForm}
          >Создать
          </button>
        </div>
      </form>
    </div>
  )
}
