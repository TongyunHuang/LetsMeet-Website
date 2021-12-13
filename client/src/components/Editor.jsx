// // import React from "react";
// // import { CKEditor } from "@ckeditor/ckeditor5-react";
// // import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Card, Button } from "@mui/material";

// export default function Editor() {
//   const [value, setValue] = useState("");
//   return (
//     <Card
//       style={{
//         height: "50vh",
//         width: "60vw",
//         margin: "50px",
//         marginLeft: "100px",
//         float: "right",

//         position: "relative",
//       }}
//     >
//       <ReactQuill
//         style={{ overflowY: "auto" }}
//         theme="snow"
//         value={value}
//         onChange={setValue}
//       />
//       <Button
//         variant="contained"
//         style={{
//           // float: "right",
//           margin: "2%",
//           position: "absolute",
//           right: "0px",
//           bottom: "0px",
//         }}
//         color="primary"
//       >
//         Submit
//       </Button>
//     </Card>
//   );
// }
