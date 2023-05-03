import { useEffect, useState } from 'react';
import './App.css';
import ReminderList from './components/ReminderList';
import Reminder from './models/reminder';
import reminderService from './service/reminder'
import NewReminder from './components/NewReminder';



function App() {
  const [reminders , setReminders] = useState<Reminder[]>([])

  useEffect(()=> {
    loadReminder();
  }, []) //give second parameter to run only once

  const loadReminder = async ()=> {
    const reminders = await reminderService.getReminders();
    setReminders(reminders)
  }
  const removeReminder = (id:number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }
  const addReminder = async(title : string) => {
    const NewReminder = await reminderService.addReminder(title );
    setReminders([NewReminder , ...reminders])
  }
  return(
    <div className="App">
      <NewReminder onAddReminder={addReminder} />
      <ReminderList items={reminders} onRemoveReminder={removeReminder}/>
    </div>
  );
}

export default App;
