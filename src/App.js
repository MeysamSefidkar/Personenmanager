import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";

import {AddContact, Contact, Contacts, EditContact, Navbar, ViewContact} from "./components";
import {useState} from "react";

const App = () => {

    const [loading, setLoading] = useState(false);
    const [getContacts, setContacts] = useState([]);

    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path='/' element={<Navigate to='/contacts'/>}/>
                <Route path='/contacts' element={<Contacts contacts={getContacts} loading={loading}/>}/>
                <Route path='/contacts/add' element={<AddContact/>}/>
                <Route path='/contacts/:contactId' element={<ViewContact/>}/>
                <Route path='/contacts/edit/:contactId' element={<EditContact/>}/>
            </Routes>
        </div>
    );
}

export default App;
