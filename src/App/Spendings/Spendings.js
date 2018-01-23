import React, { Component } from 'react';

import "./Spendings.css"

let statement = `
11/30/2017,"WG006085000000 11/30 #000031899 WITHDRWL Cardtronics CCSB CHICAGO IL","-63.00","3915.50"
11/30/2017,"WG006085000000 11/30 #000031899 WITHDRWL Cardtronics CCSB CHICAGO IL FEE","-2.50","3913.00"
12/01/2017,"CHECKCARD 1130 VENTRA AUTOLOAD 877-669-8368 IL 24445007335001090067754","-20.00","3893.00"
12/01/2017,"Vi Nguyen Bill Payment","-170.00","3723.00"
12/04/2017,"Online scheduled transfer to CHK 5169 Confirmation# 1215042709","-1000.00","2723.00"
12/07/2017,"HERE NORTH AMERI DES:PAYROLL ID:CTR675863722 INDN:NGUYEN NGUYEN T CO ID:XXXXX80465 PPD","2784.81","5507.81"
12/07/2017,"COMED DES:UTIL_BIL ID:XXXXX80098 1207 INDN:NGUYEN NGUYEN CO ID:XXXXX38600 PPD","-72.89","5434.92"
12/11/2017,"CHECKCARD 1208 VENTRA AUTOLOAD 877-669-8368 IL 24445007343001230407191","-20.00","5414.92"
12/11/2017,"BKOFAMERICA ATM 12/11 #000004090 WITHDRWL ATRIUM MALL THOM CHICAGO IL","-40.00","5374.92"
12/12/2017,"COMCAST DES:CABLE ID:4426307 INDN:NGUYEN *NGUYEN CO ID:XXXXX13249 PPD","-94.37","5280.55"
12/13/2017,"CHASE CREDIT CRD DES:AUTOPAY ID:XXXXX0000032370 INDN:NGUYEN NGUYEN CO ID:XXXXX39224 PPD","-4459.58","820.97"
12/18/2017,"Online Banking transfer from CHK 5169 Confirmation# 6460711426","1000.00","1820.97"
12/18/2017,"ISPA/PIMDS 12/16 #000000426 WITHDRWL PAI ISO CHICAGO IL","-101.00","1719.97"
12/18/2017,"Online scheduled transfer to CHK 5169 Confirmation# 1218954335","-1000.00","719.97"
12/18/2017,"TARGET CARD SRVC DES:AUTO PYMT ID:XXXXX0053771304 INDN: NGUYEN NGUYEN T CO ID:XXXXX21813 WEB","-211.32","508.65"
12/18/2017,"PEOPLES GAS DES:ONLINE PMT ID:CKF545045571NEG INDN:NGUYEN NGUYEN CO ID:XXXXX00000 PPD","-117.60","391.05"
12/18/2017,"ISPA/PIMDS 12/16 #000000426 WITHDRWL PAI ISO CHICAGO IL FEE","-2.50","388.55"
12/21/2017,"HERE NORTH AMERI DES:PAYROLL ID:CTR678309974 INDN:NGUYEN NGUYEN T CO ID:XXXXX80465 PPD","2784.80","3173.35"
`

let fakeSpendings = statement
  .split('\n')
  .map(line => {
    let [datetime, merchant, amount] = line
      .split(',')
      .splice(0, 3)
      .map(v => v === undefined || v.replace(/['"]+/g, ""));

    return {
      "datetime": datetime,
      "merchant": merchant,
      "amount": amount === undefined
        || Number.parseFloat(amount)
    };
  })
  .filter(spending => spending.merchant !== undefined)
  .sort((a, b) => a.merchant >= b.merchant ? 1 : -1);

// TODO: load this from a common
// TODO: convert to absolute imports
function hashCode(str) {
  var hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

class Spendings
  extends Component {

  render() {
    const items = fakeSpendings.map(spending => {

      let spendingKey = hashCode(
        spending.datetime
        + spending.merchant
        + spending.amount
      )

      return < SpendingItem key={spendingKey}
        datetime={spending.datetime}
        merchant={spending.merchant}
        amount={spending.amount}
      />
    });

    return (
      <SpendingTable items={items} />
    );
  }
}

function SpendingTable(props) {
  return (
    <table>
      <tbody>
        <tr>
          <th>Date</th>
          <th>Merchant</th>
          <th class="currency">Amount</th>
        </tr>
        {props.items}
      </tbody>
    </table>
  );
}

function SpendingItem(props) {
  return (
    <tr>
      <td>{props.datetime}</td>
      <td>{props.merchant}</td>
      <td class="currency">{props.amount}</td>
    </tr>
  )
}

export default Spendings