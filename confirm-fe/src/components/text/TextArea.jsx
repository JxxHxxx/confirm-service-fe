
export default function TextArea({ divId, textareaId, onChange, readOnly, title, textAreaClassName }) {
    return <div id={divId}>
        <label id={textareaId} className="basicDesc">{title}</label>
        <textarea id={textareaId} className={textAreaClassName}
            readOnly={readOnly}
            onChange={onChange} />
    </div>
}