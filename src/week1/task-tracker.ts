// Building a task management system 

import { create } from "node:domain";

export { }

enum Priority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'high',
    URGENT = 'urgent'
}

type Status = 'todo' | 'in-progress' | 'done'
type Role = 'admin' | 'member'

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

interface Task {
    id: number;
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    assignedTo?: User;
    createdAt: Date
}


const tasks: Task[] = []

//Auto increment id counter
let nextTaskId = 1

function createTask(title: string, priority = Priority.MEDIUM, description?: string): Task {
    const newTask: Task = {
        id: nextTaskId++,
        title: title,
        description: description,
        priority: priority,
        status: 'todo',
        createdAt: new Date()


    }

    tasks.push(newTask)
    return newTask

}

const t1 = createTask('learn typescript', Priority.HIGH, 'study week1 friday')
const t2 = createTask('Drink water', Priority.MEDIUM, 'buy cold water from iyawo')
const t3 = createTask('Fix server crash', Priority.URGENT)

console.log(tasks)


updateTaskStatus(t3.id, 'done');


//step 3 Discriminated union result type (Error handling)

// in backend development functions often succeed and return data or fail and return an error message

type Result = { success: true, data: Task } | { success: false, error: string }

function updateTaskStatus(taskId: number, newStatus: Status,): Result {
    const found = tasks.find(t => t.id === taskId)
    if (!found) {
        return { success: false, error: 'Task with id ... not found' }

    } else {
        found.status = newStatus
        return { success: true, data: found }
    }

}


const res1 = updateTaskStatus(1, 'in-progress')

if (res1.success) {
    console.log('Successfully  updated:', res1.data.title, 'to status', res1.data.status);

} else {
    console.log('Failed', res1.error)
}


const res2 = updateTaskStatus(999, 'done')
if (res2.success) {
    console.log('Successfully updated', res2.data.title)
} else {
    console.log('Failed', res2.error)
}

const user1: User = { id: 101, name: 'Ada', email: 'ada@example.com', role: 'admin' }

function assignTask(taskId: number, user: User): Result {
    const found = tasks.find(t => t.id === taskId)
    if (!found) {
        return { success: false, error: 'Task not found' }
    }



    found.assignedTo = user


    return { success: true, data: found } // Early return pattern 
}

console.log(assignTask(1, user1))

//step 5 function types(Typing a filter Callback)

// 

type TaskPredicate = (task: Task) => boolean

function filterTasks(predicate: TaskPredicate): Task[] {
    return tasks.filter(predicate)
}

const taskWithTodo = filterTasks((task) => task.status === 'todo')
console.log(' todo tasks', taskWithTodo)

const urgentTask = filterTasks((task) => task.priority === Priority.HIGH)
console.log('urgent tasks', urgentTask);

//step 6 Aggregating and statistics 

interface TaskSummmary {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
    urgent: number;

}

function getTaskSummary(taskist: Task[] = tasks): TaskSummmary {
    const summary: TaskSummmary = {
        total: tasks.length,
        todo: 0,
        inProgress: 0,
        done: 0,
        urgent: 0,
    }

    for (const task of tasks) {
        switch (task.status) {
            case 'todo':
                summary.todo++;
                break;

            case 'in-progress':
                summary.inProgress++
                break;
            case 'done':
                summary.done++;
                break;


        }
        if (task.priority === Priority.URGENT) {
            summary.urgent++
        }
    }

    return summary

}

console.log('Task Summary:', getTaskSummary())

//one final feature (instanceof and error handling)


class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError'
    }
}


function deleteTask(idInput: string | number): boolean {
    const numericId = typeof idInput === 'string' ? Number(idInput) : idInput;
    const index = tasks.findIndex(t => t.id === numericId);
    if(index === -1) {
        throw new NotFoundError(`Task with id ${numericId} does not exist`)
    }else{
        tasks.splice(index,1)
        return true
    }
}

try{
    deleteTask(2)
    console.log('Task 2  deletd successfully!')
    console.log('Summary after deletion:', getTaskSummary());

    //2 try to delete a non existing task to trigger the error
    deleteTask('999')
}catch(error:unknown){

    if(error instanceof NotFoundError){
        console.log('Caught a custom Notfound error', error.message)
    }else if(error instanceof Error){
        console.log('Caught a general Error:', error.message)
    }
}





















