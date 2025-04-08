
export default function DefaultTable({ columnNames = [], items = [], className, onClick }) {


    return (
        <>
            <table style={{ width: '100%' }} className={className ? className : ''}>
                <thead>
                    <tr key={"tableColumns"}>
                        {columnNames.map((col) => (<td>{col}</td>))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, trIdx) => <tr searchCondition={item.uniqueKey}
                                                    key={trIdx}
                                                    onClick={onClick}>
                        {Object.entries(item)
                            .map((entry, tdIdx) => {
                                if (entry[0] === 'uniqueKey') {
                                    return <></>
                                }

                                const key = entry[0];
                                const value = entry[1];
                                return <td key={key + tdIdx}>{value}</td>
                            })
                        }
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}