import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import Tree from "../../components/list/Tree";
import { getOrganizationTree } from "../../api/organizationApi";
import { Fragment, useEffect, useState } from "react";
import List from "../../components/list/List";
import { searchDeparmentMembers } from "../../api/memberApi";
export default function Schedule() {

    const [organizationTree, setOrganizationTree] = useState([])
    const [searchResult, setSearchResult] = useState([])

    const handleAmount = async () => {
        const result = await getOrganizationTree();
        setOrganizationTree(result.data.data);
    }

    const handleOnClick = async (event) => {
        console.log('occur event');

        const departmentId = event.currentTarget.getAttribute('value');
        const result = await searchDeparmentMembers(departmentId);
        setSearchResult(result);
    }

    useEffect(() => {
        handleAmount();
    }, [])


    return (
        <Page header={<Header />} sidebar={<div>사이드바</div>}>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr 4fr' }}>
                <div style={{ width: '300px', height: '500px', overflow: 'auto' }}>
                    <Tree title='조직도'
                        fullTree={organizationTree}
                        onClickItem={handleOnClick} />
                </div>
                <div style={{ borderLeft: '1px solid black' }}></div>
                <div style={{ width: '300px', height: '500px', overflow: 'auto' }}>
                    <List title={"사용자 검색"}
                        cn={{ ul: "member-list", li: "item" }}
                        showCondition={true}
                        listProperty={{
                            items: searchResult,
                            itemKey: 'memberPk',
                            itemValue: 'memberId',
                            itemContent: (item) => (
                                <Fragment>
                                    {item.name}/{item.departmentName}
                                </Fragment>
                            )
                        }}>
                    </List>
                </div>
            </div>
        </Page >

    )
}