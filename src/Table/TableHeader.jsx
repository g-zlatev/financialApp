/* eslint-disable react/prop-types */
const TableHeader = ({ headerNames }) => {
    const generateTableHeader = () => (
        Object.values(headerNames).map((header, index) => (
            <th key={index}>{header}</th>
        ))
    )

    return (
        <thead>
            <tr>
                {generateTableHeader()}
            </tr>
        </thead>
    );
};

export default TableHeader