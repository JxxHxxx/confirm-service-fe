
export default function DocumentContentV2({
    documentElements
    , contents }) {

    const renderTable = (documentElement) => {
        let oneElements;
        switch (documentElement.elementGroupType) {
            case 'PAIR':
                oneElements = documentElement.elements.sort((e1, e2) => e1.elementOrder - e2.elementOrder);
                return <>
                    <table className="confirm_document_table">
                        <tbody>
                            <tr className="cdt_th_name">
                                <th colSpan={2}>{documentElement.elementGroupName}</th>
                            </tr>
                            {documentElement.elements.map(element =>
                                <tr key={element.elementKey}>
                                    <td className="cdt_pair_td_name">{element.elementName}</td>
                                    <td className="cdt_td_val">{contents[element.elementKey]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div style={{ marginBottom: '20px' }}></div>
                </>
            // 배열 타입의 데이터 => 테이블 화
            case 'ARRAY':
                oneElements = documentElement.elements.sort((e1, e2) => e1.elementOrder - e2.elementOrder); // 요소 순서가 보장되지 않아 정렬
                // elementKey 는 depth 를 . 으로 구분 vacation_durations.startDateTime 이런식 elementKeyArray 에는 [vacation_durations] 이 담김
                // depth 는 최대 2까지만 가질 수 있음
                const parentElementKey = oneElements[0].elementKey.split('.')[0];
                // console.log(parentElementKey)
                // depth=2 인 startDateTime 을 담기 위한 배열
                let childrenElementKeys = [];
                // oneElements[idx].elementKey 에는 vacation_durations.startDateTime, vacation_durations.endDateTime 같이 존재
                // startDateTime, endDateTime 을 담기 위한 작업
                for (const idx in oneElements) {
                    childrenElementKeys.push(oneElements[idx].elementKey.split('.')[1])
                }

                return <>
                    <table className="confirm_document_table">
                        <tbody>
                            <tr className="cdt_th_name">
                                <th colSpan={10}>{documentElement.elementGroupName}</th>
                            </tr>
                            <tr key='array_col_name'>
                                <td className="cdt_td_name">No</td>
                                {oneElements.map((element, index) =>
                                    <>
                                        <td className="cdt_td_name" key={element.elementKey + index}>{element.elementName}</td>
                                    </>
                                )}
                            </tr>
                            {contents[parentElementKey].map((parentContent, index) => <>
                                <tr key='array_col_val'>
                                    <td key={index}>{index}</td>
                                    {childrenElementKeys.map(keyName => <td
                                        className="cdt_td_val"
                                        key={keyName + index}>{parentContent[keyName]}</td>)}
                                </tr>
                            </>)}
                        </tbody>
                    </table>
                    <div style={{ marginBottom: '20px' }}></div>
                </>

        }
    }

    return <>
        {documentElements.map(documentElement => renderTable(documentElement))}
    </>
}