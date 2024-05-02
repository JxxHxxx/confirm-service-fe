import { Fragment } from "react";

export default function List({ title, cn, showCondition, listProperty = {}, children }) {
    const { ul, li, noneli } = cn;
    const { items = [], itemKey = 'id', itemValue = 'value', onClick = () => { }, emptyListInfo = '' } = listProperty;
    const { itemContent = () => null } = listProperty;
    return (
        <ul className={ul}>
            {showCondition && (
                <Fragment>
                    <h3>{title}</h3>
                    {items.map(item => (
                        <li className={li}
                            key={item[itemKey]}
                            value={item[itemValue]}
                            onClick={onClick}>
                            {itemContent(item)}
                        </li>
                    ))}
                    {children}
                </Fragment>
            )}
            {!showCondition && (
                <Fragment>
                    <h3>{title}</h3>
                    <li className={noneli}>{emptyListInfo}</li>
                </Fragment>
            )}
        </ul>
    )
}