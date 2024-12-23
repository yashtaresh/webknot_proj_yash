export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  created_at: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface Task {
  id: string;
  name: string;
  deadline: string;
  status: 'pending' | 'completed';
  event_id: string;
  attendee_id: string | null;
  created_at: string;
}