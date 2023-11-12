/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Modal from 'react-modal';
import Loader from './Loader';
import TableHeader from './Table/TableHeader'
import TableBody from './Table/TableBody'

Modal.setAppElement('#root'); // Set the root element for accessibility

export const PageWithModal = () => {

  const headerNames = {
    invoiceNumber: 'Фактура №',
    issueDate: 'Дата на издаване',
    receiver: 'Получател',
    paymentAmount: 'Сума за плащане'
  }

  const [extractedData, setExtractedData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ocrMatches, setOcrMatches] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    setRowData({
      invoiceNumber: '0000000001',
      issueDate: '10.10.2023',
      receiver: 'Фирма 1',
      paymentAmount: '100.00лв'
    })
  }, [])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    setLoading(true)

    if (file) {
      Tesseract.recognize(
        file,
        'bul+eng'
      )
        .then(({ data }) => {
          // setExtractedData(parseExtractedData(data));
          setExtractedData(data);
          console.log(data)
          setLoading(false)
          setModalIsOpen(true);
        });
    }

  };

  const parseExtractedData = (text) => {
    // Implement your logic to parse the OCR results and extract structured data
    // For simplicity, let's assume the data is already structured as key-value pairs
    return text;
  };

  const handleDataValidation = (rowIndex) => {
    setCurrentRow(rowIndex);
    setModalIsOpen(true);
  };

  const handleSubmitValidation = (userResponse) => {
    // Update the extracted data with the user-validated information for the current row
    setExtractedData((prevData) => {
      const newData = [...prevData];
      newData[currentRow] = userResponse;
      return newData;
    });

    setModalIsOpen(false);
  };

  return (
    <div className='container'>
      <h1>Invoice Information</h1>

      <input type="file" accept="image/*" onChange={handleFileUpload} />

      <Loader loading={loading} />

      <table>
        <TableHeader headerNames={headerNames} />
        <TableBody rowData={rowData} />
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Data Validation Modal"
      >
        {Object.values(headerNames).map((header, index) => {
          <>
            <h2>Validate Data for Row {header}</h2>
            <div key={index}>
              <p>columnName: {header}</p>
            </div>
          </>
        })
        }
        {/* 
        <h2>Validate Data for Row {currentRow + 1}</h2>
        {extractedData[currentRow] &&
          Object.keys(extractedData[currentRow]).map((columnName) => (
            <div key={columnName}>
              <p>{columnName}: {extractedData[currentRow][columnName]}</p>
            </div>
          ))} */}
        <button onClick={() => handleSubmitValidation(currentRow)}>
          Submit
        </button>
      </Modal>
    </div>
  );
};
