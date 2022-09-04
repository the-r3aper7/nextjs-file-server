import { elementalData } from "../../interfaces";
import dynamic from "next/dynamic";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

interface resData {
  files: [elementalData];
}

const PopulateData = dynamic(
  () => import("../../components/Cards/PopulateData"),
  {
    ssr: true,
  }
);

function Index({ fallbackData }: { fallbackData: resData }) {
  const { data, error } = useSWR(["/api/get-files", ""], fetcher, {
    fallbackData,
  }) as { data: resData; error: any };

  if (error) return console.error(error);

  return <PopulateData files={data.files} />;
}

export async function getServerSideProps(context: any) {
  const host: string = context.req.rawHeaders[1];
  const data: resData = await fetcher(`http://${host}/api/get-files?path=`);
  return {
    props: { fallbackData: data },
  };
}

export default Index;
