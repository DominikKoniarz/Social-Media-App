import Form from "./Form";
import Header from "./Header";
import socialmedia from "../../assets/socialmedia.png";
const RegisterPage = () => {
  return (
    <main className="flex w-screen h-screen bg-zinc-100">
      <section className="flex flex-col w-full md:h-full p-10 h-[calc(100%-75px)] ">
        <Header />
        <Form />
      </section>
      <img className="hidden lg:inline" src={socialmedia} alt="socialmedia" />
    </main>
  );
};
export default RegisterPage;
