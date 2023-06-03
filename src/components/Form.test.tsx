import { zodResolver } from "@hookform/resolvers/zod";
import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { describe, test, vi } from "vitest";
import { exampleLoginSchema } from "../schema/example";
import { Form } from "./Form";
import { testData } from "../testData";

const mockSubmit = vi.fn((data) => {
  console.log(data);
});

describe("Form Component", () => {
  test("Should render Form component correctly", () => {
    render(
      <Form onSubmit={mockSubmit} testId="form">
        <Form.Input type="text" name="test" />
      </Form>
    );

    const formElement = screen.getByTestId("form");
    expect(formElement).to.be.ok;

    const inputElement = screen.getAllByLabelText("test");
    expect(inputElement).to.be.ok;
  });

  test("Should render feedback messages for invalid inputs", async () => {
    render(
      <Form onSubmit={mockSubmit} resolver={zodResolver(exampleLoginSchema)}>
        <Form.Input type="email" name="email" />
        <Form.Input type="password" name="password" />
        <button type="submit">click me</button>
      </Form>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(2);

    expect(mockSubmit).not.toBeCalled();
  });

  test("Should call onSubmit function when the input is correct", () => {
    render(
      <Form onSubmit={mockSubmit} resolver={zodResolver(exampleLoginSchema)}>
        <Form.Input type="email" name="email" />
        <Form.Input type="password" name="password" />
        <button type="submit">click me</button>
      </Form>
    );

    fireEvent.input(screen.getByLabelText("email"), {
      target: {
        value: testData.validEmail,
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: testData.validPassword,
      },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(mockSubmit).toBeCalled();
  });

  test("Should not call onSubmit function when there is an invalid input", async () => {
    render(
      <Form onSubmit={mockSubmit} resolver={zodResolver(exampleLoginSchema)}>
        <Form.Input type="email" name="email" />
        <Form.Input type="password" name="password" />
        <button type="submit">click me</button>
      </Form>
    );

    fireEvent.input(screen.getByLabelText("email"), {
      target: {
        value: testData.invalidEmail,
      },
    });

    fireEvent.input(screen.getByLabelText("password"), {
      target: {
        value: testData.invalidPassword,
      },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(mockSubmit).not.toBeCalled();
  });
});
