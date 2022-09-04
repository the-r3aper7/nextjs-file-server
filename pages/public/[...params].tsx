import { elementalData } from "../../interfaces";
import dynamic from "next/dynamic";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";

const PopulateData = dynamic(
  () => import("../../components/Cards/PopulateData"),
  {
    ssr: true,
  }
);

interface resData {
  files: [elementalData];
}

function Index({ fallbackData }: { fallbackData: resData }) {
  const { params } = useRouter().query as { params: string[] };

  const { data, error } = useSWR(
    ["/api/get-files", params.join("/")],
    fetcher,
    {
      fallbackData,
    }
  ) as { data: resData; error: any };
  // handling error while fetching data
  if (error) return console.log(error);

  return <PopulateData files={data.files} />;
}

export async function getServerSideProps(context: any) {
  const path: string = context.params.params.join("/");
  // getting current wifi host address like 192.168.X.X
  const host: string = context.req.rawHeaders[1];
  const data: resData = await fetcher(
    `http://${host}/api/get-files?path=${path}`
  );
  return {
    props: { fallbackData: data },
  };
}

export default Index;
