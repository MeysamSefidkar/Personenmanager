import {Link} from "react-router-dom";

import {Spinner} from "../";
import {COMMENT, GREEN, PURPLE} from "../../helpers/colors";
import {Fragment} from "react";

const AddContact = ({loading, contact, setContactInfo, groups, createContactForm}) => {
    return (
        <Fragment>
            {loading ? (
                <Spinner/>
            ) : (
                <Fragment>
                    <section className='p-3'>
                        <img src={require("../../assets/man-taking-note.png")}
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
                                    <form onSubmit={createContactForm}>
                                        <div className='mb-2'>
                                            <input name='fullname' value={contact.fullname} onChange={setContactInfo}
                                                   type='text' className='form-control'
                                                   placeholder='Vorname und Nachname' required={true}/>
                                        </div>
                                        <div className='mb-2'>
                                            <input name='photo' value={contact.photo} onChange={setContactInfo}
                                                   type='text' className='form-control' required={true}
                                                   placeholder='Fotoadresse'/>
                                        </div>
                                        <div className='mb-2'>
                                            <input name='mobile' value={contact.mobile} onChange={setContactInfo}
                                                   type='number' className='form-control' required={true}
                                                   placeholder='Handynummer'/>
                                        </div>
                                        <div className='mb-2'>
                                            <input name='email' value={contact.email} onChange={setContactInfo}
                                                   type='email' className='form-control' required={true}
                                                   placeholder='Email Adresse'/>
                                        </div>
                                        <div className='mb-2'>
                                            <input name='job' value={contact.job} onChange={setContactInfo} type='text'
                                                   className='form-control' required={true}
                                                   placeholder='Arbeit'/>
                                        </div>
                                        <div className='mb-2'>
                                            <select name='group' value={contact.group} onChange={setContactInfo}
                                                    required={true} className='form-control'>
                                                <option value="">
                                                    Wähle die Gruppe
                                                </option>
                                                {groups.length > 0 && groups.map((group) => (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='mx-2'>
                                            <input type='submit' className='btn' style={{backgroundColor: PURPLE}}
                                                   value='Bauen Sie ein Publikum auf'/>
                                            <Link to={"/contacts"} className='btn mx-2'
                                                  style={{backgroundColor: COMMENT}}>
                                                ablehnen
                                            </Link>
                                        </div>
                                    </form>
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