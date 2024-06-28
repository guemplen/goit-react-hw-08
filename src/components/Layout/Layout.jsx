import AppBar from '../AppBar/AppBar'; // Припустимо, що цей компонент у вас вже є

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
