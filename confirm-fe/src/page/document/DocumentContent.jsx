import { useEffect } from "react";
import { convertDateTime } from "../../converter/DateTimeConvert";

export default function DocumentContent({
    modalOpen,
    documentElement = {},
    documentValue = {},
    setDocumentElements,
    setDocumentContents }) {

    useEffect(() => {
        if (!modalOpen) {
            setDocumentElements([]);
            setDocumentContents({});
        }
    }, [modalOpen])

    const findElements = documentElement.elements
    findElements.map(element => {
        if (element.elementKey.includes('.')) {
            const elementKeys = element.elementKey.split('.');
            // 쌉 하드 코딩이라 해결책 찾아야됨 - 날짜 처리임
            element.elementValue = convertDateTime(documentValue[elementKeys[0]][0][elementKeys[1]], true);
            // 쌉 하드 코딩이라 해결책 찾아야됨
        }
        else if (documentValue[element.elementKey]) {
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
                        <tr key={data.elementKey}>
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