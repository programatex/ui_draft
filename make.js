class MAKE {
    get() {
        let article = location.hash.substring(1);
        console.log(article)
        let req = new XMLHttpRequest();
        req.addEventListener("load", this.reqListener);
        req.open("GET","./article/"+article+".md",false);
        req.send();
        return req.responseText.toString();
    }
    makehtml() {
        let data = this.get();
        let d = data.replace(/\r/g,"").split("\n");
        let elm = document.createElement("div")
        elm.id = "page"
        console.log(d);
        let p = 0;
        while (p<d.length) {
            let part = document.createElement("div");
            if (d[p].startsWith("# ")) {
                part = document.createElement("h1");
                part.innerHTML = d[p].slice(2);
                part.className = "page"
                elm.appendChild(part);
            }
            else if (d[p].startsWith("## ")) {
                part = document.createElement("h2");
                part.innerHTML = d[p].slice(2);
                part.className = "page"
                elm.appendChild(part);
            }
            else {
                let pelm = document.createElement("p");
                pelm.className = "page";
                while (true) {
                    if (p>=d.length||d[p].startsWith("## ")) {
                        if (pelm.innerHTML.length>0) {
                            part.appendChild(pelm);
                        }
                        p--;
                        break;
                    }
                    if (d[p].startsWith("```")) {
                        let preelm = document.createElement("pre")
                        preelm.className = "page";
                        let codeelm = document.createElement("code")
                        codeelm.className = "page";
                        p++;
                        while (true) {
                            if (p>=d.length||d[p].startsWith("```")) {
                                break;
                            }
                            codeelm.innerHTML += d[p]+"\n"
                            p++
                        }
                        if (pelm.innerHTML.length>0) {
                            part.appendChild(pelm);
                        }

                        preelm.appendChild(codeelm)
                        part.appendChild(preelm)

                        pelm = document.createElement("p");
                        pelm.className = "page";
                    }
                    else {
                        pelm.innerHTML += d[p].replace(/\ \ /g,"<br>")
                    }
                    p++;
                }
                if (part.children.length>0) {
                    part.className = "page"
                    elm.appendChild(part);
                }

            }

            p++;
        }
        return {main:elm};
    }
}