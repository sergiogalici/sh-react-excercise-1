import * as React from 'react';
import './style.css';

type Reservation = {
  id: number;
  name: string;
  numOfGuests: number;
};

export default function App() {
  const [name, setName] = React.useState<string>('');
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  const [numOfGuests, setNumOfGuests] = React.useState(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleNumOfGuestsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNumOfGuests(Number(e.target.value));
  };

  const handleBookNow = () => {
    setReservations([
      ...reservations,
      {
        id: Date.now(),
        name,
        numOfGuests,
      },
    ]);
  };

  const handleDelete = (index: number): void => {
    setReservations(
      reservations.filter((reservation) => reservation.id !== index)
    );
  };

  const handleSave = (value: number): void => {
    setReservations(
      reservations.map((res) =>
        res.id === Number(value) ? { ...res, id: Number(value) } : res
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Insert your name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="number"
        min="1"
        defaultValue="1"
        onChange={handleNumOfGuestsChange}
      />
      <button onClick={handleBookNow}>Book Now</button>
      {reservations.map((reservation) => (
        <div key={reservation.id}>
          <input type="text" value={reservation.name} />
          <input type="number" min="1" defaultValue={reservation.numOfGuests} />
          <button onClick={() => handleSave(reservation.id)}>Save</button>
          <button onClick={() => handleDelete(reservation.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
