import { Header } from "../../components/layout/Header";
import Page from "../../components/layout/Page";
export default function Schedule() {
  return (
    <Page header={<Header />} sidebar={<div>사이드바</div>}>
      <h2>테이블</h2>
      <table>
        <tr>
          <th colSpan={2} style={{ backgroundColor: "grey" }}>
            요청정보
          </th>
        </tr>
        <tr>
          <th>요청자</th>
          <td>123</td>
        </tr>
        <tr>
          <th>요청자 부서</th>
          <td></td>
        </tr>
        <tr>
          <th>사유</th>
          <td></td>
        </tr>
        <tr>
          <th>휴가 기간</th>
        </tr>
      </table>
    </Page>
  );
}
