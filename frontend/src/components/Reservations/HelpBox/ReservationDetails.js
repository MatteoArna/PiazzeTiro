import React, {useEffect, useState} from 'react';
import './ReservationDetails.css';

import { useTranslation } from 'react-i18next';

import useReservationApprover from '../../../hooks/custom/useReservationApprover';
const ReservationDetails = ({ reservation, onDeleteReservation, onUpdateReservation, isAdmin = false }) => {

    const { translateTime, formatDate } = useReservationApprover(reservation);

    const [motivation, setMotivation] = React.useState('');

    const [date, setDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        setDate(formatDate(reservation.date));
        setStart(reservation.start);
        setEnd(reservation.end);
    }, [reservation]);

    const {t} = useTranslation();

    const handleUpdateReservation = (e) => {
        e.preventDefault();
        const data = {
            id: reservation.id,
            date: date,
            start: start,
            end: end
        }
        onUpdateReservation(data);
    }

    const handleDeleteReservation = (e) => {
        e.preventDefault();
        if(!motivation)
            return;
        const data = {
            id: reservation.id,
            motivation: motivation
        }
        onDeleteReservation(data);
    }

    return (
        <div className="reservation-details">
            <span className="value">{reservation.User.society}</span>
            <div className="detail">
                <span className="label">{t('reservations.contact')}</span>
                <span className="value">{reservation.idCustomer }</span>
            </div>
            <div className="detail">
                <span className="label">{t('reservations.infrastructure')}</span>
                <span className="value">{reservation.Infrastructure ? reservation.Infrastructure.name : reservation.InfrastructureType.type }</span>
            </div>

            {
                isAdmin && (

                    <form onSubmit={handleUpdateReservation}>
                        <div className="detail">
                            <span className="label">{t('reservations.date')}</span>
                            <input
                                className='value'
                                type='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            ></input>
                        </div>

                        <div className="detail">
                            <span className="label">{t('reservations.period')}</span>
                            <input
                                className='value'
                                type='time'
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                required
                            ></input>
                            <input
                                className='value'
                                type='time'
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                required
                            ></input>
                        </div>
                        <button className="button" type="submit">{t('reservations.update')}</button>

                    </form>
                )
            }

            {
                !isAdmin && (
                    <div className="detail">
                        <span className="label">{t('reservations.period')}</span>
                        <span className="value">{translateTime(reservation.start) + " - " + translateTime(reservation.end)}</span>
                    </div>
                )
            }
            

            

            {
                reservation.nPartecipants > 0 && (
                    <div className="detail">
                        <span className="label">{t('reservations.participants')}</span>
                        <span className="value">{reservation.nPartecipants}</span>
                    </div>
                )
            }

            <div className="detail">
                <span className="label">{t('reservations.target')}</span>
                <span className="value">{reservation.Target.name}</span>
            </div>

            {
                reservation.price > 0 && (
                    <div className="detail">
                        <span className="label">{t('reservations.price')}</span>
                        <span className="value">{reservation.price} chf</span>
                    </div>
            )}

            {
                isAdmin && !reservation.motivation && (
                    <form onSubmit={handleDeleteReservation}>
                        <label className="label">{t('reservations.cancel_reservation')}</label>
                        <textarea
                            className="motivation-textarea"
                            placeholder={t('reservations.motivation')}
                            value={motivation}
                            onChange={(e) => setMotivation(e.target.value)}
                            required
                        ></textarea>
                        <button className="delete-button" type="submit">{t('reservations.delete')}</button>
                    </form>
                )
            }

            {
                reservation.motivation && (
                    <div className="detail">
                        <span className="label">{t('reservations.motivation')}</span>
                        <span className="value">{reservation.motivation}</span>
                    </div>
                )
            }
            

            
            
        </div>
    );
};

export default ReservationDetails;
