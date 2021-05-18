let Tree = new TreeNode("Trie", new Map(), null);
Tree.ImportText("will wine wire wire wires win window widow winner hello hell hack hacker hook house");
let result = "";

let inputSearch = document.querySelector("#input_search");
inputSearch.addEventListener("keyup", (e) => {
    if (e.target.value !== "") {
        Tree.GetWords(e.target.value.toLowerCase()).forEach(element => {
            result += `
                <div class="item">
                    <span class="item_text">${element}</span>
                </div>
            `;
        });
        document.getElementById("result").innerHTML = result;
        result ="";
    } else {
        document.getElementById("result").innerHTML = `
        <div class="default_result">
            <h3>Autocomplete words with our default database. 
                <br>
                If you dont want it, you can add your own words.
            </h3>
        </div>
        `;
    }
});

let searchWordsDiv = document.querySelector("#search_words");
let importWordsDiv = document.querySelector("#import_words");
let trieDiv = document.querySelector("#trie");

let searchWordBtn = document.querySelector("#search_word");
let addWordsBtn = document.querySelector("#add_words");
let showTrieBtn = document.querySelector("#show_trie");
showTrieBtn.addEventListener("click", () => {
    showTrieBtn.classList.add("active");
    addWordsBtn.classList.remove("active");
    searchWordBtn.classList.remove("active");

    searchWordsDiv.classList.add("disable");
    importWordsDiv.classList.remove("active");
    trieDiv.classList.add("active");
    ShowTrie(Tree);
});


addWordsBtn.addEventListener("click", () => {
    showTrieBtn.classList.remove("active");
    addWordsBtn.classList.add("active");
    searchWordBtn.classList.remove("active");

    searchWordsDiv.classList.add("disable");
    importWordsDiv.classList.add("active");
    trieDiv.classList.remove("active");
});


searchWordBtn.addEventListener("click", () => {
    showTrieBtn.classList.remove("active");
    addWordsBtn.classList.remove("active");
    searchWordBtn.classList.add("active");

    searchWordsDiv.classList.remove("disable");
    importWordsDiv.classList.remove("active");
    trieDiv.classList.remove("active");
});


let Import = document.querySelector("#import_add");
Import.addEventListener("click", () => {
    let value = document.querySelector("#text_area").value;
    if (value !== "") {
        Tree.ImportText(value);
        document.querySelector("#text_area").value = "";
        showPopUp("Words Added");
        
    }
});

let clear = document.querySelector("#clear_tree");
clear.addEventListener("click", () => {
        Tree.Clear();
        showPopUp("Words database cleaned");
});



const showPopUp = (text) => {
    document.querySelector("#pop_up").innerHTML = `
            <span>${text}</span>
    `;
    document.querySelector("#pop_up").style.display = 'flex';
    setTimeout(()=>{
        document.querySelector("#pop_up").style.display = 'none';
    }, 1000);
}

document.querySelector("#text_area").value = "";