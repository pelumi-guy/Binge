// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { InputText } from 'primereact/inputtext';
// import React from 'react';

// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="md"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >

//       <Modal.Body>
//       <InputText
//           type="file"
//           accept="image/*"
//         //   style={{display: "none"}}
//           onChange={(event) => {
//             const file = event.target.files[0];
//           }}
//         />
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//         backdrop = "static"
//       />
//     </>
//   );
// };

// export default App
