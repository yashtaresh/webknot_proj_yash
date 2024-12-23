import React, { useState, useEffect } from 'react';
import { Task, Event, Attendee } from '../types';
import { getTasks, createTask, updateTaskStatus, deleteTask, getEvents, getAttendees } from '../lib/storage';
import toast from 'react-hot-toast';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
    event_id: '',
    attendee_id: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setTasks(getTasks());
    setEvents(getEvents());
    setAttendees(getAttendees());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createTask({
        ...formData,
        status: 'pending',
        attendee_id: formData.attendee_id || null,
      });
      
      toast.success('Task created successfully');
      setShowForm(false);
      setFormData({ name: '', deadline: '', event_id: '', attendee_id: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const toggleTaskStatus = (task: Task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      updateTaskStatus(task.id, newStatus);
      toast.success('Task status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteTask(id);
      toast.success('Task deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const getEventName = (eventId: string) => {
    return events.find(event => event.id === eventId)?.name || 'Unknown Event';
  };

  const getAttendeeName = (attendeeId: string | null) => {
    if (!attendeeId) return 'Unassigned';
    return attendees.find(attendee => attendee.id === attendeeId)?.name || 'Unknown Attendee';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showForm && (
        <TaskForm
          events={events}
          attendees={attendees}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            getEventName={getEventName}
            getAttendeeName={getAttendeeName}
            onToggleStatus={toggleTaskStatus}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;