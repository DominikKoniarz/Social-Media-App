import Form from "./Form";
import Header from "./Header";
import socialmedia from "../../assets/socialmedia.png";
const RegisterPage = () => {
  return (
    <main className="flex w-full h-full">
      <section className="flex flex-col w-full h-full p-10 bg-zinc-100">
        <Header />
        <Form />
      </section>
      <img src={socialmedia} alt="socialmedia" />
    </main>
  );
};
export default RegisterPage;
