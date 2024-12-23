/*
  # Initial Schema for Event Management System

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `location` (text)
      - `date` (timestamptz)
      - `created_at` (timestamptz)
      - `user_id` (uuid, foreign key)
    
    - `attendees`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `created_at` (timestamptz)
      - `user_id` (uuid, foreign key)
    
    - `tasks`
      - `id` (uuid, primary key)
      - `name` (text)
      - `deadline` (timestamptz)
      - `status` (text)
      - `event_id` (uuid, foreign key)
      - `attendee_id` (uuid, foreign key)
      - `created_at` (timestamptz)
      - `user_id` (uuid, foreign key)
    
    - `event_attendees`
      - `event_id` (uuid, foreign key)
      - `attendee_id` (uuid, foreign key)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  location text NOT NULL,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own events"
  ON events
  USING (auth.uid() = user_id);

-- Attendees table
CREATE TABLE attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  UNIQUE(email, user_id)
);

ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own attendees"
  ON attendees
  USING (auth.uid() = user_id);

-- Tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  deadline timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'completed')),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  attendee_id uuid REFERENCES attendees(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own tasks"
  ON tasks
  USING (auth.uid() = user_id);

-- Event Attendees junction table
CREATE TABLE event_attendees (
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  attendee_id uuid REFERENCES attendees(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (event_id, attendee_id)
);

ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their event attendees"
  ON event_attendees
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_attendees.event_id
      AND events.user_id = auth.uid()
    )
  );