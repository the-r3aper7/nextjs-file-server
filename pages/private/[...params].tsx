import React from "react";
import { useRouter } from "next/router";

function PrivatePath() {
  const { params } = useRouter().query as {
    params: string;
  };
  return (
    <>
      <div>privatePath</div>
      <div>{params}</div>
    </>
  );
}

export default PrivatePath;
