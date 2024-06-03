
export default function DocumentContent({ content = {} }) {

    return (
        <>
            <tr>
                <th className="ct_thh" colSpan={4}>
                    {content.subTitle}
                </th>
            </tr>
            {content.body.map(data => (
                data.colSpan === 1 ?
                    <tr>
                        <th className="ct_tbh">{data.key}</th>
                        <td className="ct_tbd">{data.value}</td>
                    </tr> :
                    <tr>
                        <th className="ct_tbh">{data.key}</th>
                        <td className="ct_tbd">{data.value}</td>
                        <th className="ct_tbh">{data.key}</th>
                        <td className="ct_tbd">{data.value}</td>
                    </tr>
            ))}
            <div style={{ 'margin': '10px' }}></div>
        </>
    )
}