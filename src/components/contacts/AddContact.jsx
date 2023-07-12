import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";
import {Spinner} from "../";
import {COMMENT, GREEN, PURPLE} from "../../helpers/colors";
import {Fragment} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {contactSchema} from "../../validations/contactValidation";

const AddContact = () => {

    const {loading, groups, createContact} = useContext(ContactContext);


    return (
        <Fragment>
            {loading ? (
                <Spinner/>
            ) : (
                <Fragment>
                    <section className='p-3'>
                        <img src={require("../../assets/man-taking-note.png")}
                             alt=''
                             height="400px" style={{
                            position: 'absolute', zIndex: "-1",
                            top: "130px", right: "100px", opacity: "50%",
                        }}
                        />
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <p className='h4 fw-bold text-center' style={{color: GREEN}}>
                                        Erstellen Sie eine neue Zielgruppe
                                    </p>
                                </div>
                            </div>
                            <hr style={{backgroundColor: GREEN}}/>
                            <div className='row mt-5'>
                                <div className='col-md-4'>
                                    <Formik
                                        initialValues={{
                                            fullname: '',
                                            photo: '',
                                            mobile: '',
                                            email: '',
                                            job: '',
                                            group: '',
                                        }}
                                        validationSchema={contactSchema}
                                        onSubmit={(values) => {
                                            createContact(values);
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
                                                       value='Bauen Sie ein Publikum auf'/>
                                                <Link to={"/contacts"} className='btn mx-2'
                                                      style={{backgroundColor: COMMENT}}>
                                                    ablehnen
                                                </Link>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fragment>
            )
            }
        </Fragment>
    )
}

export default AddContact;