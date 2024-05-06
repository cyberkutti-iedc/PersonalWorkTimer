
# Personal Work Timer



## Overview

This Node.js program serves as a personal timer for tracking work duration and calculating charges based on different types of work. It allows users to input customer information, select the type of work, and start, pause, resume, or stop the timer accordingly. The program also stores the data in a JSON file for record-keeping.

## Features

- **Timer Functionality:** Start, pause, resume, and stop the timer.
- **Customer Information:** Collect customer details such as name, phone number, order ID, and email ID.
- **Work Type Selection:** Choose between hardware, software, website/app, or both.
- **Charge Calculation:** Automatically calculates charges based on time worked and the selected type of work.
- **Data Persistence:** Stores customer information, work type, total time, and charge in a JSON file.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cyberkutti-iedc/PersonalWorkTimer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd personal-work-timer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Run the program:
   ```bash
   node index.js
   ```
2. Follow the prompts to enter customer information and select the type of work.
3. Press `p` to pause, `r` to resume, or `s` to stop the timer.
4. Once stopped, the program will display the total time worked and the calculated charge.
5. Data will be saved to `work_records.json`.


## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
