import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("Test the Blog Form component to verify that", () => {
  let mockOnCreateNewBlog = jest.fn();

  beforeEach(() => {
    render(<BlogForm createNewBlog={mockOnCreateNewBlog} />);
  });

  test(
    "it calls the event handler createNewBlog it received as a prop with the correct title, author, and URL",
    async () => {
      const user = userEvent.setup();

      const inputTitle = screen.getByPlaceholderText("Blog Title");
      const inputAuthor = screen.getByPlaceholderText("Blog Author");
      const inputUrl = screen.getByPlaceholderText("Blog Website Link");
      const buttonSubmitForm = screen.getByText("Create Blog");

      await user.type(inputTitle, "Flowers");
      await user.type(inputAuthor, "Daniel Flower");
      await user.type(inputUrl, "www.flowers.com");
      await user.click(buttonSubmitForm);

      expect(mockOnCreateNewBlog.mock.calls).toHaveLength(1);
      expect(mockOnCreateNewBlog.mock.calls[0][0]).toMatchObject({
        title: "Flowers",
        author: "Daniel Flower",
        url: "www.flowers.com",
      });
    },
    5 * 1000
  );
});
