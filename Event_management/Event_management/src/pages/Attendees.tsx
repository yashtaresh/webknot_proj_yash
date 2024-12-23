import React, { useState, useEffect } from 'react';
import { User, Trash2, Edit } from 'lucide-react';
import { Attendee } from '../types';
import { getAttendees, createAttendee, deleteAttendee } from '../lib/storage';
import toast from 'react-hot-toast';

const Attendees = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    setAttendees(getAttendees());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createAttendee(formData);
      toast.success('Attendee added successfully');
      setShowForm(false);
      setFormData({ name: '', email: '' });
      setAttendees(getAttendees());
    } catch (error) {
      toast.error('Failed to add attendee');
    }
  };

  const handleDelete = (id: string) => {
    try {
      deleteAttendee(id);
      toast.success('Attendee deleted successfully');
      setAttendees(getAttendees());
    } catch (error) {
      toast.error('Failed to delete attendee');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Attendees</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Add Attendee'}
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
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Attendee
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {attendees.map((attendee) => (
          <div key={attendee.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <User className="h-10 w-10 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{attendee.name}</h3>
                  <p className="text-gray-500">{attendee.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(attendee.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendees;