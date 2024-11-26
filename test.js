const { execSync } = require("child_process");
const path = require('');

describe('app.js tests', () => {

    it('should filter countries and people with pattern \'RATS\'', () => {
        console.log('should filter countries and people with pattern \'RATS\'');

        const result = execSync('node app.js --filter=Rats', { encoding: 'utf-8' });
        console.log(result);

        expect(result).toContain('Uzuzozne');

    });

    it('should return one message if no animals match the filter pattern', () => {

        console.log('should return one message if no animals match the filter pattern');

        const result = execSync('node app.js --filter=Loup', { encoding: 'utf-8' });
        console.log(result);

        expect(result).toContain('No match was found!');
    });


    it('should print an error message for invalid commands', () => {
        console.log('should print an error message for invalid commands');

        const result = execSync('node app.js --wrongCommand', { encoding: 'utf-8' });
        console.log(result);

        expect(result).toContain('Invalid command. \nAvailable commands: --filter=pattern and --count');

    });

    it('should filter countries and people based on a pattern for an animal', () => {
        console.log('should filter countries and people based on a pattern for an animal');

        const result = execSync('node app.js --filter=CAT', { encoding: 'utf-8' });
        console.log(result);

        expect(result).toContain('Dillauti');
        expect(result).toContain('Bobby Ristori');
        expect(result).toContain('Tohabdal');
        expect(result).toContain('Curtis Fuchs');
        expect(result).toContain('Randall Benoît');
        expect(result).toContain('Uzuzozne');
        expect(result).toContain('Lina Allen');
        expect(result).toContain('Philip Davis');

    });

    it('should handle --count command and append correct counts to names', () => {
        console.log('should handle --count command and append correct counts to names');

        const result = execSync('node app.js --count', { encoding: 'utf-8' });
        console.log(result);

        // match country names 
        expect(result).toContain('Dillauti [5]');
        expect(result).toContain('Tohabdal [8]');
        expect(result).toContain('Uzuzozne [7]');
        expect(result).toContain('Satanwi [5]');

        // match person names
        expect(result).toContain('Winifred Graham [6]');
        expect(result).toContain('Blanche Viciani [8]');
        expect(result).toContain('Philip Murray [7]');
        expect(result).toContain('Bobby Ristori [9]');
        expect(result).toContain('Effie Houghton [7]');
    });
})
