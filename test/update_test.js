const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "joe" });
    joe.save().then(() => done());
  });

  it("instance type using set and save", (done) => {
    joe.set("name", "alex");
    assertName(joe.save(), done);
  });

  it("instance type using update", (done) => {
    assertName(joe.update({ name: "alex" }), done);
  });

  it("model class type using update", (done) => {
    assertName(User.update({ name: "joe" }, { name: "alex" }), done);
  });

  it("model class type using findOneAndUpdate", (done) => {
    assertName(User.findOneAndUpdate({ name: "joe" }, { name: "alex" }), done);
  });

  it("model class type using findByIdAndUpdate", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "alex" }), done);
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "alex");
        done();
      });
  }
});
