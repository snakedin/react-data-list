
const providerMock = async ({ page, pageSize, sortBy }, filter) => {

    const data = [
        {id: 1, name: 'Teenage Mutant Ninja Turtles', year: 1987, seasons: 10, episodes: 193},
        {id: 2, name: 'Spider-Man', year: 1967, seasons: 3, episodes: 52},
        {id: 3, name: 'She-Ra: Princess of Power', year: 1985, seasons: 2, episodes: 93},
        {id: 4, name: 'The Pink Panther', year: 1992, seasons: 2, episodes: 60},
        {id: 5, name: 'Biker Mice from Mars', year: 1993, seasons: 3, episodes: 65},
        {id: 6, name: 'The Transformers', year: 1984, seasons: 4, episodes: 98},
        {id: 7, name: 'The Flintstones', year: 1960, seasons: 6, episodes: 166},
        {id: 8, name: 'The Spooktacular New Adventures of Casper', year: 1996, seasons: 4, episodes: 52},
        {id: 9, name: 'Adventures of the Gummi Bears', year: 1985, seasons: 6, episodes: 65},
        {id: 10, name: 'Visionaries: Knights of the Magical Light', year: 1987, seasons: 1, episodes: 13},
        {id: 11, name: 'Dino-Riders', year: 1988, seasons: 1, episodes: 14},
        {id: 12, name: 'The Pirates of Dark Water', year: 1991, seasons: 2, episodes: 21},
        {id: 13, name: 'X-Men', year: 1992, seasons: 5, episodes: 76},
        {id: 14, name: 'Jayce and the Wheeled Warriors', year: 1985, seasons: 1, episodes: 65},
        {id: 15, name: 'Challenge of the GoBots', year: 1984, seasons: 2, episodes: 65},
        {id: 16, name: 'Papyrus', year: 1998, seasons: 1, episodes: 17},
        {id: 17, name: 'Spellbinder', year: 1995, seasons: 1, episodes: 26},
        {id: 18, name: 'Ocean Girl', year: 1994, seasons: 4, episodes: 78},
        {id: 19, name: 'SWAT Kats: The Radical Squadron', year: 1993, seasons: 2, episodes: 25},
        {id: 20, name: 'Elly & Jools', year: 1990, seasons: 1, episodes: 12},
        {id: 21, name: 'Are You Afraid of the Dark?', year: 1990, seasons: 7, episodes: 91},
        {id: 22, name: 'Mission Top Secret', year: 1992, seasons: 2, episodes: 48},
        {id: 23, name: 'Aquila', year: 1997, seasons: 2, episodes: 13},
        {id: 24, name: 'The Raccoons', year: 1980, seasons: 5, episodes: 1960},
        {id: 25, name: 'He-Man and the Masters of the Universe', year: 1983, seasons: 2, episodes: 130},
        {id: 26, name: 'Voltron', year: 1984, seasons: 1, episodes: 72},
        {id: 27, name: 'Hey Arnold!', year: 1996, seasons: 5, episodes: 100},
        {id: 28, name: 'Sailor Moon', year: 1992, seasons: 1, episodes: 200},
        {id: 29, name: 'Pokémon', year: 1997, seasons: 23, episodes: 1118},
        {id: 30, name: 'Ghostbusters', year: 1986, seasons: 1, episodes: 65}
    ];

    let items = data;

    if (sortBy !== undefined) {
        items = data.sort((a, b) => {
            if (sortBy.charAt(0) === '-') {
                const currentSort = sortBy.slice(1);
                return (a[currentSort] < b[currentSort]) ? 1 : ((b[currentSort] < a[currentSort]) ? -1 : 0)
            } else {
                return (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0)
            }
        });
    }

    if (filter !== undefined) {
        Object.entries(filter).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                items = items.filter(item => item[key] === parseInt(value));
            }
        });
    }

    return {
        items: items.slice((page-1)*pageSize, page*pageSize),
        count: items.length
    };
};

export default providerMock;
