class TreeNode {
	constructor(value, Childrem) {
		this.value = value;
		this.Childrem = Childrem;
		this.father = null;
        this.isFinal = false;
	}
    /**
     * This method Add a word to the children of the root nodes
     * @param {Array} word a word letter by letter
     * @returns {void}
     */
    AddWord(word){
        if(word.length>0) { // La palabra debe tener una longitud > 0
            for (let i = 0; i < this.Childrem.length; i++) { // Recorremos el Array hijos
                if (this.Childrem[i].value===word[0]) { // Si encontramos la letra
                    if (word.length===1) this.Childrem[i].isFinal = true;
                    this.Childrem[i].AddWord(word.splice(1)); //Recursiva
                    return;
                }
            }
            let node = new TreeNode(word[0], new Array());
            node.father=this;
            this.Childrem.push(node);
            if (word.length===1) node.isFinal = true;
            node.AddWord(word.splice(1));
        } 
    }
    /**
     * This method searches every words which are contains in this object
     * @param {String} pref prefix searched
     * @returns {Array}
     */
    GetWords(pref) {
        /**
         * This function returns an array with nodes which are in the prefix   
         * @param {TreeNode} node root node
         * @param {String} pref prefix searched
         * @returns {Array}
         */
        let GetTree = (node, pref) => {
            let word = pref.split("");
            if (pref.length>0) {
                for (let i = 0; i < node.Childrem.length; i++) {
                    if (word[0] === node.Childrem[i].value) {
                        return GetTree(node.Childrem[i], word.splice(1).toString(word).replace(/[^a-zA-Z]/g, "")); 
                    }  
                }
            } else return node.Childrem;
            return [];
        }

        /**
         * This array save the words to be returned
         */
        let words = [];
        /**
         * This function search the node child words
         * @param {TreeNode} node root node
         * @param {String} string Initial value of the word to request
         * @returns {void}
         */
        let search = (node, string = this.value) => {
            if (node.Childrem.length > 0) {
                node.Childrem.forEach(child => search(child, string.concat(child.value)));
                if (node.isFinal) words.push(string) 
            } else {
                string.length > 0 ? words.push(string) : undefined;
                return;
            }
        }

        GetTree(this, pref).forEach(node => search(node, pref.concat(node.value)));

        return words.length > 0 ? words : [pref];
    }
    /**
     * This Method import the every words in the text
     * @param {String} text Text to create the tree
     */
    ImportText(text) {
        let words = [];
        text = text.replace(/[^a-zA-Z\s]/g, "").replace(/[\n]/g, " ").toLowerCase().split(" ");
        text.forEach(word => words.push(word.split("")));
        words.forEach(word=>this.AddWord(word));
    }
}


