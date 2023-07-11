import * as Yup from 'yup';


export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required('Vor- und Nachname sind erforderlich'),
    photo: Yup.string().url("Die Adresse ist ungültig").required("Das Kontaktbild ist erforderlich"),
    mobile: Yup.number().required('Handynummer ist erforderlich'),
    email: Yup.string().email('Die E-Mail-adresse ist nicht gültig').required('E-Mail Adresse wird benötigt'),
    job: Yup.string().nullable().required(),
    group: Yup.string().required('Gruppenauswahl ist erforderlich'),
});