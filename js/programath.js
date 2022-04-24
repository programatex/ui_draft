function bintodec(strs) {
    let result = 0;
    for (let i = 0; i < strs.length; i++) {
        if (strs[i]=="1") {
            result += (2**(strs.length-i-1));
        }
    }
    return result;
}
