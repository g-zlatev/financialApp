/* eslint-disable react/prop-types */
import { useState } from 'react';
import Tesseract from 'tesseract.js';

const FrontPage = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'null',
    issueDate: 'null',
    receiver: 'null',
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const result = await Tesseract.recognize(
        file,
        'bul+eng',
      );
      console.log(result.data.text)

      setInvoiceData({
        invoiceNumber: extractInvoiceNumber(result.data.text),
        issueDate: extractInvoiceNumber(result.data.text),
        receiver: extractInvoiceNumber(result.data.text),
      });
    }
  };

  const extractInvoiceNumber = (text) => {
    // Replace this with your actual data extraction logic
    const regex = /Invoice Number: (\w+)/i;
    const match = text.match(regex);
    return match ? match[1] : 'Not Found';
  };

  return (
    <div className='container'>
      <h1>Invoice Information</h1>

      <input type="file" accept="image/*" onChange={handleFileUpload} />

      <table>
        <thead>
          <tr>
            <th>Фактура №</th>
            <th>Дата на издаване</th>
            <th>Получател</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoiceData.invoiceNumber}</td>
            <td>{invoiceData.issueDate}</td>
            <td>{invoiceData.receiver}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FrontPage;
