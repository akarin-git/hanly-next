import { useContext } from "react";
import Layout from "../../components/Layout";
import Context from "../../context";

export default function Test() {
  const { state } = useContext(Context);

  return (
    <Layout>
      <div className="test">TEST {state.text}</div>
      <style jsx>{`
        .test {
          text-align: center;
          margin-top: 10rem;
        }
      `}</style>
    </Layout>
  );
}
