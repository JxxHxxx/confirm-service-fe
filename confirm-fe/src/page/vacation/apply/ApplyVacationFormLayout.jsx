import Button from "../../../components/button/Button";


export default function ApplyVacationFormLayout({ title, onApplyVacation, children }) {

    return (
        <>
            <div style={{ margin: '30px' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr', gridRowGap: '5px' }}>
                <div style={{ paddingBottom: '3px', borderBottom: '1px solid black', display: 'flex', justifyContent: "space-between" }}>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>{title}</span>
                    <Button cn="btn_normal" name='신청' onClick={onApplyVacation} />
                </div>
            </div>
            <div></div>
            <div style={{ border: '1px dashed blue' }}>
                {children}
            </div>
        </>
    )
}