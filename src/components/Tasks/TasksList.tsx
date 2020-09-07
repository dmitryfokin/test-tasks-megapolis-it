import React, { useEffect, useState } from 'react'
import classes from './TasksList.module.scss'
import { useAppStore } from '../../store/AppStoresContext'
import { useObserver } from 'mobx-react-lite'
import { TaskCreate } from './TaskCreate'
import { Link } from 'react-router-dom'

export const TasksList: React.FC = () => {
  const {tasksStore} = useAppStore()

  const [showTaskCreate, setShowTaskCreate] = useState<boolean>( false )

  useEffect( () => {
    tasksStore.loadTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTaskCreate] )

  const clickCreateTaskHandler = () => {
    setShowTaskCreate( true )
  }

  const clickRemoveTaskHandler = async ( id: number ) => {
    try {
      await tasksStore.removeTask( id )
    } catch ( e ) {
      alert( e.message )
    }
  }

  const closeFormCreateTask = () => {
    setShowTaskCreate( false )
  }

  return useObserver( () => (
    <div className={classes.TasksList}>
      <div className={classes.TasksList__Title}>
        <h1 className={classes.TasksList__TitleText}>Список задач</h1>
        <button className={'btn btn-green'}
                onClick={clickCreateTaskHandler}
        >Добавить
        </button>
      </div>

      <div>
        {tasksStore.tasks.length === 0
          ? (<p>Добавьте задачу</p>)
          : (
            <table className={classes.TasksList__Table}>
              <tbody>
              {tasksStore.tasks.map( task => (
                <tr key={task.id}>
                  <td className={classes.TasksList__TableNumber}>
                    {`Задача № ${task.id}`}
                  </td>

                  <td>
                    <div className={classes.TasksList__TableTitleText}>
                      {task.title}
                    </div>
                  </td>

                  <td className={classes.TasksList__TableTDIcons}>
                    <div className={classes.TasksList__TableIcons}>
                      <div className={classes.TasksList__TableIcon}>
                        <Link to={`/tasks/${task.id}/edit`}>
                          <img src="./img/task_edit.png"
                               alt=""
                          />
                        </Link>
                      </div>

                      <div className={classes.TasksList__TableIcon}
                           onClick={clickRemoveTaskHandler
                             .bind( null, task.id )}
                      >
                        <img src="./img/task_remove.png"
                             alt=""
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ) )}
              </tbody>
            </table>
          )
        }
      </div>

      {showTaskCreate && (
        <div className={'overlay'}>
          <div className={classes.TaskCreate__wrapper}>
            <TaskCreate closeFormCreateTask={closeFormCreateTask}/>
          </div>
        </div>
      )}
    </div>
  ) )
}
