class TreeNode {
	constructor(value, Childrem, father) {
		this.value = value;
		this.Childrem = Childrem;
		this.father = father;
        this.isFinal = false;
        this.id = Math.random()*9;
	}
    ImportText(text) {
        let words = [];
        text = text.replace(/[^a-zA-Z\s]/g, "").replace(/[\n]/g, " ").toLowerCase().split(" ");
        text.forEach(word => words.push(word.split("")));
        words.forEach(word=>this.AddWord(word));
    }
    /**
     * This method Add a word to the children of the root node
     * @param {Array} word a word letter by letter
     * @returns {void}
     */
    AddWord(word){
        if(word.length>0) {
            if (this.Childrem.get(word[0])) {
                if (word.length===1) this.Childrem.get(word[0]).isFinal = true;
                this.Childrem.get(word[0]).AddWord(word.splice(1)); //Recursive
                return;
            }
            let node = new TreeNode(word[0], new Map(), this);
            node.isFinal = (word.length===1) ? true : false;
            this.Childrem.set(word[0], node);
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
         * @returns {Object}
         */
        let GetTree = (node, pref) => {
            let word = pref.split("");
            if (pref.length>0) {
                if (node.Childrem.get(word[0])) {
                    return GetTree(node.Childrem.get(word[0]), word.splice(1).toString(word).replace(/[^a-zA-Z]/g, "")); 
                } 
            } else return node.Childrem;
            return new Map();
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
            if (node.Childrem.size > 0) {
                node.Childrem.forEach((key) => search(key, string.concat(key.value)));
                if (node.isFinal) words.push(string);
            } else string.length > 0 ? words.push(string) : undefined;  
        }
        GetTree(this, pref).forEach((key) => search(key, pref.concat(key.value)));
        return words.length > 0 ? words : [pref];
    }
    Clear() {
        this.Childrem = new Map();
    }
}