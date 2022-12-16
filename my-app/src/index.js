import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  //   <React.StrictMode>
  //     <Library />
  //   </React.StrictMode>,
  //   document.getElementById('root')
  // );
  
import Clock from './chapter_04/Clock';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// setInterval(() => {
//   root.render(
//     <React.StrictMode>
//       <Clock />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// }, 1000);

import CommentList from './chapter_05/CommentList';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  //     <React.StrictMode>
  //       <CommentList />
  //     </React.StrictMode>,
  //     document.getElementById('root')
  //   );

import NotificationList from './chapter_06/NotificationList';
  // const root = ReactDOM.createRoot(document.getElementById('root'));
  // root.render(
  //   <React.StrictMode>
  //     <NotificationList />
  //   </React.StrictMode>,
  //   document.getElementById('root')
  //   );
    
import Accommodate from './chapter_07/Accommodate';
// const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(
//     <React.StrictMode>
//       <Accommodate />
//     </React.StrictMode>,
//     document.getElementById('root')
//     );
import ConfirmButton from './chapter_08/ConfirmButton';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//  <React.StrictMode>
//      <ConfirmButton />
//    </React.StrictMode>,
//    document.getElementById('root')
//    );
    
import LandingPage from './chapter_09/LandingPage';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//  <React.StrictMode>
//      <LandingPage />
//    </React.StrictMode>,
//    document.getElementById('root')
//    );
    
import AttendanceBook from './chapter_10/AttendanceBook';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <AttendanceBook />
//     </React.StrictMode>,
//     document.getElementById('root')
//     );

import SignUp from './chapter_11/SignUp';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <SignUp />
//     </React.StrictMode>,
//     document.getElementById('root')
//     );
    
import Calculator from './chapter_12/Calculator';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <Calculator />
//     </React.StrictMode>,
//     document.getElementById('root')
//     );

import ProfileCard from './chapter_13/ProfileCard';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <ProfileCard />
//     </React.StrictMode>,
//     document.getElementById('root')
//     );
    
import DarkOrLight from './chapter_14/DarkOrLight';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <DarkOrLight />
//   </React.StrictMode>,
//   document.getElementById('root')
//   );   
  
import Blocks from './chapter_15/Blocks';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Blocks />
  </React.StrictMode>,
  document.getElementById('root')
  ); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
