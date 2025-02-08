const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div className="flex justify-center items-center flex-col">{children}</div>;
};

export default Layout;
