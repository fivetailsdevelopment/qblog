import styles from "./page.module.css";
import { getSortedArticlesData } from "@/lib/articles";
import MainPage from "@/components/mainpage";

export default async function Home() {

  const allArticlesData = getSortedArticlesData();

  return (
    <>
      <MainPage allArticlesData={allArticlesData} />
    </>
  );
}
