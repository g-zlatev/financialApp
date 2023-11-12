import React from 'react'
import ReactDOM from 'react-dom/client'
// import './FrontPage.css'
// import FrontPage from './FrontPage'
import { PageWithModal } from './PageWithModal'
import './PageWithModal.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <FrontPage /> */}
    <PageWithModal />
  </React.StrictMode>
)
