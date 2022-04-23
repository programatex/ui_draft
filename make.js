class MAKE {
    get() {
        let article = location.hash.substring(1);
        console.log(article)
        let req = new XMLHttpRequest();
        req.open("GET","./article/"+article+".md",false);
        req.setRequestHeader('Cache-Control', 'Cache-Control: max-age=3600');
        req.send();
        
        if (req.status!=200&&req.status!=300) {
            let errormsg = req.responseText
            console.error(errormsg)
            return '# '+req.status.toString()+' Article not found\nSorry, "'+article+'" page was not found'
        }
        return req.response;
    }
    makehtml() {
        let data = this.get();
        let d = data.replace(/\r/g,"").split("\n");
        let title = "";
        let elm = document.createElement("div");
        let index = [];
        let id = 0;
        elm.onclick = pageclick
        elm.id = "page"
        let p = 0;
        while (p<d.length) { // main
            let part = document.createElement("div");
            if (d[p].startsWith("# ")) {
                if (title=="") {
                    title = d[p].slice(2);
                    console.log(title);
                }
                part = document.createElement("h1");
                part.innerHTML = d[p].slice(2);
                part.className = "page";
                part.id = "i"+id.toString();
                index.push([1,d[p].slice(2),id]);
                id++;
                elm.appendChild(part);
            }
            else if (d[p].startsWith("## ")) {
                part = document.createElement("h2");
                part.innerHTML = d[p].slice(3);
                part.className = "page";
                part.id = "i"+id.toString();
                index.push([2,d[p].slice(3),id]);
                id++;
                elm.appendChild(part);
            }
            else {
                let pelm = document.createElement("p");
                pelm.className = "page";
                while (true) {
                    if (p>=d.length||d[p].startsWith("## ")||d[p].startsWith("# ")) {
                        if (pelm.innerHTML.length>0) {
                            part.appendChild(pelm);
                        }
                        p--;
                        break;
                    }
                    if (d[p].startsWith("```")) {
                        let preelm = document.createElement("pre");
                        preelm.className = "page";
                        if (d[p].length>3) {
                            let pelm = document.createElement("p");
                            pelm.className = "page lang";
                            pelm.innerHTML = d[p].substring(3).split(" ")[0]
                            preelm.appendChild(pelm);
                        }
                        let codeelm = document.createElement("code");
                        codeelm.className = "page";
                        p++;
                        while (true) {
                            if (p>=d.length||d[p].startsWith("```")) {
                                break;
                            }
                            codeelm.innerHTML += this.escapeHTML(d[p])+"\n";
                            p++;
                        }
                        if (pelm.innerHTML.length>0) {
                            part.appendChild(pelm);
                        }

                        preelm.appendChild(codeelm);
                        part.appendChild(preelm);

                        pelm = document.createElement("p");
                        pelm.className = "page";
                    }
                    else {
                        pelm.innerHTML += d[p].replace(/\ \ /g,"<br>");
                    }
                    p++;
                }
                if (part.children.length>0) {
                    part.className = "page";
                    elm.appendChild(part);
                }
            }
            p++;
        }
        console.log(index);
        let ielm = document.createElement("ul");
        ielm.className = "panellist";
        ielm.id = "index";
        for (let i=0;i<index.length;i++) {
            let lielm = document.createElement("li");
            let buttonelm = document.createElement("button");
            lielm.className = "panellist";
            buttonelm.className = "panellist";
            buttonelm.addEventListener("click",function() { jump("i"+index[i][2]) });

            buttonelm.innerHTML = index[i][1];

            lielm.appendChild(buttonelm);
            ielm.appendChild(lielm);
        }
        if (title!="") {
            title = title+" - ";
        }

        return {"main":elm,"index":ielm,"title":title};
    }
    escapeHTML(str) { // https://qiita.com/hrdaya/items/4beebbdb57009b405d2d
        return str
            .replace(/&esc;/g, '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };
}