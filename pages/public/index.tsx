import { elementalData } from "../../interfaces";
import { PopulateData, LoadingCard } from "../../components";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

interface resData {
  files: [elementalData];
}

function Index({ fallbackData }: { fallbackData: resData }) {
  const { data, error } = useSWR(["/api/get-files", ""], fetcher, {
    fallbackData,
  }) as { data: resData; error: any };

  if (error) return console.error(error);
  //loading Component
  if (!data) return <LoadingCard />;

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
