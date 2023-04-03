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
