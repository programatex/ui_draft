function txttokenaize(c) {
    let p = 0;
    let token = []
    while (p<c.length) {
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

        token.push(["TXT",c[p]]);
        p++;
    }
    let brcnt = 0
    token.push(["EOF",""])
    return token;
}
function txthighlight(code,lang="") {
    codearea = document.createElement("div")
    codearea.className = "highlightbody"
    outelm = document.createElement("div")
    outelm.className = "codearea"
    tokens = txttokenaize(code)
    outelm.innerHTML = "";
        let brcnt = 0
        let pacnt = 0
        let bracnt = 0
    for (let t=0;t<tokens.length;t++) {
        thistoken = document.createElement("pre")
        thistoken.innerHTML += tokens[t][1]
        thistoken.className = "txt " + tokens[t][0]
        outelm.append(thistoken)
    }
    langtag = document.createElement("p")
    langtag.className = "txt langtag"
    if (lang.length>0) {
        langtag.innerHTML = `txt - ${lang}`
    }
    else {
        langtag.innerHTML = `txt`
    }
    codearea.appendChild(langtag)
    codearea.appendChild(outelm)
    return codearea
}