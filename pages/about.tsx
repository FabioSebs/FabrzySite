import { NextPage } from "next";
import Link from "next/link";
// import Layout from '../components/Layout'

const AboutPage : NextPage = () => (
  <div>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </div>
);

export default AboutPage;
