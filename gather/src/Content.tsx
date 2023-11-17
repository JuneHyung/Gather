import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import ProjectList from "./ProjectList";
import StartPage from "./pages/StartPage";
import SearchMine from "./pages/searchMine/SearchMine";
import Corona from "./pages/corona/Corona";
import CanvasChart from "./pages/canvas/CanvasChart";
import Chat from "./pages/chat/ChatPage";
import { Provider } from "react-redux";
import coronaStore from "./store/output/corona/store";
const Content = () =>{
  return (
    <div className="content-box">
      <Header />
      <BrowserRouter>
        <ProjectList />
        <div className="content-list">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/searchMine" element={<SearchMine />} />
            <Route path="/corona" element={
              <Provider store={coronaStore}>
                <Corona />
              </Provider>
          } />
            <Route path="/canvasChart" element={<CanvasChart />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Content;