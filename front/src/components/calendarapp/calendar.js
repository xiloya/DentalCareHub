import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    event: {
      start: '',
      title: '',
      age: '',
      description: '',
    },
  });

  const handleDateClick = (info) => {
    setModalInfo({
      isOpen: true,
      event: {
        start: info.dateStr,
        title: '',
        age: '',
        description: '',
      },
    });
  };

  const handleEventClick = (info) => {
    setModalInfo({
      isOpen: true,
      event: {
        id: info.event.id,
        start: info.event.startStr,
        title: info.event.title,
        age: info.event.extendedProps.age || '',
        description: info.event.extendedProps.description || '',
      },
    });
  };

  const handleEventSave = () => {
    const { id, start, title, age, description } = modalInfo.event;
    if (id) {
      setEvents(events.map(event => (event.id === id ? { id, start, title, age, description } : event)));
    } else {
      setEvents([...events, { id: events.length + 1, start, title, age, description }]);
    }
    console.log('Events after save:', events);
    closeModal();
  };

  const handleEventDelete = () => {
    const { id } = modalInfo.event;
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    console.log('Events after delete:', updatedEvents);
    closeModal();
  };

  const closeModal = () => {
    setModalInfo({
      isOpen: false,
      event: {
        start: '',
        title: '',
        age: '',
        description: '',
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalInfo(prevModalInfo => ({
      ...prevModalInfo,
      event: {
        ...prevModalInfo.event,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    console.log('Current events:', events);
  }, [events]);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      {modalInfo.isOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{modalInfo.event.id ? 'Edit ' : 'make an appointment'}</h2>
            <form>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  name="title"
                  value={modalInfo.event.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Age: </label>
                <input
                  type="number"
                  name="age"
                  value={modalInfo.event.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Description: </label>
                <textarea
                  name="description"
                  value={modalInfo.event.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button type="button" onClick={handleEventSave}>
                  {modalInfo.event.id ? 'Update' : 'Add'}
                </button>
                {modalInfo.event.id && (
                  <button type="button" className="delete" onClick={handleEventDelete}>
                    Delete
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
