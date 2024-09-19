/* eslint-disable react/prop-types */
import Footer from "./Footer";
import Header from "./Header";
import Maincontent from "./Maincontent";

export default function Container({children}) {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Maincontent />
        {children}
      </main>
      <Footer />
    </>
  );
}
