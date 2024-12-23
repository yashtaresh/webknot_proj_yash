import React from 'react';
import { CheckSquare, Trash2, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  getEventName: (eventId: string) => string;
  getAttendeeName: (attendeeId: string | null) => string;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  getEventName,
  getAttendeeName,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow p-6 ${
        task.status === 'completed' ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <button
            onClick={() => onToggleStatus(task)}
            className={`flex-shrink-0 ${
              task.status === 'completed'
                ? 'text-green-600'
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <CheckSquare className="h-6 w-6" />
          </button>
          <div>
            <h3
              className={`text-lg font-medium ${
                task.status === 'completed'
                  ? 'text-gray-500 line-through'
                  : 'text-gray-900'
              }`}
            >
              {task.name}
            </h3>
            <div className="mt-1 space-y-1">
              <p className="text-sm text-gray-500">
                Event: {getEventName(task.event_id)}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                {getAttendeeName(task.attendee_id)}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {format(new Date(task.deadline), 'PPp')}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;