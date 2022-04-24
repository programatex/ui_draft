//2進数→10進数
function bintodec(strs) {
    let result = 0;
    for (let i = 0; i < strs.length; i++) {
        if (strs[i]=="1") {
            result += (2**(strs.length-i-1));
        }
    }return result;
}

//自然数累乗
function exponentiation(x,n) {
    let result = 1;
    for (let i = 0;i < n;i++) {
        result *= x;
    }
    return result;
}

//自然数階乗
function factonal(){
}

//順列
function permutationOP{
}


