import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
import "react-datepicker/dist/react-datepicker.css"
import "../../css/Input.css"



export default function Schedule() {

  return (
    <Page header={<Header />} sidebar={<div>사이드바</div>}>
      <h2>test</h2>
    </Page>
  );
}

