
export default function DocumentContent({ documentElement = {}, documentValue = {} }) {
    // 여기서 데이터 조합하자.
    console.log('documentValue', documentValue);
    const findElements = documentElement.elements
    findElements.map(element => {
        if (documentValue[element.elementKey]) {
            element.elementValue = documentValue[element.elementKey];
        }
    })

    return (
        <>
            <table className="ct_table">
                <tbody>
                    <tr>
                        <th className="ct_thh" colSpan={2}>
                            {documentElement.elementGroup}
                        </th>
                    </tr>
                    {findElements.map(data => (
                        <tr>
                            <th aria-label={data.elementKey} className="ct_tbh">{data.elementName}</th>
                            <td aria-label={data.elementKey} className="ct_tbd">{data.elementValue ? data.elementValue : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ 'margin': '10px' }}></div>
        </>
    )
}