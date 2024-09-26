import { Outlet } from "react-router-dom";
import { AppFooter } from "../components/shared/Footer";
import { AppHeader } from "../components/shared/Header";

export const Layout = () => {
  return (
    <>
      <AppHeader></AppHeader>
      <main>
        <Outlet></Outlet>
      </main>
      <AppFooter></AppFooter>
    </>
  );
};
