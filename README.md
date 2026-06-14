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

## Indoor Navigation Direction

The current navigation prototype is centered on CSULB's Vivian Engineering Center. The app now includes a stacked multi-floor indoor map mockup and a Multiset-ready camera verification panel for indoor localization.

The route preview uses Mapbox web APIs for the outdoor campus segment to Vivian Engineering Center, then switches into the indoor stacked floor map. Keep the public Mapbox token in `.env.local`:

```env
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_public_token
```

Planned provider wiring:

- `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` for Mapbox campus/3D building context.
- `EXPO_PUBLIC_MULTISET_CLIENT_ID` and `EXPO_PUBLIC_MULTISET_CLIENT_SECRET` for Multiset VPS.
- Replace `VIVIAN_ENGINEERING_CENTER_MAP_SET` in `data/indoorMapData.ts` with the real Multiset map or map-set code after the scan is processed.

Mapbox native maps require a custom Expo development build, not plain Expo Go. Multiset's current VPS WebXR SDK is Android/ARCore-focused and is not an iOS Safari path, so Samsung is the best first device target for that camera verification workflow.
