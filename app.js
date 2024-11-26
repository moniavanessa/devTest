const { data } = require('./data'); // importing data from data.js
const arguments = require('process');


// Function to filter animals based in pattern passed as argument
function filterAnimals(pattern) {

    //make it case insensitive
    const regex = new RegExp(pattern, 'i');

    // go through the list to search animals names that match the pattern
    return data.filter(country => {

        let countryWithAnimals = false;

        country.people = country.people.filter(person => {

            person.animals = person.animals.filter(animal =>
                regex.test(animal.name)
            );

            if (person.animals.length > 0) {
                countryWithAnimals = true;
            }

            return person.animals.length > 0;
        });

        return countryWithAnimals;
    });

}

// Function to count people and animals and modify names
function countChildren() {
    return data.map(country => {
        const peopleCount = country.people.length;

        country.name = `${country.name} [${peopleCount}]`;

        country.people = country.people.map(person => {
            const animalsCount = person.animals.length;
            person.name = `${person.name} [${animalsCount}]`;
            return person;

        });

        return country;

    });
}

const args = arguments.argv.slice(2);
const command = args[0];

// extract command 
const isSearchCommand = (args.find(arg => arg.startsWith('--filter=')));
const iscountCommand = command == '--count';


if (isSearchCommand) {
    // extract pattern to be matched
    const patternToSearch = isSearchCommand.split('--filter=')[1];

    if (patternToSearch.length > 0) {
        const filteredData = filterAnimals(patternToSearch);

        if (filteredData.length == 0) {
            console.log('No match was found!');
        }
        else {
            console.log(JSON.stringify(filteredData, null, 2));
        }
    }
    else {
        console.log('Missing arguments! ');
    }
}
else
    if (iscountCommand) {
        const countedData = countChildren();
        console.log(JSON.stringify(countedData, null, 2));

    }
    else {
        console.log('Invalid command. \nAvailable commands: --filter=pattern and --count');

    }

