const readline = require('readline');
const fs = require('fs');

// Function to calculate charge based on time worked and type of work
function calculateCharge(timeWorked, workType) {
    let chargePerHour = 0;

    // Assign charge based on work type
    switch (workType.toLowerCase()) {
        case '1':
            chargePerHour = 1200; // Hardware
            break;
        case '2':
            chargePerHour = 800; // Software
            break;
        case '3':
            chargePerHour = 900; // Website or App
            break;
        case '4':
            chargePerHour = 1800; // Both
            break;
        default:
            chargePerHour = 1000; // Default charge
    }

    const hoursWorked = timeWorked / (1000 * 60 * 60); // Convert milliseconds to hours
    return chargePerHour * hoursWorked;
}

// Function to display time in HH:MM:SS format
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

let timerInterval;
let totalTime = 0;
let startTime;
let paused = false; // Flag to track if timer is paused
let workType = ''; // Type of work
let customerInfo = {}; // Customer information
let jsonFilePath = 'work_records.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to start the timer
function startTimer() {
    startTime = Date.now() - totalTime;
    timerInterval = setInterval(() => {
        if (!paused) {
            const currentTime = Date.now();
            totalTime = currentTime - startTime;
            console.clear();
            console.log('Working Mode Is ON');
            console.log('  EEEEE   CCCCC  OOOOO   CCCCC  EEEEE   EEEEE');
            console.log('  E       C     o     O  C     E        E');
            console.log('  EEEE    C           O  C       EEEE    EEEE');
            console.log('  E       C     o     O  C     E        E');
            console.log('  EEEEE   CCCCC  OOOOO   CCCCC  EEEEE   EEEEE');
            console.log('Timer Running:', formatTime(totalTime));
        }
    }, 1000);
}

// Function to pause the timer
function pauseTimer() {
    paused = true;
}

// Function to resume the timer
function resumeTimer() {
    paused = false;
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    console.clear();
    console.log('Timer Stopped. Total Time:', formatTime(totalTime));
    console.log('Customer Information:', customerInfo);
    console.log('Type of Work:', workType);
    const charge = calculateCharge(totalTime, workType);
    console.log('Total Charge:', charge, 'Rs');
    updateJsonFile(customerInfo, workType, totalTime, charge);
    rl.close();
}

// Function to gather customer information
function gatherCustomerInfo() {
    rl.question('Enter customer name: ', (name) => {
        customerInfo.name = name;
        rl.question('Enter phone number: ', (phoneNumber) => {
            customerInfo.phoneNumber = phoneNumber;
            rl.question('Enter order ID: ', (orderId) => {
                customerInfo.orderId = orderId;
                rl.question('Enter email ID: ', (emailId) => {
                    customerInfo.emailId = emailId;
                    rl.question('Select type of work:\n1. Hardware\n2. Software\n3. Website/App\n4. Both\n', (type) => {
                        workType = type;
                        startTimer();
                        mainLoop();
                    });
                });
            });
        });
    });
}

// Function to update JSON file
function updateJsonFile(customerInfo, workType, totalTime, charge) {
    let data = [];

    try {
        if (fs.existsSync(jsonFilePath)) {
            data = JSON.parse(fs.readFileSync(jsonFilePath));
        }

        const newData = {
            'Customer Name': customerInfo.name,
            'Phone Number': customerInfo.phoneNumber,
            'Order ID': customerInfo.orderId,
            'Email ID': customerInfo.emailId,
            'Type of Work': getWorkTypeLabel(workType),
            'Total Time': formatTime(totalTime),
            'Charge (Rs)': charge
        };

        data.push(newData);

        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
        console.log('Data saved to JSON file:', jsonFilePath);
    } catch (err) {
        console.error('Error updating JSON file:', err);
    }
}

// Function to get work type label based on numeric selection
function getWorkTypeLabel(type) {
    switch (type) {
        case '1':
            return 'Hardware';
        case '2':
            return 'Software';
        case '3':
            return 'Website/App';
        case '4':
            return 'Both';
        default:
            return 'Unknown';
    }
}

// Main loop to accept user commands
function mainLoop() {
    rl.question('Press "p" to pause, "r" to resume, or "s" to stop the timer: ', (answer) => {
        switch (answer.toLowerCase()) {
            case 'p':
                pauseTimer();
                break;
            case 'r':
                resumeTimer();
                break;
            case 's':
                stopTimer();
                break;
            default:
                console.log('Invalid command. Please press "p" to pause, "r" to resume, or "s" to stop the timer.');
        }
        if (answer.toLowerCase() !== 's') {
            mainLoop();
        }
    });
}

console.log('Welcome to Personal Work Timer!');
gatherCustomerInfo();
