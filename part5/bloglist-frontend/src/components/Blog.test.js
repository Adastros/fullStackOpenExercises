import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Test the Blog component to verify that", () => {
  let blogComponent;
  let mockOnLikeClick = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "This is a test",
      author: "Dan Fred",
      url: "www.test.com",
      likes: 1,
      user: {
        username: "Danfred",
      },
    };

    // An escape hatch to allow for manual querying using queryselector. Not
    // recommended by react-testing-library but will use because this is what
    // is covered in lesson. Requires the container property to work
    blogComponent = render(
      <Blog incrementLikes={mockOnLikeClick} blog={blog} />
    ).container;
  });

  test(
    "the blog title and author renders but not the URL and number of likes",
    () => {
      // Checks if the blog title and author are visible
      screen.getByText("Dan Fred", { exact: false });
      screen.getByText("This is a test", { exact: false });

      // Checks if the parent div that contains the URL and likes counter is styled
      // with display:none by default to hide content.
      const div = blogComponent.querySelector(".togglable");
      expect(div).toHaveStyle("display: none");
    },
    5 * 1000
  );

  test(
    "clicking the view button once renders the URL and number of likes",
    async () => {
      // Configure an instance of a user event
      const user = userEvent.setup();

      // Get button to test user clicking on button
      const viewButton = screen.getByText(`View`);

      // Click the button
      await user.click(viewButton);

      // Check if the style for div.togglable is not display: none
      const div = blogComponent.querySelector(".togglable");
      expect(div).not.toHaveStyle(`display: none`);
    },
    5 * 1000
  );

  test(
    "clicking the like button twice increases the like counter by 2",
    async () => {
      const user = userEvent.setup();
      const likeButton = screen.getByText("Like");

      await user.click(likeButton);
      await user.click(likeButton);

      expect(mockOnLikeClick.mock.calls).toHaveLength(2);
    },
    5 * 1000
  );
});
