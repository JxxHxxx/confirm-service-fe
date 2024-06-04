
export default function DocumentContent({ content = {} }) {
    const oneContentElement = Object.values(content.body[0]);
    const colspan = oneContentElement !== undefined ? oneContentElement.length : 0;  

    function isHeaderElement(index) {
        return index % 2 === 0;
    }
    
    return (
        <table className="ct_table">
            <tbody>
                <tr>
                    <th className="ct_thh" colSpan={colspan}>
                        {content.subTitle}
                    </th>
                </tr>
                {content.body.map(data => (
                    <tr>
                        {Object.entries(data).map((data, index) => (
                            <>
                            {/* index 짝수일 경우에는 이름 홀수일 경우에는 값 */}
                                {isHeaderElement(index) ?
                                    <th aria-label={data[0]} className="ct_tbh">{data[1]}</th> :
                                    <td aria-label={data[0]} className="ct_tbd">{data[1]}</td>
                                }
                            </>
                        ))}
                    </tr>
                ))}
                <div style={{ 'margin': '10px' }}></div>
            </tbody>
        </table>
    )
}