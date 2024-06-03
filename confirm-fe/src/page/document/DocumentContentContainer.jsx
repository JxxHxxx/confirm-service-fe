
export default function DocumentContentContainer({children}) {

    return (
        <table className="ct_table">
            <tbody>
                {children}
            </tbody>
        </table>
    )
}