/* eslint-disable react/prop-types */
const TableBody = ({ rowData }) => {
    const generateTableRow = () => (
        Object.values(rowData).map((data, index) => (
            <td contentEditable='true' key={index}>{data}</td>
        ))
    )

    return (
        <tbody>
            <tr>
                {generateTableRow()}
            </tr>
        </tbody>
    );
};

export default TableBody
