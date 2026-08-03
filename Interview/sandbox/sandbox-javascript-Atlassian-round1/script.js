console.log("Testing for Atlassian!!!!")

const cardTemplate = document.querySelector('#card-tempalte')
const container = document.querySelector('.container')

//const clone = cardTemplate.content.cloneNode(true);

const totalCards = Array(3).fill().map(r => cardTemplate.content.cloneNode(true));
console.log(totalCards)


//container.append(totalCards)

container.append(...totalCards)
// container.appendChild(clone)
// container.appendChild(clone)


 function getTaskList(t = 1) {
    const o = "Lorem ipsum dolor sit amet consectetur adipiscing elit dedo eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" ");
    const e = 15; const i = 5;
    return new Promise(n => {
        setTimeout(() => {
            const s = []; if (t >= e) { n(null); return } for (let n = t; n < Math.min(t + i, e); n++) {
                const t = 3; const e = o.length; const i = Math.min(e, Math.floor(Math.random() * e) + t); const r = Math.floor(Math.random() * (e - i + 1)); let a = o.slice(r, r + i); let l = a.join(" ") + "."; l = l.charAt(0).toUpperCase() + l.slice(1); s.push({ id: n, key: `ISSUE-${n}`, link: `/issues/${n}`, description: l, priority: Math.floor(Math.random() * 3) })
            } n(s)
        }, 500 + Math.random() * 500)
    })
}



async function fetchTasks() {
    const resul = await getTaskList()

    console.log(resul)
}

fetchTasks()




//Id and key and description , priority