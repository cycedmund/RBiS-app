import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";

const LandingPage = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchQuote = async () => {
      try {
        const response = await axios.get(
          "https://api.quotable.io/quotes/random"
        );
        const quote = response.data[0].content;
        if (isMounted) {
          setQuote(quote);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuote();
    return () => {
      isMounted = false;
    };
  }, []);

  if (quote === null || quote === undefined) {
    return <Loading />;
  }
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-overlay bg-[#202029]"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-[80vw]">
            <h1 className="mb-10 text-4xl font-medium text-[#8294C4]">
              {quote}
            </h1>
            <p className="mb-2 text-2xl font-roboto">
              If you see this, you are RBiS
            </p>
            <Link to="/login">
              <button className="btn btn-ghost text-black font-raleway text-xl bg-[#7299f2] hover:bg-[#4975d9] rounded-sm normal-case">
                Login Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
