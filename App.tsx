import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

type OnboardingSlide = {
  key: string;
  title: string;
  description: string;
  image: any;
};

const SLIDES: OnboardingSlide[] = [
  {
    key: 'welcome',
    title: 'Welcome to EcoSync',
    description:
      'Your AI-powered companion for a smarter, greener lifestyle. Track energy, harness solar power, and make sustainable choices—effortlessly.',
    image: require('./assets/firstImage.png'),
  },
  {
    key: 'optimize-energy',
    title: 'Optimize Your Energy Usage',
    description:
      'Get real-time insights and AI recommendations to save energy, reduce costs, and protect the planet.',
    image: require('./assets/secondImage.png'),
  },
  {
    key: 'eco-challenges',
    title: 'Join Daily Eco Challenges',
    description:
      'Earn points, unlock badges, and compete with your community by turning everyday actions into impact.',
    image: require('./assets/thirdimage.png'),
  },
];

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (!showOnboarding) {
    return (
      <SafeAreaView style={introStyles.safeArea}>
        <StatusBar style="light" />
        <View style={introStyles.outerContainer}>
          <View style={introStyles.cardContainer}>
            {/* Top hero area */}
            <View style={introStyles.heroContainer}>
              <Image
                source={require('./assets/firstScreenImage.png')}
                style={introStyles.heroImage}
                resizeMode="cover"
              />
            </View>

            {/* Bottom overlay card */}
            <View style={introStyles.bottomCard}>
              <Text style={introStyles.title}>Ecosync AI</Text>
              <Text style={introStyles.subtitle}>
                Your personal AI guide to smarter energy use, daily eco-challenges,
                and real-time insights.
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                style={introStyles.primaryButton}
                onPress={() => setShowOnboarding(true)}
              >
                <View style={introStyles.buttonIconWrapper}>
                  <Text style={introStyles.buttonIcon}>{'>'}</Text>
                </View>
                <Text style={introStyles.buttonLabel}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return <OnboardingCarousel />;
};

const OnboardingCarousel: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1 && scrollRef.current) {
      scrollRef.current.scrollTo({ x: (currentIndex + 1) * width, animated: true });
    } else {
      // Later this can navigate to auth/home
    }
  };

  const handleSkip = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: (SLIDES.length - 1) * width, animated: true });
    }
  };

  return (
    <SafeAreaView style={onboardingStyles.safeArea}>
      <StatusBar style="dark" />

      {/* Decorative background circle */}
      <View style={onboardingStyles.topDecor} />
      <View style={onboardingStyles.bottomDecor} />

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      >
        {SLIDES.map((slide, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <View key={slide.key} style={{ width, paddingHorizontal: 24 }}>
              <View style={onboardingStyles.slideContainer}>
                <Animated.View
                  style={[
                    onboardingStyles.imageCircleWrapper,
                    { transform: [{ scale }], opacity },
                  ]}
                >
                  <Image
                    source={slide.image}
                    style={onboardingStyles.imageCircle}
                    resizeMode="cover"
                  />
                </Animated.View>

                <Image
                  source={require('./assets/logo.png')}
                  style={onboardingStyles.logo}
                  resizeMode="contain"
                />

                <View style={onboardingStyles.textBlock}>
                  <Text style={onboardingStyles.title}>{slide.title}</Text>
                  <Text style={onboardingStyles.description}>
                    {slide.description}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {/* Bottom controls */}
      <View style={onboardingStyles.bottomBar}>
        <TouchableOpacity
          style={onboardingStyles.secondaryButton}
          activeOpacity={0.8}
          onPress={handleSkip}
        >
          <Text style={onboardingStyles.secondaryLabel}>Skip</Text>
        </TouchableOpacity>

        <View style={onboardingStyles.dotsContainer}>
          {SLIDES.map((slide, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [6, 18, 6],
              extrapolate: 'clamp',
            });

            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={slide.key}
                style={[
                  onboardingStyles.dot,
                  { width: dotWidth, opacity: dotOpacity },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={onboardingStyles.primaryButton}
          activeOpacity={0.9}
          onPress={handleNext}
        >
          <Text style={onboardingStyles.primaryLabel}>
            {currentIndex === SLIDES.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const introStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111827',
  },
  outerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#111827',
  },
  heroContainer: {
    flex: 3,
    backgroundColor: '#60a5fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  buttonIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buttonIcon: {
    fontSize: 18,
    color: '#16a34a',
    fontWeight: '700',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

const onboardingStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topDecor: {
    position: 'absolute',
    top: 40,
    left: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
  },
  bottomDecor: {
    position: 'absolute',
    bottom: -80,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 80,
  },
  imageCircleWrapper: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    backgroundColor: '#e5f9ec',
    marginBottom: 32,
  },
  imageCircle: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 24,
  },
  textBlock: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#16a34a',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  secondaryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  secondaryLabel: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16a34a',
    marginHorizontal: 3,
  },
  primaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#16a34a',
  },
  primaryLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default App;

