/**  
* @param {ReactNode} props.children - fileInput UI가 표현될 태그
*/

export default function FileInput({ children, inputId, onChange, isMultiple }) {

    return <>
        <label htmlFor={inputId}>
            {children}
        </label>
        <input
            type="file"
            id={inputId}
            onChange={onChange}
            multiple={isMultiple}
            style={{ display: 'none' }}
        />
    </>
}