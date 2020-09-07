import { TaskType } from '../store/tasksStore'

export type ResponseType = {
  success: boolean
  error: string
  [key: string]: any
}

export const getTasks = async () => {
  try {
    const res = await fetch(
      'https://test.megapolis-it.ru/api/list' )
    const data = await res.json() as ResponseType
    return data
  } catch ( e ) {
    throw e
  }
}

export const postTask = async ( title: string ) => {
  try {
    const res = await fetch(
      'https://test.megapolis-it.ru/api/list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify( {
          title
        } )
      } )
    const data = await res.json() as ResponseType
    return data
  } catch ( e ) {
    throw e
  }
}

export const updateTask = async ( task: TaskType ) => {
  console.log( task )

  try {
    const res = await fetch(
      `https://test.megapolis-it.ru/api/list/${task.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify( {
          title: task.title
        } )
      } )
    const data = await res.json() as ResponseType
    return data
  } catch ( e ) {
    throw e
  }
}

export const deleteTask = async ( id: number ) => {
  try {
    const res = await fetch(
      `https://test.megapolis-it.ru/api/list/${id}`,
      {
        method: 'DELETE',
      } )
    const data = await res.json() as ResponseType
    return data
  } catch ( e ) {
    throw e
  }
}
