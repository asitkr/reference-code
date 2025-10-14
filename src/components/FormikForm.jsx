// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6MB

// const FormikFileForm = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Validation Schema
//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First name required"),
//     lastName: Yup.string().required("Last name required"),
//     email: Yup.string().email("Invalid email").required("Email required"),
//     city: Yup.string().required("City is required"),
//     resume: Yup.mixed()
//       .required("PDF file is required")
//       .test(
//         "fileType",
//         "Only PDF files are allowed",
//         (value) => value && value.type === "application/pdf"
//       )
//       .test(
//         "fileSize",
//         "File too large. Max size is 6MB",
//         (value) => value && value.size <= MAX_FILE_SIZE
//       ),
//   });

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     city: "",
//     resume: null,
//   };

//   const handleSubmit = (values, { resetForm }) => {
//     console.log("Form Data:", values);
//     alert("Form submitted successfully!");
//     resetForm();
//     setSelectedFile(null);
//   };

// //   const handleFileChange = (event, setFieldValue) => {
// //     const file = event.currentTarget.files[0];
// //     setFieldValue("resume", file);
// //     setSelectedFile(file);
// //   };

// //   const removeFile = (setFieldValue) => {
// //     setFieldValue("resume", null);
// //     setSelectedFile(null);
// //   };

// const handleFileChange = (event, setFieldValue) => {
//   const file = event.currentTarget.files[0];
//   if (file) {
//     setFieldValue("resume", file);
//     setSelectedFile(file);
//     // Reset the input so the same file can be selected again
//     event.target.value = null;
//   }
// };

// const removeFile = (setFieldValue) => {
//   setFieldValue("resume", null);
//   setSelectedFile(null);
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
//         <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ setFieldValue }) => (
//             <Form className="space-y-4">
//               {/* First Name */}
//               <div>
//                 <label className="block mb-1 font-medium">First Name</label>
//                 <Field
//                   name="firstName"
//                   type="text"
//                   placeholder="Enter first name"
//                   className="w-full p-2 border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="firstName"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label className="block mb-1 font-medium">Last Name</label>
//                 <Field
//                   name="lastName"
//                   type="text"
//                   placeholder="Enter last name"
//                   className="w-full p-2 border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="lastName"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block mb-1 font-medium">Email</label>
//                 <Field
//                   name="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full p-2 border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               {/* City Dropdown */}
//               <div>
//                 <label className="block mb-1 font-medium">City</label>
//                 <Field
//                   as="select"
//                   name="city"
//                   className="w-full p-2 border rounded-md"
//                 >
//                   <option value="">Select City</option>
//                   <option value="New York">New York</option>
//                   <option value="Los Angeles">Los Angeles</option>
//                   <option value="Chicago">Chicago</option>
//                   <option value="Houston">Houston</option>
//                   <option value="Miami">Miami</option>
//                 </Field>
//                 <ErrorMessage
//                   name="city"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               {/* Resume Upload */}
//               <div>
//                 <label className="block mb-1 font-medium">Resume (PDF only, max 6MB)</label>
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   onChange={(event) => handleFileChange(event, setFieldValue)}
//                   className="w-full p-2 border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="resume"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />

//                 {/* File Preview */}
//                 {selectedFile && (
//                   <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded-md">
//                     <div>
//                       <p className="font-medium">{selectedFile.name}</p>
//                       <p className="text-gray-600 text-sm">
//                         {(selectedFile.size / 1024).toFixed(2)} KB
//                       </p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeFile(setFieldValue)}
//                       className="text-red-500 font-bold px-2 py-1 hover:bg-red-100 rounded-md"
//                     >
//                       X
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
//               >
//                 Submit
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default FormikFileForm;


import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const MAX_FILE_SIZE = 6 * 1024 * 1024; // 6MB

const FormikDefaultForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState("");

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        city: Yup.string().required("City is required"),
        resume: Yup.mixed()
            .required("PDF file is required")
            .test("fileType", "Only PDF files are allowed", (value) =>
                value ? value.type === "application/pdf" : false
            )
            .test("fileSize", "File too large. Max size is 6MB", (value) =>
                value ? value.size <= MAX_FILE_SIZE : false
            ),
    });

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        resume: null,
    };

    // const handleFileChange = (event, setFieldValue) => {
    //     const file = event.currentTarget.files[0];

    //     if (!file) return;

    //     // Validate file type
    //     if (file.type !== "application/pdf") {
    //         alert("Only PDF files are allowed");
    //         event.target.value = null; // reset input
    //         return;
    //     }

    //     // Validate file size
    //     if (file.size > MAX_FILE_SIZE) {
    //         alert("File too large. Max size is 6MB");
    //         event.target.value = null; // reset input
    //         return;
    //     }

    //     // If valid, set file
    //     setFieldValue("resume", file);
    //     setSelectedFile(file);

    //     event.target.value = null; // allow reselecting the same file
    // };

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];

        if (!file) return;

        // Reset previous errors
        setFileError("");

        // Validate file type
        if (file.type !== "application/pdf") {
            setFileError("Only PDF files are allowed");
            setFieldValue("resume", null);
            setSelectedFile(null);
            event.target.value = null; // reset input so same file can be reselected
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setFileError("File too large. Max size is 6MB");
            setFieldValue("resume", null);
            setSelectedFile(null);
            event.target.value = null; // reset input
            return;
        }

        // If valid, set file
        setFieldValue("resume", file);
        setSelectedFile(file);
        event.target.value = null; // allow reselecting the same file
    };

    const removeFile = (setFieldValue) => {
        setFieldValue("resume", null);
        setSelectedFile(null);
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log("Form Data:", values);
        alert("Form submitted successfully!");
        resetForm();
        setSelectedFile(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, setFieldValue, handleBlur }) => (
                        <Form className="space-y-4">
                            {/* First Name */}
                            <div>
                                <label className="block mb-1 font-medium">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter first name"
                                    className="w-full p-2 border rounded-md"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block mb-1 font-medium">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter last name"
                                    className="w-full p-2 border rounded-md"
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your email"
                                    className="w-full p-2 border rounded-md"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* City Dropdown */}
                            <div>
                                <label className="block mb-1 font-medium">City</label>
                                <select
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="">Select City</option>
                                    <option value="New York">New York</option>
                                    <option value="Los Angeles">Los Angeles</option>
                                    <option value="Chicago">Chicago</option>
                                    <option value="Houston">Houston</option>
                                    <option value="Miami">Miami</option>
                                </select>
                                <ErrorMessage
                                    name="city"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Resume Upload */}
                            <div>
                                <label className="block mb-1 font-medium">
                                    Resume (PDF only, max 6MB)
                                </label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(event) => handleFileChange(event, setFieldValue)}
                                    className="w-full p-2 border rounded-md"
                                />

                                {/* File error message */}
                                {fileError && (
                                    <div className="h-10 w-full bg-red-400 text-white text-sm mt-1">
                                        <p className="h-full mb-auto flex items-center">{fileError}</p>
                                    </div>
                                )}

                                {/* File Preview */}
                                {selectedFile && (
                                    <div className="mt-2 flex items-center justify-between bg-teal-100 p-2 rounded-md">
                                        <div>
                                            <p className="font-medium">{selectedFile.name}</p>
                                            <p className="text-gray-600 text-sm">
                                                {(selectedFile.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(setFieldValue)}
                                            className="text-red-500 font-bold px-2 py-1 hover:bg-red-100 rounded-md"
                                        >
                                            X
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default FormikDefaultForm;

