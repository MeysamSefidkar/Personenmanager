import "./App.css";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import {useImmer} from "use-immer";
import {ToastContainer, toast} from "react-toastify";
import {ContactContext} from "./context/contactContext";

import _ from "lodash";

import {
    AddContact,
    Contacts,
    EditContact,
    Navbar,
    ViewContact,
} from "./components";
import {useEffect} from "react";

import {
    createContact,
    getAllContacts,
    getAllGroups,
    deleteContact,
} from "./services/contactService";
import {
    COMMENT,
    CURRENTLINE,
    FOREGROUND,
    PURPLE,
    YELLOW,
} from "./helpers/colors";

const App = () => {
    const [loading, setLoading] = useImmer(false);
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();
                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);

                setLoading(false);
            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const createContactForm = async (values) => {

        try {
            setLoading(draft => !draft);
            const {status, data} = await createContact(values);
            if (status === 201) {
                toast.success('Der Kontakt wurde erfolgreich erstellt.');

                setContacts(draft => {
                    draft.push(data);
                })

                setFilteredContacts(draft => {
                    draft.push(data);
                })

                setLoading((prevLoading) => !prevLoading);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err.message);
            setLoading((prevLoading) => !prevLoading);
        }
    };

    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div
                        style={{
                            backgroundColor: CURRENTLINE,
                            border: `1px solid ${PURPLE}`,
                            borderRadius: "1em",
                        }}
                        className="p-4"
                    >
                        <h1 style={{color: YELLOW}}>Löschen Sie den Kontakt</h1>
                        <p style={{color: FOREGROUND}}>
                            Sind Sie sicher, dass Sie den Kontakt {contactFullname} löschen
                            möchten?
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{backgroundColor: PURPLE}}
                        >
                            Ich bin sicher
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{backgroundColor: COMMENT}}
                        >
                            ablehnen
                        </button>
                    </div>
                );
            },
        });
    };

    const removeContact = async (contactId) => {

        const contactsBackup = [...contacts];

        try {
            setContacts((draft) => contacts.filter((c) => c.id !== contactId));
            setFilteredContacts((draft) => contacts.filter((c) => c.id !== contactId))

            const {status} = await deleteContact(contactId);
            toast.error('Kontakt erfolgreich gelöscht.')

            if (status !== 200) {
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup);
            }
        } catch (err) {
            console.log(err.message);
            setContacts(contactsBackup);
            setFilteredContacts(contactsBackup);
        }
    };

    const contactSearch = _.debounce(query => {

        if (!query) return setFilteredContacts([...contacts]);

        setFilteredContacts(draft => draft.filter(c => c.fullname.toLowerCase().includes(query.toLowerCase())))
    }, 1000);

    return (
        <ContactContext.Provider value={{
            loading,
            setLoading,
            setContacts,
            filteredContacts,
            setFilteredContacts,
            contacts,
            groups,
            deleteContact: confirmDelete,
            createContact: createContactForm,
            contactSearch,
        }}>
            <div className="App">
                <ToastContainer theme='colored'/>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route
                        path="/contacts"
                        element={
                            <Contacts/>
                        }
                    />
                    <Route
                        path="/contacts/add"
                        element={
                            <AddContact/>
                        }
                    />
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route
                        path="/contacts/edit/:contactId"
                        element={
                            <EditContact/>
                        }
                    />
                </Routes>
            </div>
        </ContactContext.Provider>
    );
};

export default App;
