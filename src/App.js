import './App.css';
import {AddContact, Contact, Contacts, EditContact, Navbar, ViewContact} from "./components";
import {useState} from "react";

const App = () => {

    const [loading, setLoading] = useState(false);
    const [getContacts, setContacts] = useState([]);

    return (
        <div className="App">
            <Navbar/>
            <Contacts contacts={getContacts} loading={loading}/>
        </div>
    );
}

export default App;
