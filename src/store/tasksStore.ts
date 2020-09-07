import {
  deleteTask,
  getTasks,
  postTask,
  updateTask
} from '../serveces/api.tasks'

export type TaskType = {
  id: number
  title: string
}

export type TasksStoreType = {
  tasks: TaskType[]

  loadTasks: () => void
  addTask: ( title: string ) => void
  removeTask: ( id: number ) => void
  updateTask: ( task: TaskType ) => void
  getTaskById: ( id: number ) => Promise<TaskType>
}

export function createTasksStore(): TasksStoreType {
  return {
    tasks: [],

    async loadTasks() {
      try {
        const res = await getTasks()
        if ( !res.success )
          throw new Error( `Ошибка API: ${res.error}` )

        this.tasks = res.data as TaskType[]
      } catch ( e ) {
        throw e
      }
    },

    async addTask( title ) {
      try {
        const res = await postTask( title )
        if ( !res.success )
          throw new Error( `Ошибка API: ${res.error}` )

        await this.loadTasks()
      } catch ( e ) {
        throw e
      }
    },

    async removeTask( id ) {
      try {
        const res = await deleteTask( id )
        if ( !res.success )
          throw new Error( `Ошибка API: Задача №${id}: ${res.error}` )

        await this.loadTasks()
      } catch ( e ) {
        throw e
      }
    },

    async updateTask( task ) {
      try {
        const _task = await this.getTaskById( task.id )

        if ( _task.title === task.title )
          return

        const res = await updateTask( task )
        if ( !res.success )
          throw new Error( `Ошибка API: Задача №${task.id}: ${res.error}` )

        await this.loadTasks()
      } catch ( e ) {
        throw e
      }
    },

    async getTaskById( id ) {
      try {
        await this.loadTasks()

        const task = this.tasks.find(
          task => task.id === id
        ) as TaskType
        if ( task === undefined )
          throw new Error( `Задача №${id} не найдена` )

        return task
      } catch ( e ) {
        throw e
      }
    }
  }
}
