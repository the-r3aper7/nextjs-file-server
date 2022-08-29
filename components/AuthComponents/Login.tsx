import { PasswordInput, TextInput, Container, Button } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let form = new FormData();
    form.append("username", username);
    form.append("password", password);
    await axios
      .post("/api/auth/login", form)
      .then((t) => {
        setStatus(t.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {status}
      <Container p={"md"}>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            variant={"filled"}
            value={username}
            placeholder={"Enter your username"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            my={"sm"}
            required
          />
          <PasswordInput
            label="Password"
            variant={"filled"}
            value={password}
            placeholder={"Enter your password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            my={"sm"}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    </div>
  );
}

export default Login;
