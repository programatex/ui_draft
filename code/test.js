function bin_to_dec(strs) {
    let result = 0;
    for (let i = 0; i < strs.length; i++) {
        if (strs[i]=="1") {
            result += (2**(strs.length-i-1));
        }
    }
    return result;
}
function radius_to_diameter(r) { // 半径から直径
    return r*2;
}
function diameter_to_radius(r) { // 直径から半径
    return r/2;
}
function exponentiation(x,n) {
    let result = 1;
    for (let i = 0;i < n;i++) {
        result *= x;
    }
    return result;
}
function factonal(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
vector2 = [x,y]
vector3 = [x,y,z]