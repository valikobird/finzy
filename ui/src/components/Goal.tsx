import React, {Fragment} from "react";
import {useParams} from "react-router-dom";

export default function Goal() {
  const {id} = useParams<{ id: string }>();

  return (
    <Fragment>
      <h2>Goal: {id}</h2>
    </Fragment>
  );
};
