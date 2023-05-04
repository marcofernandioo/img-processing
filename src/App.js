// import React, { useState, useRef, createRef } from 'react';
// import { async } from 'async';
// import Frame from './Frame';
// import PythonRunner from './PythonRunner';
// import { useScreenshot, createFileName } from 'use-react-screenshot';

// function App() {
//   const [fileRederList, setFileRederList] = useState([]);
//   const [showImg, setShowImg] = useState(false);
//   const [image, takeScreenshot] = useScreenshot({
//     type: "image/jpg",
//     quality: 1.0
//   });
//   const fileInputRef = useRef(null);
//   const imgRef = createRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowImg(true)
//   }

//   const handleFileInputChange = async (e) => {
//     const newReaders = [];
//     for (let i = 0; i < e.target.files.length; i++) {
//       let filedata = e.target.files[i];
//       const reader = new FileReader(); // reader is async.
//       reader.readAsDataURL(filedata);
//       newReaders.push(reader)
//     }
//     setTimeout(() => {
//       setFileRederList(newReaders);
//     }, 2000)
//   }

//   const handleDownload = () => {
//     takeScreenshot(imgRef.current)
//     .then(download)
//     .catch((err) => {
//       console.log(err);
//     });
//   }

  // const download = (image, { name = "img", extension = "jpg" } = {}) => {
  //   const a = document.createElement("a");
  //   a.href = image;
  //   a.download = createFileName(extension, name);
  //   a.click();
  // };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           name="files"
//           onChange={handleFileInputChange}
//           ref={fileInputRef}
//           multiple
//           accept='image/png , image/jpg , image/jpeg'
//         />
//         <button type="submit">Upload</button>
//       </form>
//       {
//         showImg && fileRederList.map((url, index) => (
//           <div ref={imgRef} style={{borderStyle: "solid", borderColor: "red", width: "20%"}}>
// //             <Frame key = {index} images = {url.result} />
// //           </div>
//         ))
//       }
//       <h1>uh.</h1>
      // <button onClick={handleDownload}>Download</button>
//     </div>
//   );
// }

// export default App;

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Body from './pages/Body'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/body' element={<Body   />} />
        </Routes>
      </Router>
    </>
  ) 
}

export default App