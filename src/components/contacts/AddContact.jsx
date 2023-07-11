import {Link} from "react-router-dom";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";
import {Spinner} from "../";
import {COMMENT, GREEN, PURPLE} from "../../helpers/colors";
import {Fragment} from "react";
import {useFormik} from 'formik';
import {contactSchema} from "../../validations/contactValidation";

const AddContact = () => {

    const {loading, groups, createContact} = useContext(ContactContext);
    const formik = useFormik({
        initialValues: {
            fullname: '',
            photo: '',
            mobile: '',
            email: '',
            job: '',
            group: '',
        },
        validationSchema: contactSchema,
        onSubmit: (values) => {
            createContact(values);
        }
    });

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
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className='mb-2'>
                                            <input name='fullname' id='fullname' value={formik.values.fullname}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   type='text' className='form-control'
                                                   placeholder='Vorname und Nachname'/>
                                            {formik.touched.fullname && formik.errors.fullname ? (
                                                <div className='text-danger'>{formik.errors.fullname}</div>
                                            ) : null}
                                        </div>
                                        <div className='mb-2'>
                                            <input name='photo' id='photo' value={formik.values.photo}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   type='text' className='form-control'
                                                   placeholder='Fotoadresse'/>
                                            {formik.touched.photo && formik.errors.photo ? (
                                                <div className='text-danger'>{formik.errors.photo}</div>
                                            ) : null}
                                        </div>
                                        <div className='mb-2'>
                                            <input name='mobile' id='mobile' value={formik.values.mobile}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   type='number' className='form-control'
                                                   placeholder='Handynummer'/>
                                            {formik.touched.mobile && formik.errors.mobile ? (
                                                <div className='text-danger'>{formik.errors.mobile}</div>
                                            ) : null}
                                        </div>
                                        <div className='mb-2'>
                                            <input name='email' id='email' value={formik.values.email}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   type='email' className='form-control'
                                                   placeholder='Email Adresse'/>
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className='text-danger'>{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className='mb-2'>
                                            <input name='job' id='job' value={formik.values.job}
                                                   onChange={formik.handleChange}
                                                   onBlur={formik.handleBlur}
                                                   type='text'
                                                   className='form-control'
                                                   placeholder='Arbeit'/>
                                            {formik.touched.job && formik.errors.job ? (
                                                <div className='text-danger'>{formik.errors.job}</div>
                                            ) : null}
                                        </div>
                                        <div className='mb-2'>
                                            <select name='group' id='group' value={formik.values.group}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    className='form-control'>
                                                <option value="">
                                                    Wähle die Gruppe
                                                </option>
                                                {groups.length > 0 && groups.map((group) => (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                ))}
                                            </select>
                                            {formik.touched.group && formik.errors.group ? (
                                                <div className='text-danger'>{formik.errors.group}</div>
                                            ) : null}
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