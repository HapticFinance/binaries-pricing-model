import { ethers, BigNumber } from "ethers";
import colors from "colors";
export const { yellow, red, gray, green } = colors;

import { FeeAmount } from "@uniswap/v3-sdk";

import fs from 'fs/promises';
import path from 'path';

const { 
    getDefaultProvider, 
    utils
} = ethers;

const { 
    formatEther, 
    formatUnits, 
    parseUnits, 
    parseEther, 
    Interface 
} = utils;

const TICK_BASE = 1.0001;

const feeTiers = {
    MEDIUM: 3000,
    HIGH: 10000
};

const TRESHOLD = `0.005`;

export const execTxn = async (
    contract, 
    method, 
    args, 
    options
) => {
    const tx = await contract[method](...args, options);
    return tx;
}

export const saveBuild = async (buildData: any): Promise<void> => {
  try {
    const filePath = path.resolve(__dirname, './deployed.json');
    await fs.writeFile(
      filePath,
      JSON.stringify(buildData, null, "\t")
    );
  } catch (err) {
    console.log(err);
  }
};


export const getCreate2Address = (
    factoryAddress,
    [tokenA, tokenB],
    bytecode
) => {
    const [
        token0, 
        token1
    ] = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
    const create2Inputs = [
        '0xff',
        factoryAddress,
        keccak256(
            solidityPack(
                ['address', 'address'], 
                [token0, token1]
            )
        ),
        keccak256(bytecode)
    ];
    const sanitizedInputs = `0x${create2Inputs.map(i => i.slice(2)).join('')}`;
    return getAddress(
        `0x${keccak256(sanitizedInputs).slice(-40)}`
    );
}

export const decodeEvents = (tx, abi, filters) => {

    const iface = new Interface(abi);

    let decodedData = iface
    .parseTransaction({ 
        data: tx.data 
    });

    if (filters.includes(decodedData.name)) {
        if (decodedData.args.length == 4) {
            path = decodedData.args[1];
        } else if (decodedData.args.length == 5) {
            path = decodedData.args[2];
        }
        console.log(`Function is ${decodedData.name} - args length ${decodedData.args.length}`);
    }
}

export function getPercentageDiff(a, b) {
    if (b.eq(0)) {
      if (a.eq(0)) {
        return BigNumber.from(0);
      }
      return toBN('1');
    }
    return b.sub(a).mul(toBN('1')).div(b).abs();
}

export function compareResults(
    val1,
    val2,
    results,
    logData,
  ) {
    const diff = getPercentageDiff(val1, val2);
    if (diff.lt(toBN(TRESHOLD))) {
      results.good += 1;
    } else if (diff.lt(toBN(TRESHOLD))) {
      results.bad += 1;
    } else {
      results.unacceptable += 1;
      console.log({
        val1: fromBN(val1),
        val2: fromBN(val2),
        logData,
      });
    }
    return results;
}

export function combineArrays(array_of_arrays) {
    // First, handle some degenerate cases...
  
    if (!array_of_arrays) {
      // Or maybe we should toss an exception...?
      return [];
    }
  
    if (!Array.isArray(array_of_arrays)) {
      // Or maybe we should toss an exception...?
      return [];
    }
  
    if (array_of_arrays.length == 0) {
      return [];
    }
  
    for (let i = 0; i < array_of_arrays.length; i++) {
      if (!Array.isArray(array_of_arrays[i]) || array_of_arrays[i].length == 0) {
        // If any of the arrays in array_of_arrays are not arrays or zero-length, return an empty array...
        return [];
      }
    }
  
    // Done with degenerate cases...
  
    // Start "odometer" with a 0 for each array in array_of_arrays.
    const odometer = new Array(array_of_arrays.length);
    odometer.fill(0);
  
    const output = [];
  
    let newCombination = formCombination(odometer, array_of_arrays);
  
    output.push(newCombination);
  
    while (odometer_increment(odometer, array_of_arrays)) {
      newCombination = formCombination(odometer, array_of_arrays);
      output.push(newCombination);
    }
  
    return output;
} 

// Translate "odometer" to combinations from array_of_arrays
function formCombination(odometer, array_of_arrays) {
  // In Imperative Programmingese (i.e., English):
  // let s_output = "";
  // for( let i=0; i < odometer.length; i++ ){
  //    s_output += "" + array_of_arrays[i][odometer[i]];
  // }
  // return s_output;

  // In Functional Programmingese (Henny Youngman one-liner):
  return odometer.reduce(function (accumulator, odometer_value, odometer_index) {
    return [...accumulator, array_of_arrays[odometer_index][odometer_value]];
  }, []);
} /* formCombination() */

function odometer_increment(odometer, array_of_arrays) {
  // Basically, work you way from the rightmost digit of the "odometer"...
  // if you're able to increment without cycling that digit back to zero,
  // you're all done, otherwise, cycle that digit to zero and go one digit to the
  // left, and begin again until you're able to increment a digit
  // without cycling it...simple, huh...?

  for (let i_odometer_digit = odometer.length - 1; i_odometer_digit >= 0; i_odometer_digit--) {
    const maxee = array_of_arrays[i_odometer_digit].length - 1;

    if (odometer[i_odometer_digit] + 1 <= maxee) {
      // increment, and you're done...
      odometer[i_odometer_digit]++;
      return true;
    } else {
      if (i_odometer_digit - 1 < 0) {
        // No more digits left to increment, end of the line...
        return false;
      } else {
        // Can't increment this digit, cycle it to zero and continue
        // the loop to go over to the next digit...
        odometer[i_odometer_digit] = 0;
        continue;
      }
    }
  } /* for( let odometer_digit = odometer.length-1; odometer_digit >=0; odometer_digit-- ) */
}

export function fromBN(val, dec) {
  return ethers.utils.formatUnits(val, dec || 18);
}

export function toBN(val, decimals) {
    decimals = decimals || 18;
    // console.log(`Val is ${val} and decimals is ${decimals}`)
    
    // multiplier is to handle decimals
    if (val.includes('e')) {
      if (parseFloat(val) > 1) {
        const x = val.split('.');
        const y = x[1].split('e+');
        const exponent = parseFloat(y[1]);
        const newVal = x[0] + y[0] + '0'.repeat(exponent - y[0].length);
        // console.warn(`Warning: toBN of val with exponent, converting to string. (${val}) converted to (${newVal})`);
        val = newVal;
      } else {
        // console.warn(
        //   `Warning: toBN of val with exponent, converting to float. (${val}) converted to (${parseFloat(val).toFixed(
        //     decimals,
        //   )})`,
        // );
        val = parseFloat(val).toFixed(decimals);
      }
    } else if (val.includes('.') && val.split('.')[1].length > decimals) {
      const x = val.split('.');
      x[1] = x[1].slice(0, decimals);
      val = x[0] + '.' + x[1];
      // console.warn(`Warning: toBN of val with more than ${decimals} decimals. Stripped excess. (${val})`);

    }
    
    // let parsed 
    // try {
    //   parsed = utils.parseUnits(val, decimals);
    // } catch (e) {

    //   console.log(`Error parsing ${val} with ${decimals} decimals`)
    //   throw e
    // }

    if (isNaN(val) || !isFinite(val) || typeof val === 'undefined' || val === null) {
      return
    }

    return utils.parseUnits(val, decimals);
  }

  
export const priceToTick = (price) => {
    const numerator = Math.log(Math.sqrt(price));
    const denominator = Math.log(Math.sqrt(TICK_BASE));
    return Math.floor(numerator / denominator);
}

export const display = (value) => {
    return yellow(Number(value).toFixed(6));
}
