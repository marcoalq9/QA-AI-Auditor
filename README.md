# QA-AI-Auditor

QA auditing project with AI integration for automated quality assurance testing.

## Description

This project automates quality auditing processes for e-commerce platforms using Playwright for end-to-end testing and Google's Gemini AI for intelligent content validation. It focuses on legal and quality compliance of product descriptions and user flows.

## Features

- **Page Object Model**: Modular and maintainable test structure using Playwright.
- **AI-Powered Auditing**: Integration with Gemini AI to audit product descriptions for legal compliance.
- **Comprehensive Testing**: Covers login, inventory, cart, and checkout flows.
- **Negative Testing**: Includes tests for error scenarios and edge cases.
- **TypeScript Support**: Fully typed codebase for better development experience.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Google Gemini API key

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/marcoalq9/QA-AI-Auditor.git
   cd QA-AI-Auditor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npm run install-browsers
   ```

## Environment Variables

Create a `.env` file in the root directory and add your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## Usage

### Running Tests

Run all tests:

```bash
npm test
```

Run specific test file:

```bash
npx playwright test tests/happy-path-checkout.spec.ts
```

Run tests in headed mode (visible browser):

```bash
npx playwright test --headed
```

### Generating Reports

After running tests, generate and view HTML report:

```bash
npx playwright show-report
```

## Project Structure

```
AUDITOR-QA/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/                  # Test specifications
│   ├── login-negative.spec.ts
│   └── happy-path-checkout.spec.ts
├── utils/                  # Utility functions
│   ├── testData.ts         # Test data constants
│   └── ai_auditor.ts       # AI auditing functions
├── node_modules/           # Dependencies
├── .gitignore              # Git ignore rules
├── package.json            # Project configuration
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Testing Strategy

- **Happy Path Testing**: Validates successful user journeys (login → add to cart → checkout).
- **Negative Testing**: Ensures proper error handling (locked user, invalid inputs).
- **AI Auditing**: Uses Gemini to validate product descriptions for legal compliance.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Technologies Used

- **Playwright**: End-to-end testing framework
- **TypeScript**: Type-safe JavaScript
- **Google Gemini AI**: AI-powered content auditing
- **Node.js**: Runtime environment
