export type TaskType = {
  id: number
  title: string
}

export type TasksStoreType = {
  tasks: TaskType[]

  loadTasks: () => void
  addTask: ( title: string ) => void
  removeTask: ( _: number | TaskType ) => void
  updateTask: ( task: TaskType ) => void
}

export function createTasksStore(): TasksStoreType {
  return {
    tasks: [],

    loadTasks() {

    },
    addTask( title ) {

    },
    removeTask( task ) {

    },
    updateTask( task ) {

    }
  }
}
