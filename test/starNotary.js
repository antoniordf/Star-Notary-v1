const StarNotary = artifacts.require("StarNotary");

let accounts;
let owner;

contract("StarNotary", async (accs) => {
  accounts = accs;
  owner = accounts[0];
});

it("has correct name", async () => {
  let instance = await StarNotary.deployed();
  let starName = await instance.starName.call();
  assert.equal(starName, "Gita");
});

it("can be claimed", async () => {
  let instance = await StarNotary.deployed();
  await instance.claimStar({ from: owner });
  let starOwner = await instance.starOwner.call();
  assert.equal(starOwner, owner);
});

it("can change owners", async () => {
  let instance = await StarNotary.deployed();
  let secondUser = accounts[1];
  await instance.claimStar({ from: owner });
  let starOwner = await instance.starOwner.call();
  assert.equal(starOwner, owner);
  await instance.claimStar({ from: secondUser });
  let secondOwner = await instance.starOwner.call();
  assert.equal(secondOwner, secondUser);
});

it("allows the owner to change the name of the star", async () => {
  let instance = await StarNotary.deployed();
  await instance.claimStar({ from: owner });
  await instance.changeName("Antonio", { from: owner });
  let newName = await instance.starName.call();
  assert.equal(newName, "Antonio");
});

it("Does not allow a non-owner to change the name of the star", async () => {
  let instance = await StarNotary.deployed();
  let nonOwner = accounts[1];

  // Reset the star's name to its original value
  await instance.changeName("Gita", { from: owner });

  try {
    await instance.changeName("Antonio", { from: nonOwner });
  } catch (err) {
    assert.include(
      err.message,
      "Only the owner can call this function",
      "Expected an error containing 'Only the owner can call this function'"
    );
  }

  let starName = await instance.starName.call();
  assert.notEqual(
    starName,
    "Antonio",
    "Star name should not be changed by non-owner"
  );
});
