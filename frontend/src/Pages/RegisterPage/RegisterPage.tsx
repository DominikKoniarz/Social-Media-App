import Form from "./Form";
import Header from "./Header";

const RegisterPage = () => {
  return (
    <main className="flex w-full h-full">
      <section className="flex flex-col w-full h-full p-10 bg-zinc-100">
        <Header />
        <Form />
      </section>
      <img src="/public/socialmedia.png" alt="socialmedia" />
    </main>
  );
};
export default RegisterPage;
