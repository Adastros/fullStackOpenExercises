// Custom command to create a blog through the backend
Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  if (!likes) {
    likes = 0;
  }

  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedInUser")).token
      }`,
    },
  });

  cy.visit("");
});

describe("Test the blog app", function () {
  beforeEach(function () {
    // reset testing database before each test
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    // create new users before each test
    const users = [
      {
        username: "Teddy",
        name: "John Snow",
        password: Cypress.env("USERPASSWORD1"),
      },
      {
        username: "Owl",
        name: "Bird Man",
        password: Cypress.env("USERPASSWORD2"),
      },
    ];

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, users[0]);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, users[1]);
    cy.visit("");
  });

  it("to check that the login form is shown by default", function () {
    cy.contains("Login");
    cy.contains("Username");
    cy.contains("Password");
  });

  describe("to check login functionality by verifying", function () {
    it("a valid user login succeeds", function () {
      cy.contains("Username").siblings().first().type("Teddy");
      cy.contains("Password")
        .siblings()
        .first()
        .type(Cypress.env("USERPASSWORD1"));
      cy.get("button").click();
    });

    it("that login fails when the wrong password is provided", function () {
      cy.contains("Username").siblings().first().type("Teddy");
      cy.contains("Password")
        .siblings()
        .first()
        .type(Cypress.env("USERPASSWORD3"));
      cy.get("button").click();
      cy.get("#notification")
        .should("contain", "The username or password is wrong")
        .and("have.css", "borderStyle", "solid")
        .and("have.css", "background-color", "rgb(211, 211, 211)");
    });
  });

  describe("that when logged in as user1", function () {
    // Per Cypress, test login functionality once. All other proceeding tests
    // should login from the backend to reduce testing time
    beforeEach(function () {
      cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
        username: "Teddy",
        password: Cypress.env("USERPASSWORD1"),
      }).then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.body));
        cy.visit("");
      });
    });

    it("user1 can create a blog", function () {
      // Input blog data into form
      cy.contains("Create a New Blog").click();
      cy.contains("Title:").siblings().first().type("Lord of the Ring");
      cy.contains("Author:").siblings().first().type("Tolken");
      cy.contains("Blog Link (URL):")
        .siblings()
        .first()
        .type("www.onering.com");
      cy.contains("Create Blog").click();

      // Verify that a notification indicating success is generated
      cy.get("#notification").should(
        "contain",
        `Successfully created new blog "Lord of the Ring"`
      );

      // Verify that a blog item is visible on the page
      cy.contains("Lord of the Ring by Tolken");
    });

    describe("user1 can perform the following for created blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Lord of the Ring",
          author: "Tolken",
          url: "www.onering.com",
        });
      });

      it("like a blog and the like counter for the blog increases by 1", function () {
        cy.contains("View").click();
        cy.get("#likes-Lord-of-the-Ring > button").click();

        // Verify that a notification indicating success is generated
        cy.get("#notification").should(
          "contain",
          `Likes was updated successfully`
        );

        // Verify that the likes counter increased by 1
        cy.contains("Likes: 1");
      });

      it("delete a blog and the blog no longer shows on the page", function () {
        cy.contains("View").click();
        cy.contains("Delete Blog").click();

        // Verify that a notification indicating success of deletion is generated
        cy.get("#notification").should(
          "contain",
          `Lord of the Ring by Tolken was deleted successfully`
        );

        cy.contains("blogs").should("not.contain", "Lord of the Ring");
      });

      it("that user1 can logout sucessfully", function () {
        cy.contains("Log Out").click();

        // Verify that a notification for successful log out generated
        cy.get("#notification").should("contain", `Successfully logged out`);

        // Verify back to login page
        cy.contains("Login");
        cy.contains("Username");
        cy.contains("Password");
      });

      describe("that when logged in as user2", function () {
        // Per Cypress, test login functionality once. All other proceeding tests
        // should login from the backend to reduce testing time
        beforeEach(function () {
          cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
            username: "Owl",
            password: Cypress.env("USERPASSWORD2"),
          }).then((response) => {
            localStorage.setItem("loggedInUser", JSON.stringify(response.body));
            cy.visit("");
          });
        });

        it("the delete button for the blog user1 created is not visible", function () {
          cy.contains("Delete Blog").should("not.exist");
        });
      });
    });

    describe("and there are multiple blogs listed", function () {
      beforeEach(function () {
        const blogs = [
          {
            title: "Lord of the Ring",
            author: "Tolken",
            url: "www.onering.com",
            likes: 3,
          },
          {
            title: "Seals",
            author: "Animal Man",
            url: "www.manyseals.com",
            likes: 2,
          },
          {
            title: "Tired",
            author: "Sleepy Woman",
            url: "www.iamtired.com",
            likes: 1,
          },
        ];

        blogs.forEach((blog) =>
          cy.createBlog({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
          })
        );
      });

      it("they are ordered from most to least likes from top to bottom, respectively", function () {
        cy.contains("blogs")
          .siblings()
          .eq(0)
          .should("contain", "Lord of the Ring");
        cy.contains("blogs").siblings().eq(1).should("contain", "Seals");
        cy.contains("blogs").siblings().eq(2).should("contain", "Tired");
      });
    });
  });
});
