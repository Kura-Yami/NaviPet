# NaviPet

NaviPet is an Expo React Native prototype for an indoor/outdoor navigation app where a customizable pet acts as the user's guide.

## What Is Built

- Sign in, sign up, and guest entry
- Map home with search, profile, pet marker, destination card, 2D/3D toggle, and custom bottom navigation
- Search, route preview, and active navigation flows
- Pet customization with selectable outfits and gem balance
- Store with outfit/gem tabs, item modal, and mock purchases
- Profile settings and account switching
- Hamburger menu overlay
- Achievements and daily task checklist
- Friends, friend profile, message list, and one-on-one chat

All data is mocked locally in `data/mockData.ts`. Prototype state is handled in `data/AppState.tsx`.

## Run

```powershell
npm install
npm run web
```

For Android with Expo Go on a real phone:

```powershell
npm run android
```

Open the QR code with the Expo Go app. Your phone and computer need to be on the same Wi-Fi network.

For a TypeScript check:

```powershell
npm run typecheck
```

For a static web export:

```powershell
npm run export:web
npm run preview:web
```
