import fs from 'fs';

export default class History {
    listHistory = []

    saveHistory (item) {
        if(this.listHistory.length == 5) {
            this.listHistory.shift()
        }
        this.listHistory.unshift(item)
        fs.writeFileSync('./database/db.json', JSON.stringify(this.listHistory));
    };
    
    loadHistory () {
        const data = fs.readFileSync('./database/db.json', {encoding: 'utf8'}); 
        if(data) {
            const history = JSON.parse(data)
            history.forEach( item => {this.listHistory.push(item)});
        }
    }
    clearHistory() {
        this.listHistory = [];
        fs.writeFileSync('./database/db.json', JSON.stringify(this.listHistory));
    }

} 