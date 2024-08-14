



export default function DocumentContentV2({ documentElements
    , contents }) {

    const renderTable = (documentElement) => {
        let oneElements;
        switch (documentElement.elementGroupType) {
            case 'PAIR':
                oneElements = documentElement.elements.sort((e1, e2) => e1.elementOrder - e2.elementOrder);
                return <>
                    <table>
                        <tbody>
                            <tr>{documentElement.elementGroupName}</tr>
                            {documentElement.elements.map(element =>
                                <tr key={element.elementKey}>
                                    <td>{element.elementName}</td>
                                    <td>{contents[element.elementKey]}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>

            case 'ARRAY':
                oneElements = documentElement.elements.sort((e1, e2) => e1.elementOrder - e2.elementOrder);
                const arrayName = oneElements[0].elementKey.split('.')[0];

                let tmpKeyNames = [];
                for (const idx in oneElements) {
                    tmpKeyNames.push(oneElements[idx].elementKey.split('.')[1])
                }

                return <>
                    <table>
                        <tbody>
                            <tr>{documentElement.elementGroupName}</tr>
                            <tr key='array_col_name'>
                                <td>No</td>
                                {oneElements.map((element, index) =>
                                    <>
                                        <td key={element.elementKey + index}>{element.elementName}</td>
                                    </>
                                )}
                            </tr>
                            {contents[arrayName].map((arrayContent, index) => <>
                                <tr key='array_col_val'>
                                    <td>{index}</td>
                                    {tmpKeyNames.map(keyName => <td>
                                        {arrayContent[keyName]}
                                    </td>)}
                                </tr>
                            </>)}
                        </tbody>
                    </table>
                </>

        }
    }

    return <>
        {documentElements.map(documentElement => renderTable(documentElement))}
    </>
}