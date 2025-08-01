# Brgy Konek Mobile

## Overview

Brgy Konek Mobile is a cross-platform mobile application built with Expo, React Native, and TypeScript. It leverages modern libraries for navigation, state management, and styling, providing a robust foundation for scalable mobile development.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)
- Expo CLI (`npm install -g expo-cli`)
- Xcode (for iOS development, macOS only)
- Android Studio (for Android development)

## Installation

1. Clone the repository:

```
git clone https://github.com/itsmenoahpoli/brgy-konek-mobile
cd brgykonek-mobile
```

2. Install dependencies:

```
npm install
```

## Setup

- No additional setup is required for basic development. All configuration files for TypeScript, Tailwind CSS, NativeWind, and Metro are included.
- For iOS development, ensure Xcode and its command line tools are installed.
- For Android development, ensure Android Studio and an emulator or device are set up.

## Running the Application

### Start the development server

```
npm start
```

### Run on Android

```
npm run android
```

### Run on iOS

```
npm run ios
```

### Run on Web

```
npm run web
```

## Building the Application

### Build for Android (EAS Build)

```
npm run build:android
```

### Prebuild (if you need to sync native code)

```
npm run prebuild
```

## Linting and Formatting

### Lint the codebase

```
npm run lint
```

### Format the codebase

```
npm run format
```

## Project Structure

- `app/` - Application entry and route files
- `components/` - Reusable UI components
- `constants/` - App-wide constants
- `services/` - Service and API logic
- `store/` - State management (Zustand)
- `hooks/` - Custom React hooks
- `utils/` - Utility functions
- `assets/` - Images and static assets
- `data/` - Philippine address data (regions, provinces, cities)

## Address Fields

The application includes comprehensive address fields for Philippine locations:

### Address Structure

- **Sitio/Street** - Text input for specific street or sitio
- **Barangay** - Text input for barangay name
- **Region** - Dropdown with all Philippine regions
- **Province** - Dropdown filtered by selected region
- **City/Municipality** - Dropdown filtered by selected province

### Data Source

Address data is sourced from the [Philippine Addresses](https://github.com/isaacdarcilla/philippine-addresses) repository and includes:

- 17 regions
- 87 provinces
- 1,634 cities/municipalities

### Features

- Cascading dropdowns (province depends on region, city depends on province)
- Form validation for all address fields
- Responsive design for different screen sizes
- TypeScript support with proper type definitions

## Additional Notes

- The project uses [Expo Router](https://expo.github.io/router/docs) for navigation and [NativeWind](https://www.nativewind.dev/) for styling with Tailwind CSS.
- For more information on EAS Build, see the [Expo EAS Build documentation](https://docs.expo.dev/build/introduction/).

## License

Add your license information here.
