import * as React from 'react';
import './style.css';

type Reservation = {
  id: number;
  name: string;
  numOfGuests: number;
};

type ResCompProps = {
  id: number;
  name: string;
  numOfGuests: number;
  handleSave: (id: number) => void;
  handleDelete: (id: number) => void;
};

const ResComponent = ({
  id,
  name,
  numOfGuests,
  handleSave,
  handleDelete,
}: ResCompProps) => {
  return (
    <div key={id}>
      <input type="text" value={name} />
      <input type="number" min="1" defaultValue={numOfGuests} />
      <button onClick={() => handleSave(id)}>Save</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );
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
    if (!name.length) {
      return;
    }
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
      {reservations.map((res) => (
        <ResComponent
          id={res.id}
          name={res.name}
          numOfGuests={res.numOfGuests}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
