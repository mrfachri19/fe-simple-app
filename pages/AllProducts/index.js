import Header from "../../components/molecules/Header";
import Card from "../../components/molecules/Card";
import Footer from "../../components/molecules/Footer";

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default function Home() {
  return (
    <body>
      <Header />
      <main>
        <div className="container">
          <h2 className="words">
            We provide the highest quality shoes.
            <br /> Made with the best and durable materials, <br />
            we also provide premium quality used shoes.
          </h2>

          <Card />
        </div>
      </main>
      <Footer />
    </body>
  );
}
