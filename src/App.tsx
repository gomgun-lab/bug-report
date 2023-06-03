import { zodResolver } from "@hookform/resolvers/zod";
import { exampleLoginSchema, ExampleLoginSchema } from "./schema/example";

import { Form } from "./components/Form";

function App() {
  const submitHandler = (data: ExampleLoginSchema) => {
    console.log(data);
  };

  return (
    <Form onSubmit={submitHandler} resolver={zodResolver(exampleLoginSchema)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Form.Input type="email" name="email" />
        <Form.Input type="password" name="password" />
        <button type="submit">click me</button>
      </div>
    </Form>
  );
}

export default App;
