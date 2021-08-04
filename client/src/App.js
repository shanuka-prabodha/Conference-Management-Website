import './App.css';

import LandingPageComponent from "./components/LandingPage/LandingPageComponent";
import {BrowserRouter as Router,Route} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import LoginPageComponent from "./components/LoginPage/LoginPageComponent";
import WorkshopComponent from "./components/WorkshopPage/WorkshopComponent";
import ReviewReasrchPapers from "./components/Reviewer/PendingResearchPapers"
import ViewReasrchPapers from "./components/Reviewer/ViewResearchPaper"
import Messages from "./components/Message/Message";
import EditWorkshop from "./components/WorkshopPage/WorkshopItemSection/EditWorkshop";
import failed from "./components/Payment/Payment_failed";
import payment from "./components/Payment/payment";
import paymentsuccess from "./components/Payment/Payment_success";
import UploadFile from './components/PaperUpload/UploadFile';
import FilesList from './components/PaperUpload/FilesList';
import Main from "./components/mainEventsManage";
import nomainevents from "./components/adminNomainevents";
import adminDeclinemainevents from "./components/adminDeclineEventsDisplay";
import adminApprovedmainevents from "./components/adminApprovedEventsDisplay";
import EditorNoMainevents from "./components/EditorNoMaineventsDisplay";
import EditorApprovedMainevents from "./components/EditorApporvedMainEvents";
import EditorDeclineMainevents from "./components/EditorDeclineEventsDisplay";
import userWorkshopsEvents from "./components/userWorkshopsEventsDisplay";
import userresearchesEvents from "./components/userResearchEventDisplay";
import conferenceEdit from "./components/Editorconferencemanage";
import conferenceEditchange from "./components/editorChangedconferenceManage";
import conferenceAdminApprovel from "./components/adminConferenceManage";
import RWorkshop from"./components/Reviewer/PendingWorkshops";
import ViewWorkshop from"./components/Reviewer/ViewWorkshop";
import updatepaper from './components/PaperUpload/Updatepaper';
import Buyticket from './components/Ticket/Buyticket';
import participent from './components/Admin/Participent';
import PaperPaidList from './components/Admin/PaperPaidList';
import displayPapers from './components/User/DisplayPapers';
import ApprovedWorkshop from './components/Editor/AcceptedWorkshops';
import ApprovedRearchPaper from './components/Editor/AcceptedRearchPaper';
import ViewWorkshops from "./components/WorkshopPage/WorkshopItemSection/ViewWorkshops";

function App(){

  return (
      <Router>
        <div>
          <Route path="/" exact component={LandingPageComponent}/>
          <Route path="/registration" exact component={Registration}/>
          <Route path="/signin" exact component={LoginPageComponent}/>
          <Route path="/workshop" exact component={WorkshopComponent}/>

          <Route path="/uploadfile" exact component={UploadFile}/>

          <Route path="/RReasearch" exact component={ReviewReasrchPapers}/>
          <Route path="/VRReasearch" exact component={ViewReasrchPapers}/>
          <Route path="/messages" exact component={Messages}/>
          <Route path="/Rworkshop" exact component={RWorkshop}/>
          <Route path="/VRWorkshop" exact component={ViewWorkshop}/>
          <Route path="/edit/:id" exact component={EditWorkshop}/>
          <Route path="/view/:id" exact component={ViewWorkshops}/>

          <Route path="/failed" exact component={failed}/>
          <Route path="/payment" exact component={payment}/>
          <Route path="/success" exact component={paymentsuccess}/>
          <Route path="/upload-file" exact component={UploadFile}/>
          <Route path="/file-list" exact component={FilesList}/>
          <Route path="/paper-update" exact component={updatepaper}/>
          <Route path="/buyticket" exact component={Buyticket}/>

          <Route path="/participents" exact component={participent}/>
          <Route path="/paidlist" exact component={PaperPaidList}/>
          <Route path="/papers" exact component={displayPapers}/>

          <Route path="/approvedworkshop" exact component={WorkshopComponent}/>
          <Route path="/approvedresearchpaper" exact component={ApprovedRearchPaper}/>

          <Route path="/events" exact component={Main}/>
          <Route path="/noevents" exact component={nomainevents}/>
          <Route path="/adminDeclineevents" exact component={adminDeclinemainevents}/>
          <Route path="/adminApprovedevents" exact component={adminApprovedmainevents}/>
          <Route path="/editorNoMainevents" exact component={EditorNoMainevents}/>
          <Route path="/editorApprovedMainevents" exact component={EditorApprovedMainevents}/>
          <Route path="/editorDeclineMainevents" exact component={EditorDeclineMainevents}/>
          <Route path="/workshopsEvents" exact component={userWorkshopsEvents}/>
          <Route path="/ResearchEvents" exact component={userresearchesEvents}/>

          <Route path="/editconference" exact component={conferenceEdit}/>
          <Route path="/editconferencechange" exact component={conferenceEditchange}/>
          <Route path="/adminConferenceApprovel" exact component={conferenceAdminApprovel}/>



        </div>
      </Router>
  );
}

export default App;