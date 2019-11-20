/**
 *
 * Created by shenzaifang on 2019-11-20
 */

export default function add(a, b) {
    if(typeof a!== 'string')return;
    if(typeof b!== 'string')return;
    let i = a.length - 1;
    let j = b.length - 1;
    let ret = '';

    let carry = 0;
    while (i >= 0 || j >= 0) {
        let x = 0;
        let y = 0;
        let sum;
        if (i >= 0) {
            x = a[i] - 0;
            i--;
        }
        if (j >= 0) {
            y = b[j] - 0;
            j--;
        }
        sum = x + y + carry;
        if (sum >= 10) {
            carry = 1;
            sum -= 10;
        } else {
            carry = 0;
        }
        ret = sum + ret;
    }
    if(carry){
        ret = carry + ret;
    }
    return ret;
}
