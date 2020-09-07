import React from 'react'
import c from './App.module.scss'
import { TasksList } from './components/Tasks/TasksList'
import { Switch, Route, Redirect } from 'react-router-dom'
import { TaskEdit } from './components/Tasks/TaskEdit'

function App() {
  return (
    <div className={c.App}>
      <Switch>
        <Route exact path={'/'}> <TasksList/> </Route>
        <Route exact path={'/tasks/:id/edit'}> <TaskEdit/> </Route>
        <Route path={'/tasks'}> <TasksList/> </Route>

        <Redirect to={'/'}/>
      </Switch>


    </div>
  )
}

export default App
