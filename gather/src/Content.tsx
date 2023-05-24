import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import ProjectList from "./ProjectList";
import TestMatcher from "./pages/TestMatcher";
import StartPage from "./pages/StartPage";
import SearchMine from "./pages/searchMine/SearchMine";
import Corona from "./pages/corona/Corona";

const Content = () =>{
  return (
    <div className="content-box">
      <Header />
      <BrowserRouter>
        <ProjectList />
        <div>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/test/*" element={<TestMatcher />} />
            <Route path="/searchMine" element={<SearchMine />} />
            <Route path="/corona" element={<Corona />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default Content;