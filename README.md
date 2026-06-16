# NaviPet

NaviPet is an [Expo](https://expo.dev/) React Native prototype for an indoor/outdoor navigation app where a customizable pet acts as the user's guide.

This is a **managed Expo app** (SDK 54) — pure TypeScript/JavaScript with no native `ios/` or `android/` folders. You run it inside the **Expo Go** host app, so there is no Xcode/Gradle compile step for normal development.

---

## Prerequisites

Install these once before you start.

| Tool | Required for | Notes |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) 18+ | Everything | LTS recommended. Check with `node -v`. |
| Git | Cloning the repo | |
| [Xcode](https://apps.apple.com/app/xcode/id497799835) | **iOS** | macOS only. Open it once after installing to accept the license and let it install components. |
| [Android Studio](https://developer.android.com/studio) | **Android** | Any OS. Used to get the Android emulator + SDK. |

You do **not** need to install the Expo CLI globally — it ships with the project and is run through the npm scripts.

### One-time iOS setup (macOS)

1. Install Xcode from the App Store.
2. Install the command-line tools and the iOS Simulator:
   ```bash
   xcode-select --install
   ```
3. Open **Xcode → Settings → Components** and make sure an iOS Simulator runtime is installed.

### One-time Android setup

1. Install Android Studio.
2. Open **Android Studio → More Actions → Virtual Device Manager** and create a virtual device (e.g. Pixel 7, latest system image).
3. Make sure the Android SDK platform-tools are on your `PATH` so `adb` works. On macOS/Linux add to your shell profile:
   ```bash
   export ANDROID_HOME="$HOME/Library/Android/sdk"   # macOS (Linux: ~/Android/Sdk)
   export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"
   ```

---

## Install

```bash
git clone <your-repo-url>
cd NaviPet
npm install
```

---

## Running on iOS and Android at the same time

The recommended flow: start **one** Metro dev server, then open the app on both platforms. They share the same bundler.

### Step 1 — Boot both devices

**iOS Simulator** (macOS):
```bash
open -a Simulator
```
Wait for a simulated iPhone to finish booting.

**Android Emulator** — either click ▶ next to your virtual device in Android Studio's Device Manager, or from the terminal:
```bash
emulator -list-avds          # see available emulator names
emulator -avd <avd-name>     # boot one, e.g. Pixel_7_API_34
```

### Step 2 — Start the dev server

```bash
npm start
```

This launches Metro and prints an interactive menu. From that terminal you can now open the app on each platform by pressing a key:

- Press **`i`** → opens the app on the booted iOS Simulator
- Press **`a`** → opens the app on the booted Android emulator
- Press **`r`** → reload · **`m`** → toggle dev menu · **`w`** → open web

Pressing `i` and then `a` runs the app on **both** at once, served by the same Metro instance. This is the simplest way to develop for iOS and Android simultaneously.

> Shortcut: `npm run ios` and `npm run android` each start a server *and* auto-open one platform. If you want both, prefer `npm start` + pressing `i`/`a`, since two separate `npm run` commands will fight over port 8081.

---

## Running on a physical phone (iOS or Android)

1. Install **Expo Go** from the [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS) or [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android).
2. Make sure your phone and computer are on the **same Wi-Fi network**.
3. Run `npm start`.
4. Scan the QR code in the terminal:
   - **iOS** → scan with the Camera app, tap the banner.
   - **Android** → scan from inside the Expo Go app.

---

## Web

```bash
npm run web          # dev server in the browser
npm run export:web   # static export to dist/
npm run preview:web  # serve the static export locally
```

---

## TypeScript check

```bash
npm run typecheck
```

---

## Troubleshooting

### "Device … has no app to handle the URI: exp://…" / "Unable to Install Expo Go" (iOS Simulator)

This means **Expo Go is not installed** on the simulator (or the auto-download left a broken placeholder icon). It must match the project's SDK version (**54**). Install it manually:

```bash
# 1. Remove any broken placeholder
xcrun simctl uninstall booted host.exp.Exponent

# 2. Download the Expo Go build that matches SDK 54 (NOT the /versions/latest one — it can be stale)
cd /tmp
curl -L -o ExpoGo54.tar.gz \
  "https://github.com/expo/expo-go-releases/releases/download/Expo-Go-54.0.7/Expo-Go-54.0.7.tar.gz"

# 3. Unpack and wrap it as a .app bundle
mkdir -p ExpoGo54 && tar -xzf ExpoGo54.tar.gz -C ExpoGo54
rm -rf "Expo Go.app" && cp -R ExpoGo54 "Expo Go.app"

# 4. Install it on the booted simulator
xcrun simctl install booted "/tmp/Expo Go.app"
```

Then run `npm start` and press `i` again. To find the correct URL for a different SDK, look up the `iosClientUrl` field at <https://api.expo.dev/v2/versions>.

> On Android, Expo Go is installed automatically into the emulator the first time you press `a`. If it fails, install it once from the Play Store inside the emulator.

### Port 8081 already in use

A previous dev server is still running. Free the port and restart:

```bash
lsof -ti tcp:8081 | xargs kill -9
npm start
```

### Emulator / Simulator not detected

- iOS: make sure a simulator is **booted** before pressing `i` (`open -a Simulator`).
- Android: run `adb devices` — your emulator should be listed. If not, reboot the emulator from Android Studio.

### Stale bundler cache

```bash
npm start -- --clear
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
