import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import TaskBoard from "./task/TaskBoard";

export default function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-items-center" >
        <Hero />
        <TaskBoard />
      </div>

      <Footer />
    </>
  );
}
