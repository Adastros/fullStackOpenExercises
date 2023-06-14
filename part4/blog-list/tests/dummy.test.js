const listHelper = require("../utils/list_helper.js");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const blogList = [
    {
      _id: "647581d12029f68fca7211d0",
      title: "Lord of the Rings",
      author: "Token",
      url: "testUrl",
      likes: 5,
      __v: 0,
    },
    {
      _id: "647588b17083ba74865f9363",
      title: "Walking",
      author: "Wow",
      url: "https://hello.com/",
      likes: 90,
      __v: 0,
    },
    {
      _id: "6476eb65ae72265a5d1b5a76",
      title: "TAlking",
      author: "FRies",
      url: "https://hellogries.com/",
      likes: 900,
      __v: 0,
    },
    {
      _id: "64782f82f1c36e1ecb1d5515",
      title: "CUp",
      author: "Man",
      url: "https://poper.com/",
      likes: 9000,
      __v: 0,
    },
  ];

  test("empty list is zero", () => {
    const result = listHelper.totalLikes([]);

    expect(result).toBe(0);
  });

  test("List of one has same likes as blog", () => {
    const result = listHelper.totalLikes([blogList[0]]);

    expect(result).toBe(5);
  });

  test("Larger list is calculated right", () => {
    const result = listHelper.totalLikes(blogList);

    expect(result).toBe(9995);
  });
});

describe("favorite blog", () => {
  const blogList = [
    {
      _id: "647581d12029f68fca7211d0",
      title: "Lord of the Rings",
      author: "Token",
      url: "testUrl",
      likes: 5,
      __v: 0,
    },
    {
      _id: "64782f82f1c36e1ecb1d5515",
      title: "CUp",
      author: "Man",
      url: "https://poper.com/",
      likes: 9000,
      __v: 0,
    },
    {
      _id: "647588b17083ba74865f9363",
      title: "Walking",
      author: "Wow",
      url: "https://hello.com/",
      likes: 90,
      __v: 0,
    },
    {
      _id: "6476eb65ae72265a5d1b5a76",
      title: "TAlking",
      author: "FRies",
      url: "https://hellogries.com/",
      likes: 90000,
      __v: 0,
    },
  ];

  test("no blogs", () => {
    const result = listHelper.favoriteBlog([]);

    expect(result).toBe(undefined);
  });

  test("One blog is automatically the favorite blog", () => {
    const result = listHelper.favoriteBlog([blogList[2]]),
      expectedResult = {
        title: "Walking",
        author: "Wow",
        url: "https://hello.com/",
        likes: 90,
      };

    expect(result).toEqual(expectedResult);
  });

  test("Larger blog list returns blog with most likes", () => {
    const result = listHelper.favoriteBlog(blogList),
      expectedResult = {
        title: "TAlking",
        author: "FRies",
        url: "https://hellogries.com/",
        likes: 90000,
      };

    expect(result).toEqual(expectedResult);
  });
});

describe("Author with most blogs", () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("no blogs", () => {
    const result = listHelper.mostBlogs([]);

    expect(result).toBe(undefined);
  });

  test("One blog returns the one author with blogs = 1", () => {
    const result = listHelper.mostBlogs([blogs[2]]),
      expectedResult = {
        author: "Edsger W. Dijkstra",
        blogs: 1,
      };

    expect(result).toEqual(expectedResult);
  });

  test("Larger blog list returns author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs),
      expectedResult = {
        author: "Robert C. Martin",
        blogs: 3,
      };

    expect(result).toEqual(expectedResult);
  });
});

describe("Author with most likes", () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("no blogs", () => {
    const result = listHelper.mostLikes([]);

    expect(result).toBe(undefined);
  });

  test("One blog returns the one author and the blog's likes = 1", () => {
    const result = listHelper.mostLikes([blogs[2]]),
      expectedResult = {
        author: "Edsger W. Dijkstra",
        likes: 12,
      };

    expect(result).toEqual(expectedResult);
  });

  test("Larger blog list returns author with most blogs", () => {
    const result = listHelper.mostLikes(blogs),
      expectedResult = {
        author: "Edsger W. Dijkstra",
        likes: 17,
      };

    expect(result).toEqual(expectedResult);
  });
});
