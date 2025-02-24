import { Header } from "@/components/Header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col">
        {children}
      </div>
    </>
  );
};

export default Layout;
