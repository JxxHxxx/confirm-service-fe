import { Fragment, useState } from "react";
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

function Node({ item, onClickItem }) {
    const [isOpen, setIsOpen] = useState(false); // 펼침/접힘 상태를 관리합니다.
    const hasChildren = item.subDepartments && item.subDepartments.length > 0;

    const toggleOpen = () => {
        setIsOpen(!isOpen); // 상태를 반전시켜 펼침/접힘을 토글합니다.
    };

    return (
        <li key={item.id} id={item.departmentId}
            value={item.departmentId}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {hasChildren && (
                    isOpen ? <HiChevronUp onClick={toggleOpen} /> : <HiChevronDown onClick={toggleOpen} />
                )}
                <span value={item.departmentId} onClick={onClickItem}>{item.departmentName}</span>
            </div>
            {hasChildren && (
                <ul style={{ listStyleType: 'none', display: isOpen ? 'block' : 'none' }}>
                    {item.subDepartments.map(child => (
                        <Node key={child.id} item={child} onClickItem= {onClickItem} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function Tree({ title, fullTree, onClickItem }) {
    return (
        <Fragment>
            <h4>{title}</h4>
            <ul style={{ listStyleType: 'none' }}>
                {fullTree.map(org => (
                    <Node key={org.id} item={org} onClickItem={onClickItem} />
                ))}
            </ul>
        </Fragment>
    );
}
