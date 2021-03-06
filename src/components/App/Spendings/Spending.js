import mixin from "utils/Mixin";
import Selectable from "utils/Selectable";
import Hashable from "utils/Hashable";

class Spending
  extends mixin(Hashable, Selectable) {

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
    return this.datetime.toString()
      + this.merchant
      + this.amount.toString()
  }
};

export default Spending;