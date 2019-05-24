class Deltio {
    constructor(numbers, jokerNumber) {
        this.numbers = numbers;
        this.jokerNumber = jokerNumber;
    }
}

let generateOtherTicketsBtn = document.getElementById("generateOtherTicketsBtn");

generateOtherTicketsBtn.addEventListener("click", () => {
    if (confirm("Είστε Σίγουρος?")) {
        location.reload();
    }
});

let last100Tickets = [];

$.ajax({
    type: "GET",
    url: "https://limitless-forest-93522.herokuapp.com/https://api.opap.gr/draws/v3.0/5104/last/100",
    dataType: 'json',
    async: true,
    success: (data) => {
        data.forEach(element => {
            if (element.status !== 'active') {
                let winningNumbers = element.winningNumbers.list;
                winningNumbers.sort(function (a, b) { return a - b });
                let deltio = new Deltio(winningNumbers, element.winningNumbers.bonus[0]);
                last100Tickets.push(deltio);
            }
        });
        generateTenRandomTickets();
    },
    error: () => {
        console.log("eror");
    }
});

function generateTenRandomTickets() {
    let generatedTickets = [];
    var i;
    for (i = 0; i < 10; i++) {
        let numbers = [];
        var y;
        for (y = 0; y < 5; y++) {
            let num = Math.floor((Math.random() * 45) + 1);
            numbers.push(num);
        }
        let jokerNumber = Math.floor((Math.random() * 20) + 1);
        numbers.sort(function (a, b) { return a - b });
        let deltio = new Deltio(numbers, jokerNumber);
        generatedTickets.push(deltio);
    }
    checkIfTicketsHaveBeenDrawInTheLast100Draws(generatedTickets);
    // console.log(generatedDeltia);
    // console.log(last100Tickets);
}

function checkIfTicketsHaveBeenDrawInTheLast100Draws(tickets) {
    let last100TicketsStringiFied = JSON.stringify(last100Tickets);
    let ticketsElement = document.getElementById("tickets");
    let output;
    let i = 0;
    tickets.forEach(ticket => {
        let ticketStringified = JSON.stringify(ticket);
        if (last100TicketsStringiFied.includes(ticketStringified)) {
            alert("Παράχθηκε δελτίο που έχει κληρωθεί στο παρελθόν. Κάντε επαναφόρτωση της σελίδας");
        } else {
            i = i + 1;
            output += `<tr>
                            <th >${i}</th>
                            <td>${ticket.numbers}</td>
                            <td>${ticket.jokerNumber}</td>
                        </tr>`
        }
        ticketsElement.innerHTML = output;
    })
    // let numbers = [3, 14, 15, 17, 45];
    // let joker = 1;
    // let deltio = new Deltio(numbers, joker);
    // // console.log(deltio);
    // // console.log(last100Tickets[3] == deltio);
    // console.log(JSON.stringify(last100Tickets[3]) === JSON.stringify(deltio));
    // let last100TicketsStringiFied = JSON.stringify(last100Tickets);
    // let deltioStringified = JSON.stringify(deltio);
    // // console.log(last100TicketsStringiFied);
    // let contains = last100TicketsStringiFied.includes(deltioStringified);
    // console.log(contains);

}