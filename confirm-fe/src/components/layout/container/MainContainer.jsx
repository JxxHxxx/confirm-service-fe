
// profile : test, dev, prod
export default function MainContainer({ profile, children }) {

    let borderStyle = ''
    if (profile === 'dev') {
        borderStyle = '1px dashed red'
    }

    return <div id="mainContainer" style={{ border: borderStyle, margin: '50px 0px 50px 0px', padding: '20px' }}>
        {children}
    </div>
}