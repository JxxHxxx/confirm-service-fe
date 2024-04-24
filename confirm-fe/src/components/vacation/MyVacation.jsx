import { useEffect, useState } from "react";
import { getCreateConfirmDocument } from "../../api/confirmApi";
import VacationSidebar from "../../layout/VacationSidebar";


export default function MyVacation() {
    const [ createdConfirmDocuments, setCreatedConfirmDocuments ] = useState([]);

    const callApi = async () => {
        const param = {
            requesterId: sessionStorage.getItem('memberId'),
            confirmStatus: 'CREATE'
        }

        const result = await getCreateConfirmDocument(param);
        setCreatedConfirmDocuments(result.data.data);
        console.log('result', result);
    }

    useEffect(() => {
        callApi();
    }, [])

    console.log('createdVacations', createdConfirmDocuments);

    return (
        <VacationSidebar>
            <main>
                <article>
                    <h2>내 휴가</h2>
                    <p>...</p>
                    <p>...</p>
                    <p>...</p>
                </article>

                <article>
                    <h2>작성중인 휴가</h2>
                    {createdConfirmDocuments.length > 0 ? 
                    createdConfirmDocuments.map(document => {
                        return (
                            <ul key={document.pk}>
                                <li className="list-item">{document.documentType}</li>
                            </ul>
                        )
                    } ) 
                    : <div>작성중인 휴가가 없습니다</div>}
                </article>
            </main>

        </VacationSidebar>
    )
}