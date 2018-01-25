import Hashable from "utils/Hashable"

class Spending
  extends Hashable {

  static Enum = Object.freeze({
    DATETIME: "datetime",
    MERCHANT: "merchant",
    AMOUNT: "amount",
  });

  constructor(datetime, merchant, amount) {
    super();

    this[Spending.Enum.DATETIME] = datetime;
    this[Spending.Enum.MERCHANT] = merchant;
    this[Spending.Enum.AMOUNT] = amount;
  }

  static new(datetime, merchant, amount) {
    new Spending(datetime, merchant, amount).freeze();
  }

  hashString() {
    return this.datetime
      + this.merchant
      + this.amount
  }
};

export default Spending