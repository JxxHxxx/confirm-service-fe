import { useState } from "react";
import Button from "../../components/button/Button";
import Searchbar from "../../components/input/Searchbar";
import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import MemberSearch from "../member/MemberSearch";
export default function Schedule() {

    return (
        <Page header={<Header />} sidebar={<div>사이드바</div>}>
            <div>스케줄 페이지</div>
            <MemberSearch />
        </Page>
    )
}