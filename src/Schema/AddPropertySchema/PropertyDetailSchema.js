import * as yup from 'yup';

export default yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required")
});



import "leaflet/dist/leaflet.css";
