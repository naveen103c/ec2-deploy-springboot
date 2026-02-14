Using this public repo for app-ads.txt for StreakFlow app


Today I noticed a UI issue in the LinkedIn Android app on my Realme device where the bottom tab bar overlaps with the system gesture/navigation area. This typically occurs when an app doesn’t fully respect system insets.
To help fellow developers:
If using React Native
Use useSafeAreaInsets from react-native-safe-area-context to apply proper bottom padding.
If building natively (as LinkedIn does)
LinkedIn’s mobile apps are built with native Kotlin/Swift, so the correct approach is to handle WindowInsets on Android to ensure UI elements stay above the gesture area. 
I’m sharing this to highlight a small usability detail and the importance of proper inset handling across devices.
Screenshot attached.
