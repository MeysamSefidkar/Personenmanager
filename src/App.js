import './App.css';
import Navbar from "./components/Navbar";
import Contacts from "./components/contact/Contacts";
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
