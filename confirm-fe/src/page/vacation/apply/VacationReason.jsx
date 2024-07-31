

export default function VacationReason({onChange}) {
    return <>
        <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '12px', margin: '0px' }}>사유</p>
            <textarea style={{
                width: '425px',
                height: '75px',
                resize: 'none'
            }}
                placeholder="적고 싶으면 적으세요!"
                onChange={onChange}>
            </textarea>
        </div>
    </>
}