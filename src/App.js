// import logo from './logo.svg';
import React from 'react';
import './App.css';
import contactsJson from './contacts.json'

function App() {
  const [contacts, setContacts] = React.useState(contactsJson.slice(0,5));
  const [remContacts, setRemContacts] = React.useState(contactsJson.slice(5,contactsJson.length-5));

  const addContact = () => {
    let num = Math.floor(Math.random() * (remContacts.length))
    let contactsCopy = [...contacts]
    let remContactsCopy = [...remContacts]
    
    if (remContacts.length >0){
      setContacts(contactsCopy.concat(remContacts[num]))
      remContactsCopy.splice(num,1)
      setRemContacts(remContactsCopy)
    }
  }

  const sortPop = () => {
    let contactsCopy = [...contacts]
    contactsCopy.sort(function(a,b) {
      return b.popularity-a.popularity
    })
    setContacts(contactsCopy)
  }

  const sortName = () => {
    let contactsCopy = [...contacts]
    contactsCopy.sort(function(a,b) {
      return a.name.localeCompare(b.name)
    })
    setContacts(contactsCopy)
  }

  const deleteRow = (celebToRemove) => {
    let filteredArr = contacts.filter(function(celeb){
      return celeb.id !== celebToRemove;
    })
    let filteredCeleb = contacts.filter(function(celeb){
      return celeb.id == celebToRemove;
    })
    setContacts(filteredArr);
    setRemContacts(remContacts.concat(filteredCeleb));
  }

  return (
    <div className="App">
    <h1><b>Iron Contacts</b></h1>
      <table>
      <tr>
        <button onClick={addContact}>Add Contact</button>
        <button onClick={sortPop}>Sort by popularity</button>
        <button onClick={sortName}>Sort by name</button>
      </tr>
      <tr>
        <th><b>Picture</b></th>
        <th><b>Name</b></th>
        <th><b>Popularity</b></th>
        <th><b>Won <br></br> Oscar</b></th>
        <th><b>Won <br></br> Emmy</b></th>
        <th><b>Actions</b></th>
      </tr>
        {contacts.map(function(contact) {
          return(
            <tr>
            <td>
            <img src={contact.pictureUrl} alt='pic' width='100px'/>
            </td>
            <td>{contact.name}</td>
            <td>{contact.popularity.toFixed(2)}</td>
            <td>{contact.wonOscar ? "🏆": ""}</td>
            <td>{contact.wonEmmy ? "🏆": ""}</td>
            <td>
              <button onClick = {() => deleteRow(contact.id)}>
                Delete
              </button>
            </td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default App;
