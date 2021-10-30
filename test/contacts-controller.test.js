const { updateContact } = require("../controllers/contacts.controller");
const Contacts = require("../repository/contacts");
const { CustomError } = require("../helpers/castomError");

jest.mock("../repository/contacts");

describe("Unit test controller updateContact", () => {
  let req, res, next;

  beforeEach(() => {
    Contacts.updateContact = jest.fn();
    req = { params: { id: 3 }, body: {}, user: { _id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });

  it("Contact exist", async () => {
    const contact = { id: 7, name: "Testik", phone: "066 454 45 54" };
    Contacts.updateContact = jest.fn(() => {
      return contact;
    });
    const result = await updateContact(req, res, next);
    console.log(result);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("code");
    expect(result).toHaveProperty("data");
    expect(result.data.contact).toEqual(contact);
  });

  it("Contact not exist v1.0", async () => {
    console.log(CustomError);
    await expect(updateContact(req, req, next)).rejects.toEqual(
      new CustomError(404, "Not found")
    );
  });

  it("Contact not exist v1.1", async () => {
    return updateContact(req, req, next).catch((e) => {
      expect(e.status).toEqual(404);
      expect(e.message).toEqual("Not found");
    });
  });
});
