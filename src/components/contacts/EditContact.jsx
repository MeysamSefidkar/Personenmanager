import {useEffect, useState, useContext} from "react";

import {Link, useNavigate, useParams} from "react-router-dom";
import {ContactContext} from "../../context/contactContext";
import {
    getContact,
    updateContact,
} from "../../services/contactService";
import {Spinner} from "../";
import {COMMENT, ORANGE, PURPLE} from "../../helpers/colors";
import {contactSchema} from "../../validations/contactValidation";
import {ErrorMessage, Field, Form, Formik} from "formik";

const EditContact = () => {
    const {contactId} = useParams();
    const {contacts, setContacts, loading, setLoading, groups, setFilteredContacts} = useContext(ContactContext);

    const navigate = useNavigate();

    const [contact, setContact] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const {data: contactData} = await getContact(contactId);

                setLoading(false);
                setContact(contactData);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const submitForm = async (valeus) => {
        try {
            setLoading(true);
            const {data, status} = await updateContact(valeus, contactId);

            if (status === 200) {
                setLoading(false);

                const allContacts = [...contacts];
                const contactIndex = allContacts.findIndex(c => c.id === parseInt(contactId));
                allContacts[contactIndex] = {...data};
                setContacts(allContacts);
                setFilteredContacts(allContacts);

                navigate("/contacts");
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };


    return (
        <>
            {loading ? (
                <Spinner/>
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{color: ORANGE}}>
                                        Zielgruppe bearbeiten
                                    </p>
                                </div>
                            </div>
                            <hr style={{backgroundColor: ORANGE}}/>
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{backgroundColor: "#44475a", borderRadius: "1em"}}
                            >
                                <div className="col-md-8">
                                    <Formik
                                        initialValues={contact}
                                        validationSchema={contactSchema}
                                        onSubmit={(values) => {
                                            submitForm(values);
                                        }}>
                                        <Form>
                                            <div className='mb-2'>
                                                <Field name='fullname'
                                                       type='text' className='form-control'
                                                       placeholder='Vorname und Nachname'/>
                                                <ErrorMessage name='fullname' render={
                                                    (msg) => (
                                                        <div className='text-danger'>{msg}</div>
                                                    )
                                                }/>
                                            </div>
                                            <div className='mb-2'>
                                                <Field name='photo'
                                                       type='text' className='form-control'
                                                       placeholder='Fotoadresse'/>
                                                <ErrorMessage name='photo' render={
                                                    (msg) => (
                                                        <div className='text-danger'>{msg}</div>
                                                    )
                                                }/>
                                            </div>
                                            <div className='mb-2'>
                                                <Field name='mobile'
                                                       type='number' className='form-control'
                                                       placeholder='Handynummer'/>
                                                <ErrorMessage name='mobile' render={
                                                    (msg) => (
                                                        <div className='text-danger'>{msg}</div>
                                                    )
                                                }/>
                                            </div>
                                            <div className='mb-2'>
                                                <Field name='email'
                                                       type='email' className='form-control'
                                                       placeholder='Email Adresse'/>
                                                <ErrorMessage name='email' render={
                                                    (msg) => (
                                                        <div className='text-danger'>{msg}</div>
                                                    )
                                                }/>
                                            </div>
                                            <div className='mb-2'>
                                                <Field name='job'
                                                       type='text'
                                                       className='form-control'
                                                       placeholder='Arbeit'/>
                                                <ErrorMessage name='job' render={
                                                    (msg) => (
                                                        <div className='text-danger'>{msg}</div>
                                                    )
                                                }/>
                                            </div>
                                            <div className='mb-2'>
                                                <Field name='group'
                                                       as='select'
                                                       className='form-control'>
                                                    <option value="">
                                                        Wähle die Gruppe
                                                    </option>
                                                    {groups.length > 0 && groups.map((group) => (
                                                        <option key={group.id}
                                                                value={group.id}>{group.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name='group' render={
                                                    (msg) => (
                                                        <div className='text-danger'>{msg}</div>
                                                    )
                                                }/>
                                            </div>
                                            <div className='mx-2'>
                                                <input type='submit' className='btn'
                                                       style={{backgroundColor: PURPLE}}
                                                       value='Zielgruppe bearbeiten'/>
                                                <Link to={"/contacts"} className='btn mx-2'
                                                      style={{backgroundColor: COMMENT}}>
                                                    ablehnen
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                                <div className="col-md-4">
                                    <img
                                        src={contact.photo}
                                        className="img-fluid rounded"
                                        style={{border: `1px solid ${PURPLE}`}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../assets/man-taking-note.png")}
                                height="300px"
                                style={{opacity: "60%"}}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact;


