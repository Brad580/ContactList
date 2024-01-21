import { useState, useEffect } from 'react'; // No need to import React here
import PropTypes from 'prop-types';
import ContactRow from './ContactRow';

export default function ContactList({ setSelectedContactId }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }

    fetchContacts();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <ContactRow 
            key={contact.id} 
            contact={contact} 
            setSelectedContactId={setSelectedContactId} 
          />
        ))}
      </tbody>
    </table>
  );
}

ContactList.propTypes = {
  setSelectedContactId: PropTypes.func.isRequired,
};
