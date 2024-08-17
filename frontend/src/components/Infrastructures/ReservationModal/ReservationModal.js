import React, { useState } from 'react';
import Modal from '../../Modal/Modal';

import { useTranslation } from 'react-i18next';

const ReservationModal = ({ onClose, onSubmit, userData, infrastructureType, infrastructures, users = [] }) => {
  const [date, setDate] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');
  const [infrastructure, setInfrastructure] = useState('');
  const [user, setUser] = useState('');
  const [target, setTarget] = useState('');

  const { t } = useTranslation();

  //Only for civilians
  const [nPartecipants, setNPartecipants] = useState(0);

  const handleReservation = async () => {

    //Da modificare

    //Get the total number of hours from the start and end time
    const start = hourStart.split(':');
    const end = hourEnd.split(':');
    const totalHours = (parseInt(end[0]) - parseInt(start[0])) + (parseInt(end[1]) - parseInt(start[1])) / 60;

    const targetPrice = infrastructureType.targets.find(t => t.targetId === Number(target)).Target.price;
  

    const finalPrice = (targetPrice * totalHours);

    const reservationData = {
      idCustomer: user ? user : userData.email,
      infrastructureType: infrastructureType.id,
      status: 1,
      date,
      start: hourStart,
      end: hourEnd,
      nPartecipants,
      idInfrastructure: infrastructure,
      price: finalPrice,
      target,
    };

    onSubmit(reservationData);
    onClose();
  };

  return (
    <Modal title={t('infrastructures.create_reservation')} isOpen={true} onClose={onClose}>
      <div className='form-group'>
        <label htmlFor='date'>{t('infrastructures.date')}</label>
        <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className='form-group'>
        <label htmlFor='hours'>{t('infrastructures.start_time')}</label>
        <input type='time' id='hourStart' value={hourStart} onChange={(e) => setHourStart(e.target.value)} step='900' required />
      </div>

      <div className='form-group'>
        <label htmlFor='hours'>{t('infrastructures.end_time')}</label>
        <input type='time' id='hourEnd' value={hourEnd} onChange={(e) => setHourEnd(e.target.value)} step='900' required />
      </div>

      <div className='form-group'>
        <label htmlFor='infrastructure'>{t('infrastructures.infrastructure')}</label>
        <select id='infrastructure' value={infrastructure} onChange={(e) => setInfrastructure(e.target.value)} required>
          <option value=''>{t('infrastructures.select_infrastructure')}</option>
          {infrastructures.map((infrastructure) => (
            <option key={infrastructure.id} value={infrastructure.id}>{infrastructure.name}</option>
          ))}
        </select>
      </div>

      {
        userData.roleId === 'civilian' && (
          <>
            <div className='form-group'>
              <label htmlFor='nPartecipants'>{t('infrastructures.nParticipants')}</label>
              <input type='number' id='nPartecipants' value={nPartecipants} onChange={(e) => setNPartecipants(e.target.value)} required />
            </div>
          </>
        )
      }

      <div className='form-group'>
        <select id='target' value={target} onChange={(e) => setTarget(e.target.value)} required>
          <option value=''>{t('infrastructures.select_target')}</option>
        {
          infrastructureType.targets.map((target) => (
            <option key={target.targetId} value={target.targetId}>{target.target}</option>
          ))
        }
        </select>
      </div>
        
      {
        userData.roleId === 'admin' && (
          <div className='form-group'>
            <label htmlFor='user'>{t('infrastructures.user')}</label>
            <select id='user' value={user} onChange={(e) => setUser(e.target.value)} required>
              <option value=''>{t('infrastructures.select_user')}</option>
              {users.map((user) => (
                <option key={user.email} value={user.email}>
                  {user.society + " (" + user.firstName + " " + user.lastName + ")"}
                </option>
              ))}

            </select>
          </div>

        )}

     
      <button onClick={handleReservation}>{t('infrastructures.book')}</button>
    </Modal>
  );
};

export default ReservationModal;
