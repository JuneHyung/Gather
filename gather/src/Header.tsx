import logo from "./logo.svg";

const Header = () => {
  return (
    <header className="app-header">
      <div  className="App-logo">
        <img src={logo} alt="logo" />
      </div>
      <h1 className="app-title">Project Gathering</h1>
    </header>
  );
};
export default Header;
