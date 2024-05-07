import { Fragment } from "react";
import '../../css/layout/Page.css'

export default function Page({ header, sidebar, children }) {

    return (
        <Fragment>
            <header>{header}</header>
            <div className="page-container">
                <aside>{sidebar}</aside>
                <main className="content">{children}</main>
            </div>
        </Fragment>
    )
}