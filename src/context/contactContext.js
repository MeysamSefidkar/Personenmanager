import {createContext} from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => {
    },
    contact: {},
    setContacts: () => {
    },
    filteredContacts: [],
    setFilteredContacts: () => {
    },
    contacts: [],
    groups: [],
    onContactChange: () => {
    },
    deleteContact: () => {
    },
    createContact: () => {
    },
    contactSearch: () => {
    },
});