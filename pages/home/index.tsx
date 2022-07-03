import Feed from "../../components/Feed";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-white">
      <Header title="Home"/>

      <main className="min-h-screen max-w-[1500px] flex mx-auto">
        <Sidebar/>
        <Feed/>
      </main>
    </div>
  )
}
