import {createStore} from 'redux';
import {ITask} from "../components/Task";

const ARCHIVE_TASK = 'ARCHIVE_TASK'
const PIN_TASK = 'PIN_TASK'

interface TasksState {
    tasks: ITask[],
    error?: string | null
}

interface ARCHIVE_TASK_ACTION {
    type: typeof ARCHIVE_TASK;
    id: string;
}

interface PIN_TASK_ACTION {
    type: typeof PIN_TASK;
    id: string;
}

type TaskActionTypes = ARCHIVE_TASK_ACTION | PIN_TASK_ACTION

export const archiveTask = (id: string): TaskActionTypes => ({type: ARCHIVE_TASK, id});
export const pinTask = (id: string): TaskActionTypes => ({type: PIN_TASK, id});

const initialState: TasksState = {
    tasks: [],
    error: null
};

function taskStateReducer(taskState: string) {
    return (state: TasksState, action: TaskActionTypes): TasksState => {
        return {
            ...state,
            tasks: state.tasks.map((task: ITask) =>
                task.id === action.id ? {...task, state: taskState} : task
            ),
        };
    };
}

export const reducer = (state: TasksState = initialState, action: TaskActionTypes): TasksState => {
    switch (action.type) {
        case ARCHIVE_TASK:
            return taskStateReducer('TASK_ARCHIVED')(state, action);
        case PIN_TASK:
            return taskStateReducer('TASK_PINNED')(state, action);
        default:
            return state;
    }
};

const defaultTasks = [
    {id: '1', title: 'Something', state: 'TASK_INBOX'},
    {id: '2', title: 'Something more', state: 'TASK_INBOX'},
    {id: '3', title: 'Something else', state: 'TASK_INBOX'},
    {id: '4', title: 'Something again', state: 'TASK_INBOX'},
];

export default createStore(reducer, {tasks: defaultTasks});
