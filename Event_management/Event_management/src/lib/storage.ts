import { Event, Attendee, Task } from '../types';

// Generate UUID for unique IDs
const generateId = () => crypto.randomUUID();

// Generic CRUD operations
const getItems = <T>(key: string): T[] => {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
};

const setItems = <T>(key: string, items: T[]) => {
  localStorage.setItem(key, JSON.stringify(items));
};

// Events
export const getEvents = (): Event[] => getItems<Event>('events');

export const createEvent = (event: Omit<Event, 'id' | 'created_at'>): Event => {
  const events = getEvents();
  const newEvent = {
    ...event,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  setItems('events', [...events, newEvent]);
  return newEvent;
};

export const deleteEvent = (id: string) => {
  const events = getEvents().filter(event => event.id !== id);
  setItems('events', events);
};

// Attendees
export const getAttendees = (): Attendee[] => getItems<Attendee>('attendees');

export const createAttendee = (attendee: Omit<Attendee, 'id' | 'created_at'>): Attendee => {
  const attendees = getAttendees();
  const newAttendee = {
    ...attendee,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  setItems('attendees', [...attendees, newAttendee]);
  return newAttendee;
};

export const deleteAttendee = (id: string) => {
  const attendees = getAttendees().filter(attendee => attendee.id !== id);
  setItems('attendees', attendees);
};

// Tasks
export const getTasks = (): Task[] => getItems<Task>('tasks');

export const createTask = (task: Omit<Task, 'id' | 'created_at'>): Task => {
  const tasks = getTasks();
  const newTask = {
    ...task,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  setItems('tasks', [...tasks, newTask]);
  return newTask;
};

export const updateTaskStatus = (id: string, status: 'pending' | 'completed') => {
  const tasks = getTasks().map(task =>
    task.id === id ? { ...task, status } : task
  );
  setItems('tasks', tasks);
};

export const deleteTask = (id: string) => {
  const tasks = getTasks().filter(task => task.id !== id);
  setItems('tasks', tasks);
};