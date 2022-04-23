# 2進数から10進数への変換


## プログラムの解説
2進数の文字列を引数strsとして渡す  
返り値用の変数resultを用意  
strsは2進数を1桁ごとに取得  
1ならば、2^桁をresultに足す  

## 数学的な解説
2進数のn桁目は、2^n の位になっています  
それぞれの桁で、1ならば2^nを足していけば10進数になります  
( 0の場合は 0(2^n) を足すことになるので計算する必要がありません )  
| 8の位 | 4の位 | 2の位 | 1の位 |  
| -- | -- | -- | -- |  
| 1 | 0 | 1 | 0 |  
1010(2) の場合は、 8×1+4×0+2×1+1×0 = 8+2 = 10  

## javascriptのプログラム例
引数strsに文字列として二進数を渡すと10進数に変換された整数が返り値になります  
```
function bin_to_dec(strs) {
    let result = 0;
    for (let i = 0; i < strs.length; i++) {
        if (strs[i]=="1") {
            result += (2**(strs.length-i-1));
        }
    }
    return result;
}
```

## c#のプログラム例
引数strsに文字列として二進数を渡すと10進数に変換された整数が返り値になります  
```
static int bin_to_dec(string strs) {
    int result = 0;
    for (int i=0; i < strs.Length; i++) {
        if (strs[i]=='1') {
            result += (int)Math.Pow(2,strs.Length-i-1);
        }
    }
    return result;
}
```

## pythonのプログラム例
引数strsに文字列として二進数を渡すと10進数に変換された整数が返り値になります  
```
def bin_to_dec(strs):
    result = 0
    for i in range(len(strs)):
        if (strs[i]=="1") :
            result += 2**(len(strs)-i-1)
    return result
```