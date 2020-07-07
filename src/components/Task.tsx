import React from 'react';

interface Task {
    id: string;
    title: string;
    state: string;
}

interface Params {
    task: Task;
    onArchiveTask: (id: string) => {};
    onPinTask: (id: string) => {};
}

export default function Task({task: {id, title, state}, onArchiveTask, onPinTask}: Params) {
    return (
        <div className={`list-item ${state}`}>
            <label className="checkbox">
                <input
                    type="checkbox"
                    defaultChecked={state === 'TASK_ARCHIVED'}
                    disabled={true}
                    name="checked"
                />
                <span className="checkbox-custom" onClick={() => onArchiveTask(id)}/>
            </label>
            <div className="title">
                <input type="text" value={title} readOnly={true} placeholder="Input title"/>
            </div>

            <div className="actions" onClick={event => event.stopPropagation()}>
                {state !== 'TASK_ARCHIVED' && (
                    <a onClick={() => onPinTask(id)}>
                        <span className={`icon-star`}/>
                    </a>
                )}
            </div>
        </div>
    );
}
