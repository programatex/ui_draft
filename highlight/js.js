
function jstokenaize(c) {
    let p = 0;
    let searchtype = [
        ["RETURN","return"],
        ["BOOL","true"],
        ["BOOL","false"],
        ["CONST","const"],
        ["FOR","for"],
        ["LET","let"],
        ["VAR","var"],
        ["NEW","new"],
        ["EQUAL","=="],
        ["NOTEQUAL","!="],
        ["ASSIGN","="],
        ["PLUS","+"],
        ["MINUS","-"],
        ["MUL","*"],
        ["NOT","!"],
        ["DIV","/"],
        ["LESS","<"],
        ["GREATER",">"],
        ["LPAREN","("],
        ["RPAREN",")"],
        ["LBRACE","{"],
        ["RBRACE","}"],
        ["LBRACKET","["],
        ["RBRACKET","]"],
        ["SEMICOLON",";"],
        ["COLON",":"],
    ]
    let token = []
    while (p<c.length) {
        console.log(c.slice(p,8))
        if (c[p]=="f"&&c[p+1]=="u"&&c[p+2]=="n"&&c[p+3]=="c"&&c[p+4]=="t"&&c[p+5]=="i"&&c[p+6]=="o"&&c[p+7]=="n"&&c[p+8]==" ") {
            token.push(["FUNCTION","function"]);
            token.push(["BLANK"," "])
            p+=9
            let scomment = p
            while (!(c[p]=="("||c[p]==")"||c[p]==" ")) {
                p++;
            }
            token.push(["FUNCTIONNAME",c.slice(scomment,p)])
            continue;
        }
        else if (c[p]=="i"&&c[p+1]=="f"&&(c[p+2]==" "||c[p+2]=="(")) {
            token.push(["IF","if"]);
            p+=2
        }
        else if (c[p]=="e"&&c[p+1]=="l"&&c[p+2]=="s"&&c[p+3]=="e"&&(c[p+4]==" "||c[p+4]=="(")) {
            token.push(["ELSE","else"]);
            p+=4
        }
        if (c[p]==" ") {
            let scomment = p
            while (c[p]==" ") {
                p++;
            }
            token.push(["BLANK",c.slice(scomment,p)])
            continue;
        }
        else if (c[p]=="\n") {
            p+=1;
            token.push(["CR","\n"])
            continue;
        }
        else if (c[p]=="/"&&c[p+1]=="*") {
            let scomment = p
            p+=2;
            while (!((c[p]=="*"&&c[p+1]=="/")||c[p+1]==null)) {
                if (c[p]==" ") {
                    token.push(["BCOMMENT",c.slice(scomment,p)])
                    scomment = p
                    while (c[p]==" ") {
                        p++;
                    }
                    token.push(["BLANK",c.slice(scomment,p)])
                    scomment = p
                    continue;
                }
                else if (c[p]=="\n") {
                    token.push(["BCOMMENT",c.slice(scomment,p)])
                    token.push(["CR","\n"])
                    p++;
                    scomment = p
                    continue;
                }
                p++
            }
            if (c[p+1]==null) {
                p+=2;
                token.push(["BCOMMENT",c.slice(scomment,p)])
                token.push(["CR","\n"])
            }
            else {
                p+=2;
                token.push(["BCOMMENT",c.slice(scomment,p)])
            }
            continue;
        }
        else if (c[p]=="/"&&c[p+1]=="/") {
            let scomment = p
            while (!(c[p+1]=="\n"||c[p+1]==null)) {
                if (c[p]==" ") {
                    token.push(["LCOMMENT",c.slice(scomment,p)])
                    scomment = p
                    while (c[p]==" ") {
                        p++;
                    }
                    token.push(["BLANK",c.slice(scomment,p)])
                    scomment = p
                    continue;
                }
                p++;
            }
            p+=1;
            token.push(["LCOMMENT",c.slice(scomment,p)])
            continue;
        }
        else if (c[p]=='"') {
            let scomment = p
                p++;
            while ((c[p]!='"')) {
                if (c[p]==null||c[p]=="\n") { break; }
                p++;
            }
            p++;
            token.push(["STRING",c.slice(scomment,p)])
        }
        else if (c[p]=="'") {
            let scomment = p
                p++;
            while ((c[p]!="'")) {
                if (c[p]==null||c[p]=="\n") { break; }
                p++;
            }
            p++;
            token.push(["STRING",c.slice(scomment,p)])
        }
        else if (c[p]=="`") {
            let scomment = p
                p++;
            while ((c[p]!="`")) {
                if (c[p]==null) { break; }
                if (c[p]=="\n") {
                    token.push(["STRING",c.slice(scomment,p)])
                    token.push(["CR","\n"])
                    p++;
                    scomment = p
                    continue;
                }
                p++;
            }
            p++;
            token.push(["STRING",c.slice(scomment,p)])
        }

        token.push(["VARIABLE",""]);
        if (!(c[p]==" "||c[p]=="\n"||c[p]==null)) {
            let opflag = false;
            let mlcomm = false;
            for (let o=0;o<searchtype.length;o++) {
                if (c.startsWith(searchtype[o][1],p)) {
                    p+=searchtype[o][1].length;
                    if (token[token.length-1][1]!="") {
                        token[token.length]=searchtype[o];
                    }
                    else {
                        token[token.length-1]=searchtype[o];
                    }
                    if (token[token.length-1][0]=="COLON"&&token[token.length-2][0]=="VARIABLE") {
                        token[token.length-2][0]="TYPE";
                    }
                    token.push(["VARIABLE",""]);
                    opflag = true;
                    break;
                }
            }
            if (!opflag) {
                token[token.length-1][1]+=c[p];
                if (token[token.length-1][0]=="VARIABLE") {
                    let nums = [0,1,2,3,4,5,6,7,8,9];
                    for (let n=0;n<nums.length;n++) {
                        if (token[token.length-1][1][0]==nums[n]) {
                            token[token.length-1][0]="DIGITS"
                        }
                    }
                }
                p++;
            }
        }
        if (token[token.length-1][1]=="") {
            token.splice(token.length-1,1);
        }
    }
    let brcnt = 0
    token.push(["EOF",""])
    return token;
}
function jshighlight(code) {
    codearea = document.createElement("div")
    codearea.className = "highlightbody"
    outelm = document.createElement("div")
    outelm.className = "codearea"
    tokens = jstokenaize(code)
    outelm.innerHTML = "";
        let brcnt = 0
        let pacnt = 0
        let bracnt = 0
    for (let t=0;t<tokens.length;t++) {
        thistoken = document.createElement("pre")
        thistoken.innerHTML += tokens[t][1]
        thistoken.className = "js " + tokens[t][0]
        let ccnt = ""
        {
            if (tokens[t][0].slice(1)=="BRACE") {
                if (tokens[t][0][0]=="L") {
                    brcnt++
                    ccnt = brcnt.toString();
                }
                else {
                    ccnt = brcnt.toString();
                    brcnt--
                }
                thistoken.className += " "+ccnt
            }
            if (tokens[t][0].slice(1)=="PAREN") {
                if (tokens[t][0][0]=="L") {
                    pacnt++
                    ccnt = pacnt.toString();
                }
                else {
                    ccnt = pacnt.toString();
                    pacnt--
                }
                thistoken.className += " "+ccnt
            }
            if (tokens[t][0].slice(1)=="BRACKET") {
                if (tokens[t][0][0]=="L") {
                    bracnt++
                    ccnt = bracnt.toString();
                }
                else {
                    ccnt = bracnt.toString();
                    bracnt--
                }
                thistoken.className += " "+ccnt
            }
        }
        outelm.append(thistoken)
    }
    langtag = document.createElement("p")
    langtag.className = "js langtag"
    langtag.innerHTML = "js"
    codearea.appendChild(langtag)
    codearea.appendChild(outelm)
    return codearea
}