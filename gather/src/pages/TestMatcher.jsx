import { Route, Routes, useLocation } from "react-router";
import TestPage01 from './testPage01';
import TestPage02 from './testPage02';
import TestPage03 from './testPage03';
import TestPage04 from './testPage04';
import TestPage05 from './testPage05';
import TestPage06 from './testPage06';
const TestMatcher = () => {
  const location = useLocation();
  let urlSearchParams = new URLSearchParams(location.search.slice(1));
  console.log(urlSearchParams);
  return (
    <Routes>
      <Route path="01" element={<TestPage01 />} />
      <Route path="02" element={<TestPage02 />} />
      <Route path="03" element={<TestPage03 />} />
      <Route path="04" element={<TestPage04 />} />
      <Route path="05" element={<TestPage05 />} />
      <Route path="06" element={<TestPage06 />} />
      <Route path="*" exact element={<div>일치하는 page가 없습니다.</div>} />
    </Routes>
  );
};

export default TestMatcher;
