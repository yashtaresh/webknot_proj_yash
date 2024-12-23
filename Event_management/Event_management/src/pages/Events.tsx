import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Trash2, Edit } from 'lucide-react';
import { Event } from '../types';
import { getEvents, createEvent, deleteEvent } from '../lib/storage';
import toast from 'react-hot-toast';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
  });

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createEvent(formData);
      toast.success('Event created successfully');
      setShowForm(false);
      setFormData({ name: '', description: '', location: '', date: '' });
      setEvents(getEvents());
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteEvent(id);
      toast.success('Event deleted successfully');
      setEvents(getEvents());
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="datetime-local"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Create Event
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{event.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {format(new Date(event.date), 'PPp')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;